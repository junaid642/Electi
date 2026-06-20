/**
 * GlobeHero — "Intelligence Core"
 * GPU-driven particle sphere with neural network lines, bloom,
 * and full mouse interaction. Apple Vision Pro aesthetic.
 */
import { useRef, useMemo, useEffect, useCallback } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import * as THREE from "three";

/* ─── adaptive particle counts ──────────────────────────── */
const isMobile = () => window.innerWidth < 640;
const PARTICLES  = () => isMobile() ? 22_000 : 80_000;
const NEURAL_N   = () => isMobile() ? 200    : 500;
const DUST_N     = 800;
const SPHERE_R   = 1.9;

/* ─── vertex shader ──────────────────────────────────────── */
const vert = /* glsl */`
  uniform float uTime;
  uniform vec3  uMouse;
  uniform float uMouseRadius;
  uniform float uMouseStrength;
  uniform float uActive;       // 0→1 on first mouse move

  attribute float aSize;
  attribute float aOffset;
  attribute float aPhase;

  varying float vEnergy;
  varying float vAlpha;
  varying vec3  vColor;

  void main() {
    vec3 pos = position;

    /* 1 ── Organic breathing */
    float breath = sin(uTime * 0.38 + aOffset * 0.6) * 0.048;
    pos += normalize(pos) * breath * length(pos);

    /* 2 ── Energy pulse waves rippling from center */
    float d = length(pos);
    float wave = sin(d * 3.8 - uTime * 2.4 + aPhase) * 0.024;
    pos += normalize(pos) * wave;

    /* 3 ── Surface shimmer */
    pos.x += sin(pos.y * 4.2 + uTime * 1.1 + aOffset)        * 0.010;
    pos.y += cos(pos.z * 3.9 + uTime * 0.85 + aPhase)        * 0.010;
    pos.z += sin(pos.x * 4.6 + uTime * 1.3 + aOffset * 2.0)  * 0.010;

    /* 4 ── Mouse interaction */
    vec3  toMouse = uMouse - pos;
    float mDist   = length(toMouse);
    float mFactor = max(0.0, 1.0 - mDist / uMouseRadius);
    mFactor = mFactor * mFactor * mFactor;

    /* repel very close, attract medium distance */
    float force = mix(0.7, -1.8, smoothstep(0.3, 0.0, mFactor)) * mFactor * uMouseStrength * uActive;
    pos += normalize(toMouse + vec3(0.001)) * force;

    /* 5 ── Ripple wave from cursor */
    float ripple = sin(mDist * 6.0 - uTime * 5.0) * mFactor * 0.05 * uMouseStrength * uActive;
    pos += normalize(pos) * ripple;

    /* ── project ── */
    vec4 mv = modelViewMatrix * vec4(pos, 1.0);
    float ptSize = aSize * (320.0 / -mv.z);
    gl_PointSize  = clamp(ptSize, 0.4, 7.0);
    gl_Position   = projectionMatrix * mv;

    /* ── varyings ── */
    float e   = sin(uTime * 2.8 + aOffset * 6.28) * 0.5 + 0.5;
    vEnergy   = e;
    vAlpha    = 0.88 + e * 0.12;

    float coreness = 1.0 - clamp(length(position) / (${SPHERE_R.toFixed(2)} * 1.15), 0.0, 1.0);
    vec3 edgeCol = vec3(0.32, 0.58, 1.00);
    vec3 midCol  = vec3(0.72, 0.86, 1.00);
    vec3 coreCol = vec3(1.00, 1.00, 1.00);
    vColor = mix(mix(edgeCol, midCol, coreness), coreCol, coreness * coreness);
  }
`;

/* ─── fragment shader ────────────────────────────────────── */
const frag = /* glsl */`
  varying float vEnergy;
  varying float vAlpha;
  varying vec3  vColor;

  void main() {
    vec2  uv = gl_PointCoord - 0.5;
    float r  = length(uv);
    if (r > 0.5) discard;

    float core = 1.0 - smoothstep(0.0, 0.18, r);
    float glow = pow(1.0 - smoothstep(0.0, 0.5, r), 2.0);

    vec3  col   = mix(vColor, vec3(1.0), core * 0.85);
    float alpha = glow * vAlpha;

    gl_FragColor = vec4(col, alpha);
  }
`;

