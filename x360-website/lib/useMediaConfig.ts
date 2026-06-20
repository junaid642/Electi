"use client";
import { useState, useEffect } from "react";

type MediaMap = Record<string, string>;

let _cache: MediaMap | null = null;
let _promise: Promise<MediaMap> | null = null;

function fetchMediaConfig(): Promise<MediaMap> {
  if (_cache) return Promise.resolve(_cache);
  if (!_promise) {
    _promise = fetch("/api/media")
      .then(r => (r.ok ? r.json() : {}))
      .then((data: MediaMap) => { _cache = data; return data; })
      .catch(() => ({}));
  }
  return _promise;
}

export function useMediaConfig() {
  const [config, setConfig] = useState<MediaMap>(_cache ?? {});

  useEffect(() => {
    fetchMediaConfig().then(setConfig);
  }, []);

  return function get(key: string, fallback: string): string {
    return config[key] ?? fallback;
  };
}