/* ─── neural-line shaders ────────────────────────────────── */
const lineVert = /* glsl */`
  uniform float uTime;
  attribute float aLinePhase;
  varying float vLineAlpha;
  void main() {
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    vLineAlpha = 0.28 + 0.32 * (sin(uTime * 0.9 + aLinePhase) * 0.5 + 0.5);
  }
`;
const lineFrag = /* glsl */`
  varying float vLineAlpha;
  void main() { gl_FragColor = vec4(0.55, 0.78, 1.0, vLineAlpha); }
`;

/* ─── helpers ────────────────────────────────────────────── */
function rng(n: number) { const x = Math.sin(n + 1) * 43758.5453; return x - Math.floor(x); }

/** Fibonacci sphere — evenly distributed surface points */
function fibSphere(count: number, radius: number): THREE.Vector3[] {
  const pts: THREE.Vector3[] = [];
  const phi = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < count; i++) {
    const y  = 1 - (i / (count - 1)) * 2;
    const r  = Math.sqrt(1 - y * y);
    const th = phi * i;
    pts.push(new THREE.Vector3(Math.cos(th) * r * radius, y * radius, Math.sin(th) * r * radius));
  }
  return pts;
}

/* ─── main particle sphere ───────────────────────────────── */
function ParticleSphere({ mouseRef }: { mouseRef: React.MutableRefObject<THREE.Vector3> }) {
  const matRef = useRef<THREE.ShaderMaterial>(null);
  const TOTAL   = useMemo(() => PARTICLES(), []);
  const NEURAL  = useMemo(() => NEURAL_N(), []);

  /* build geometry once */
  const { geo, neuralGeo } = useMemo(() => {
    const pos     = new Float32Array(TOTAL * 3);
    const sizes   = new Float32Array(TOTAL);
    const offsets = new Float32Array(TOTAL);
    const phases  = new Float32Array(TOTAL);

    // 75% surface (fibonacci), 15% volumetric interior, 10% halo
    const surfCount  = Math.floor(TOTAL * 0.75);
    const interCount = Math.floor(TOTAL * 0.15);
    const surfPts    = fibSphere(surfCount, SPHERE_R);

    for (let i = 0; i < TOTAL; i++) {
      let v: THREE.Vector3;
      if (i < surfCount) {
        v = surfPts[i];
      } else if (i < surfCount + interCount) {
        const t   = Math.cbrt(rng(i * 3.1));
        const lat = (rng(i * 5.7) - 0.5) * Math.PI;
        const lon = rng(i * 7.3) * Math.PI * 2;
        const r   = SPHERE_R * 0.2 + SPHERE_R * 0.8 * t;
        v = new THREE.Vector3(
          r * Math.cos(lat) * Math.cos(lon),
          r * Math.sin(lat),
          r * Math.cos(lat) * Math.sin(lon),
        );
      } else {
        const lat = (rng(i * 2.3) - 0.5) * Math.PI;
        const lon = rng(i * 9.1) * Math.PI * 2;
        const r   = SPHERE_R * (1.02 + rng(i * 4.4) * 0.12);
        v = new THREE.Vector3(
          r * Math.cos(lat) * Math.cos(lon),
          r * Math.sin(lat),
          r * Math.cos(lat) * Math.sin(lon),
        );
      }
      pos[i * 3]     = v.x;
      pos[i * 3 + 1] = v.y;
      pos[i * 3 + 2] = v.z;
      sizes[i]        = 0.4 + rng(i * 6.1) * 1.2;
      offsets[i]      = rng(i * 11.3) * Math.PI * 2;
      phases[i]       = rng(i * 13.7) * Math.PI * 2;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(pos,     3));
    geo.setAttribute("aSize",    new THREE.BufferAttribute(sizes,   1));
    geo.setAttribute("aOffset",  new THREE.BufferAttribute(offsets, 1));
    geo.setAttribute("aPhase",   new THREE.BufferAttribute(phases,  1));

    /* neural network lines — connect NEURAL nearest neighbors */
    const neuralPts = surfPts.slice(0, NEURAL);
    const lineVerts: number[] = [];
    const linePhases: number[] = [];
    const maxDist = SPHERE_R * 0.55;
    for (let i = 0; i < NEURAL; i++) {
      let connected = 0;
      for (let j = i + 1; j < NEURAL && connected < 4; j++) {
        if (neuralPts[i].distanceTo(neuralPts[j]) < maxDist) {
          lineVerts.push(neuralPts[i].x, neuralPts[i].y, neuralPts[i].z);
          lineVerts.push(neuralPts[j].x, neuralPts[j].y, neuralPts[j].z);
          const ph = rng(i * 17 + j) * Math.PI * 2;
          linePhases.push(ph, ph);
          connected++;
        }
      }
    }
    const neuralGeo = new THREE.BufferGeometry();
    neuralGeo.setAttribute("position",   new THREE.BufferAttribute(new Float32Array(lineVerts),  3));
    neuralGeo.setAttribute("aLinePhase", new THREE.BufferAttribute(new Float32Array(linePhases), 1));

    return { geo, neuralGeo };
  }, [TOTAL, NEURAL]);

  const uniforms = useMemo(() => ({
    uTime:          { value: 0 },
    uMouse:         { value: new THREE.Vector3(0, 0, 0) },
    uMouseRadius:   { value: 1.2 },
    uMouseStrength: { value: 0.45 },
    uActive:        { value: 0 },
  }), []);

  const lineUniforms = useMemo(() => ({ uTime: { value: 0 } }), []);
  const activeRef    = useRef(0);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    uniforms.uTime.value          = t;
    lineUniforms.uTime.value      = t;
    uniforms.uMouse.value.copy(mouseRef.current);

    // Smoothly activate on first mouse move
    if (mouseRef.current.lengthSq() > 0.001 && activeRef.current < 1) {
      activeRef.current = Math.min(1, activeRef.current + 0.015);
      uniforms.uActive.value = activeRef.current;
    }
  });

  return (
    <group>
      {/* Neural network lines */}
      <lineSegments geometry={neuralGeo}>
        <shaderMaterial
          vertexShader={lineVert}
          fragmentShader={lineFrag}
          uniforms={lineUniforms}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </lineSegments>

      {/* Main particle cloud */}
      <points geometry={geo}>
        <shaderMaterial
          ref={matRef}
          vertexShader={vert}
          fragmentShader={frag}
          uniforms={uniforms}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
}

/* ─── floating digital dust ──────────────────────────────── */
function Dust() {
  const geoRef = useRef<THREE.BufferGeometry>(null);
  const { pos, vel } = useMemo(() => {
    const pos = new Float32Array(DUST_N * 3);
    const vel = new Float32Array(DUST_N * 3);
    for (let i = 0; i < DUST_N; i++) {
      const r = 1.8 + rng(i * 3.3) * 2.8;
      const lat = (rng(i * 5.1) - 0.5) * Math.PI;
      const lon = rng(i * 7.9) * Math.PI * 2;
      pos[i * 3]     = r * Math.cos(lat) * Math.cos(lon);
      pos[i * 3 + 1] = r * Math.sin(lat);
      pos[i * 3 + 2] = r * Math.cos(lat) * Math.sin(lon);
      vel[i * 3]     = (rng(i * 2.1) - 0.5) * 0.002;
      vel[i * 3 + 1] = (rng(i * 4.3) - 0.5) * 0.002;
      vel[i * 3 + 2] = (rng(i * 6.7) - 0.5) * 0.002;
    }
    return { pos, vel };
  }, []);

  useFrame(() => {
    for (let i = 0; i < DUST_N; i++) {
      pos[i * 3]     += vel[i * 3];
      pos[i * 3 + 1] += vel[i * 3 + 1];
      pos[i * 3 + 2] += vel[i * 3 + 2];
      const r = Math.sqrt(pos[i*3]**2 + pos[i*3+1]**2 + pos[i*3+2]**2);
      if (r > 4.8 || r < 1.7) {
        vel[i * 3]     *= -1; vel[i * 3 + 1] *= -1; vel[i * 3 + 2] *= -1;
      }
    }
    if (geoRef.current) (geoRef.current.attributes.position as THREE.BufferAttribute).needsUpdate = true;
  });

  return (
    <points>
      <bufferGeometry ref={geoRef}>
        <bufferAttribute attach="attributes-position" args={[pos, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.022} color="#aaccff" transparent opacity={0.72} sizeAttenuation depthWrite={false} blending={THREE.AdditiveBlending} />
    </points>
  );
}

/* ─── energy core (central glow sphere) ─────────────────── */
function EnergyCore() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime();
    const mat = ref.current.material as THREE.MeshBasicMaterial;
    mat.opacity = 0.24 + 0.14 * Math.sin(t * 0.5);
    ref.current.scale.setScalar(1 + 0.025 * Math.sin(t * 0.4));
  });
  return (
    <mesh ref={ref}>
      <sphereGeometry args={[SPHERE_R * 0.55, 32, 32]} />
      <meshBasicMaterial color="#6699ff" transparent opacity={0.24} depthWrite={false} blending={THREE.AdditiveBlending} />
    </mesh>
  );
}

/* ─── energy sparks ──────────────────────────────────────── */
const SPARK_N = 60;
function Sparks() {
  const pos    = useMemo(() => new Float32Array(SPARK_N * 3), []);
  const sparks = useMemo(() => Array.from({ length: SPARK_N }, (_, i) => {
    const lat = (rng(i * 3.1) - 0.5) * Math.PI;
    const lon = rng(i * 7.3) * Math.PI * 2;
    return {
      origin: new THREE.Vector3(
        SPHERE_R * Math.cos(lat) * Math.cos(lon),
        SPHERE_R * Math.sin(lat),
        SPHERE_R * Math.cos(lat) * Math.sin(lon),
      ),
      speed:  0.4 + rng(i * 5.9) * 0.8,
      offset: rng(i * 11.3) * Math.PI * 2,
    };
  }), []);

  const geoRef = useRef<THREE.BufferGeometry>(null);
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    sparks.forEach(({ origin, speed, offset }, i) => {
      const life = (t * speed + offset) % 1.0;
      const v = origin.clone().multiplyScalar(1 + life * 0.6);
      pos[i * 3] = v.x; pos[i * 3 + 1] = v.y; pos[i * 3 + 2] = v.z;
    });
    if (geoRef.current) (geoRef.current.attributes.position as THREE.BufferAttribute).needsUpdate = true;
  });

  return (
    <points>
      <bufferGeometry ref={geoRef}>
        <bufferAttribute attach="attributes-position" args={[pos, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.045} color="#ffffff" transparent opacity={0.95} sizeAttenuation depthWrite={false} blending={THREE.AdditiveBlending} />
    </points>
  );
}

/* ─── slow global rotation group ────────────────────────── */
function Scene({ mouseRef }: { mouseRef: React.MutableRefObject<THREE.Vector3> }) {
  const groupRef = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.055;
      groupRef.current.rotation.x += delta * 0.018;
    }
  });
  return (
    <group ref={groupRef}>
      <EnergyCore />
      <ParticleSphere mouseRef={mouseRef} />
      <Sparks />
    </group>
  );
}

/* ─── mouse tracker ──────────────────────────────────────── */
function MouseTracker({ mouseRef }: { mouseRef: React.MutableRefObject<THREE.Vector3> }) {
  const { camera } = useThree();
  const mouse2D    = useRef(new THREE.Vector2(0, 0));
  const ray        = useRef(new THREE.Raycaster());
  const plane      = useRef(new THREE.Plane(new THREE.Vector3(0, 0, 1), 0));
  const target     = useRef(new THREE.Vector3());

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse2D.current.set(
        (e.clientX / window.innerWidth)  * 2 - 1,
       -(e.clientY / window.innerHeight) * 2 + 1,
      );
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  useFrame(() => {
    ray.current.setFromCamera(mouse2D.current, camera);
    ray.current.ray.intersectPlane(plane.current, target.current);
    mouseRef.current.lerp(target.current, 0.08);
  });

  return null;
}

/* ─── exported component ─────────────────────────────────── */
export default function GlobeHero() {
  const mouseRef = useRef(new THREE.Vector3(0, 0, 0));

  return (
    <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 0 }}>
      <Canvas
        camera={{ position: [0, 0, 4.8], fov: 55 }}
        gl={{
          antialias:       true,
          alpha:           true,
          powerPreference: "high-performance",
          stencil:         false,
          depth:           true,
        }}
        style={{ background: "transparent" }}
        dpr={[1, isMobile() ? 1 : 1.5]}
      >
        <MouseTracker mouseRef={mouseRef} />
        <ambientLight intensity={0.04} />
        <Dust />
        <Scene mouseRef={mouseRef} />

        <EffectComposer>
          <Bloom
            luminanceThreshold={0.02}
            luminanceSmoothing={0.75}
            intensity={3.8}
            blendFunction={BlendFunction.ADD}
          />
          <Vignette
            eskil={false}
            offset={0.35}
            darkness={0.45}
            blendFunction={BlendFunction.NORMAL}
          />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
