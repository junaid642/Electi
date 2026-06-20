"use client";
import { useState, useEffect, useCallback } from "react";
import {
  Users, Calendar, Award, TrendingUp, Plus, Search,
  Edit2, Trash2, X, Shield, Check, ChevronDown, Lock, Unlock,
  Crown, Star, Users2, BarChart3, Settings, Inbox, Loader2,
  CheckCircle, Clock, XCircle, ExternalLink,
} from "lucide-react";
import { useStore } from "@/lib/store";
import type { Role, RolePermissions, RoleLevel, AccessScope } from "@/lib/types";

// ── Types ─────────────────────────────────────────────────────────────────────
interface Application {
  id: number;
  jobId: number | null;
  jobTitle: string | null;
  name: string;
  email: string;
  phone: string | null;
  linkedin: string | null;
  cvUrl: string | null;
  message: string | null;
  status: "new" | "reviewed" | "interview" | "hired" | "rejected";
  createdAt: string;
}

// ── Static employee data (local state) ───────────────────────────────────────
type Employee = typeof INIT_EMPLOYEES[0];
const INIT_EMPLOYEES = [
  { id: 1, name: "Ahmad Al-Sayed",    role: "Sales Manager",         dept: "Sales",       status: "Active",   leave: 18, attendance: 98, kpi: 94, joined: "2023-01-15", tier: "Senior", email: "ahmad@x-360.ai",   phone: "+966 50 111 0001", city: "Riyadh",  empId: "X001" },
  { id: 2, name: "Sarah Al-Mutairi",  role: "Business Dev Manager",  dept: "Sales",       status: "Active",   leave: 12, attendance: 96, kpi: 89, joined: "2023-04-20", tier: "Senior", email: "sarah@x-360.ai",   phone: "+966 50 111 0002", city: "Riyadh",  empId: "X002" },
  { id: 3, name: "Khalid Omar",       role: "Account Executive",     dept: "Sales",       status: "Active",   leave: 20, attendance: 93, kpi: 82, joined: "2024-01-10", tier: "Mid",    email: "khalid@x-360.ai",  phone: "+966 50 111 0003", city: "Riyadh",  empId: "X003" },
  { id: 4, name: "Fatima Al-Ghamdi",  role: "Sales Executive",       dept: "Sales",       status: "Active",   leave: 15, attendance: 91, kpi: 78, joined: "2024-06-01", tier: "Junior", email: "fatima@x-360.ai",  phone: "+966 50 111 0004", city: "Jeddah",  empId: "X004" },
  { id: 5, name: "Omar Al-Harbi",     role: "Project Coordinator",   dept: "Operations",  status: "Active",   leave: 14, attendance: 95, kpi: 85, joined: "2023-09-15", tier: "Mid",    email: "omar@x-360.ai",    phone: "+966 50 111 0005", city: "Riyadh",  empId: "X005" },
  { id: 6, name: "Layla Al-Mansouri", role: "Marketing Manager",     dept: "Marketing",   status: "Active",   leave: 20, attendance: 97, kpi: 91, joined: "2023-02-28", tier: "Senior", email: "layla@x-360.ai",   phone: "+966 50 111 0006", city: "Riyadh",  empId: "X006" },
  { id: 7, name: "Tariq Al-Dosari",   role: "360 Photographer",      dept: "Production",  status: "On Leave", leave: 5,  attendance: 88, kpi: 76, joined: "2024-03-10", tier: "Junior", email: "tariq@x-360.ai",   phone: "+966 50 111 0007", city: "Riyadh",  empId: "X007" },
  { id: 8, name: "Mariam Al-Jabri",   role: "Operations Analyst",    dept: "Operations",  status: "Active",   leave: 18, attendance: 99, kpi: 93, joined: "2023-07-01", tier: "Mid",    email: "mariam@x-360.ai",  phone: "+966 50 111 0008", city: "Abu Dhabi",empId: "X008" },
];

const LEAVE_REQUESTS = [
  { name: "Tariq Al-Dosari",  type: "Annual Leave",    from: "2025-06-10", to: "2025-06-20", status: "Approved" },
  { name: "Khalid Omar",      type: "Sick Leave",      from: "2025-06-09", to: "2025-06-09", status: "Pending"  },
  { name: "Sarah Al-Mutairi", type: "Annual Leave",    from: "2025-07-01", to: "2025-07-10", status: "Pending"  },
  { name: "Fatima Al-Ghamdi", type: "Emergency Leave", from: "2025-06-08", to: "2025-06-08", status: "Approved" },
];

const DEPT_COLOR: Record<string, string> = {
  Sales: "badge-blue", Operations: "badge-purple", Marketing: "badge-cyan", Production: "badge-amber",
};
const LEVEL_META: Record<number, { label: string; color: string; bg: string }> = {
  1: { label: "L1 · SUPER",    color: "text-purple-300", bg: "bg-purple-500/15 border-purple-500/30" },
  2: { label: "L2 · DIRECTOR", color: "text-blue-300",   bg: "bg-blue-500/15 border-blue-500/30"     },
  3: { label: "L3 · MANAGER",  color: "text-cyan-300",   bg: "bg-cyan-500/15 border-cyan-500/30"     },
  4: { label: "L4 · LEAD",     color: "text-amber-300",  bg: "bg-amber-500/15 border-amber-500/30"   },
  5: { label: "L5 · STAFF",    color: "text-white/55",   bg: "bg-white/[0.05] border-white/[0.12]"   },
};

const MODULE_LABELS: Record<keyof RolePermissions, { label: string; perms: { key: string; label: string }[] }> = {
  crm:       { label: "CRM / Leads",  perms: [{ key: "view", label: "View" },{ key: "create", label: "Create" },{ key: "edit", label: "Edit" },{ key: "delete", label: "Delete" },{ key: "export", label: "Export" },{ key: "assign", label: "Assign" }] },
  projects:  { label: "Projects",     perms: [{ key: "view", label: "View" },{ key: "create", label: "Create" },{ key: "edit", label: "Edit" },{ key: "delete", label: "Delete" },{ key: "upload", label: "Upload" }] },
  team:      { label: "Team",         perms: [{ key: "view", label: "View" },{ key: "add", label: "Add" },{ key: "edit", label: "Edit" },{ key: "delete", label: "Delete" },{ key: "roles", label: "Roles" }] },
  marketing: { label: "Marketing",    perms: [{ key: "view", label: "View" },{ key: "create", label: "Create" },{ key: "edit", label: "Edit" },{ key: "delete", label: "Delete" },{ key: "analytics", label: "Analytics" }] },
  executive: { label: "Executive",    perms: [{ key: "strategy", label: "Strategy" },{ key: "forecasts", label: "Forecasts" },{ key: "expansion", label: "Expansion" }] },
  settings:  { label: "Settings",     perms: [{ key: "view", label: "View" },{ key: "modify", label: "Modify" },{ key: "api", label: "API" }] },
};

type PermState = RolePermissions;

function defaultPerms(): PermState {
  return {
    crm:       { view: true,  create: false, edit: false, delete: false, export: false, assign: false },
    projects:  { view: true,  create: false, edit: false, delete: false, upload: false },
    team:      { view: false, add: false,    edit: false, delete: false, roles: false  },
    marketing: { view: false, create: false, edit: false, delete: false, analytics: false },
    executive: { strategy: false, forecasts: false, expansion: false },
    settings:  { view: false, modify: false, api: false },
  };
}

// ── Role Modal ─────────────────────────────────────────────────────────────────
function RoleModal({ role, onClose, onSave }: {
  role: Role | null; onClose: () => void;
  onSave: (data: Omit<Role, "id">) => void;
}) {
  const [name, setName] = useState(role?.name ?? "");
  const [dept, setDept] = useState(role?.department ?? "Sales");
  const [desc, setDesc] = useState(role?.description ?? "");
  const [level, setLevel] = useState<RoleLevel>(role?.level ?? 5);
  const [scope, setScope] = useState<AccessScope>(role?.scope ?? "Assigned Only");
  const [perms, setPerms] = useState<PermState>(role?.permissions ?? defaultPerms());

  function togglePerm(mod: keyof PermState, key: string) {
    setPerms(prev => ({
      ...prev,
      [mod]: { ...prev[mod], [key]: !(prev[mod] as Record<string, boolean>)[key] },
    }));
  }

  const inputCls = "w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-3 py-2 text-[12px] text-white/80 placeholder-white/22 outline-none focus:border-white/20 transition-colors";
  const selectCls = inputCls + " cursor-pointer bg-[#0a0a0a]";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      <div className="relative bg-[#0d0d0d] border border-white/[0.1] rounded-2xl w-full max-w-[700px] max-h-[90vh] overflow-hidden shadow-[0_20px_80px_rgba(0,0,0,0.8)]" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between p-5 border-b border-white/[0.06]">
          <div>
            <h2 className="text-[14px] font-700 text-white/85">{role ? "Edit Role" : "Add New Role"}</h2>
            <p className="text-[10px] text-white/35 mt-0.5">Configure role permissions and access scope</p>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-white/[0.06] text-white/30 hover:text-white/60 transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="overflow-y-auto max-h-[calc(90vh-120px)] p-5 space-y-5">
          {/* Basic fields */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[9px] font-600 text-white/35 uppercase tracking-wide block mb-1">Role Name *</label>
              <input value={name} onChange={e => setName(e.target.value)} className={inputCls} placeholder="Sales Executive" />
            </div>
            <div>
              <label className="text-[9px] font-600 text-white/35 uppercase tracking-wide block mb-1">Department</label>
              <select value={dept} onChange={e => setDept(e.target.value)} className={selectCls}>
                {["Executive","Sales","Operations","Marketing","Production","Finance","HR","Partner"].map(d => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <label className="text-[9px] font-600 text-white/35 uppercase tracking-wide block mb-1">Description</label>
            <textarea value={desc} onChange={e => setDesc(e.target.value)} className={inputCls + " resize-none h-14"} placeholder="Brief description of this role's responsibilities…" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[9px] font-600 text-white/35 uppercase tracking-wide block mb-1">Hierarchy Level</label>
              <div className="flex gap-1.5">
                {([1,2,3,4,5] as RoleLevel[]).map(l => {
                  const m = LEVEL_META[l];
                  return (
                    <button key={l} type="button" onClick={() => setLevel(l)}
                      className={`flex-1 py-1.5 rounded-lg text-[9px] font-700 border transition-all ${level === l ? `${m.bg} ${m.color}` : "border-white/[0.08] text-white/30 hover:border-white/20"}`}>
                      L{l}
                    </button>
                  );
                })}
              </div>
            </div>
            <div>
              <label className="text-[9px] font-600 text-white/35 uppercase tracking-wide block mb-1">Access Scope</label>
              <select value={scope} onChange={e => setScope(e.target.value as AccessScope)} className={selectCls}>
                {(["Global","Department","Assigned Only","City-wise"] as AccessScope[]).map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Permission matrix */}
          <div>
            <p className="text-[9px] font-600 text-white/35 uppercase tracking-wide mb-3">Permission Matrix</p>
            <div className="space-y-3">
              {(Object.keys(MODULE_LABELS) as (keyof RolePermissions)[]).map(mod => {
                const { label, perms: pList } = MODULE_LABELS[mod];
                return (
                  <div key={mod} className="glass-sm rounded-xl p-3">
                    <p className="text-[10px] font-600 text-white/60 mb-2">{label}</p>
                    <div className="flex flex-wrap gap-2">
                      {pList.map(({ key, label: pLabel }) => {
                        const active = (perms[mod] as Record<string, boolean>)[key];
                        return (
                          <button key={key} type="button" onClick={() => togglePerm(mod, key)}
                            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[10px] font-500 border transition-all ${active ? "bg-white/[0.1] border-white/25 text-white/80" : "bg-transparent border-white/[0.06] text-white/30 hover:border-white/15"}`}>
                            <div className={`w-3 h-3 rounded flex items-center justify-center ${active ? "bg-white/30" : "bg-white/[0.05]"}`}>
                              {active && <Check className="w-2 h-2 text-white" />}
                            </div>
                            {pLabel}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 px-5 py-4 border-t border-white/[0.05]">
          <button onClick={onClose} className="px-4 py-2 text-[11px] text-white/45 hover:text-white/70 glass-sm rounded-lg transition-colors">Cancel</button>
          <button onClick={() => onSave({ name, department: dept, description: desc, level, scope, permissions: perms, memberCount: role?.memberCount ?? 0, color: role?.color ?? "text-white" })}
            disabled={!name}
            className="px-5 py-2 text-[11px] font-600 bg-white/[0.1] hover:bg-white/[0.16] border border-white/[0.12] text-white/85 rounded-lg transition-colors disabled:opacity-40">
            {role ? "Save Changes" : "Create Role"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Edit Employee Modal ────────────────────────────────────────────────────────
function EditEmployeeModal({ emp, onClose, onSave }: { emp: Employee; onClose: () => void; onSave: (e: Employee) => void }) {
  const [data, setData] = useState({ ...emp });
  const inputCls = "w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-3 py-2 text-[12px] text-white/80 placeholder-white/22 outline-none focus:border-white/20 transition-colors";
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      <div className="relative bg-[#0d0d0d] border border-white/[0.1] rounded-2xl w-full max-w-[500px] shadow-[0_20px_80px_rgba(0,0,0,0.8)]" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between p-5 border-b border-white/[0.06]">
          <h2 className="text-[14px] font-700 text-white/85">Edit Employee</h2>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-white/[0.06] text-white/30 hover:text-white/60 transition-colors"><X className="w-4 h-4" /></button>
        </div>
        <div className="p-5 space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[9px] font-600 text-white/35 uppercase tracking-wide block mb-1">Full Name</label>
              <input value={data.name} onChange={e => setData({...data, name: e.target.value})} className={inputCls} />
            </div>
            <div>
              <label className="text-[9px] font-600 text-white/35 uppercase tracking-wide block mb-1">Role / Title</label>
              <input value={data.role} onChange={e => setData({...data, role: e.target.value})} className={inputCls} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[9px] font-600 text-white/35 uppercase tracking-wide block mb-1">Email</label>
              <input value={data.email} onChange={e => setData({...data, email: e.target.value})} className={inputCls} />
            </div>
            <div>
              <label className="text-[9px] font-600 text-white/35 uppercase tracking-wide block mb-1">Phone</label>
              <input value={data.phone} onChange={e => setData({...data, phone: e.target.value})} className={inputCls} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[9px] font-600 text-white/35 uppercase tracking-wide block mb-1">Department</label>
              <select value={data.dept} onChange={e => setData({...data, dept: e.target.value})} className={inputCls + " cursor-pointer bg-[#0a0a0a]"}>
                {["Sales","Operations","Marketing","Production","Finance","HR"].map(d => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>
            <div>
              <label className="text-[9px] font-600 text-white/35 uppercase tracking-wide block mb-1">Status</label>
              <select value={data.status} onChange={e => setData({...data, status: e.target.value})} className={inputCls + " cursor-pointer bg-[#0a0a0a]"}>
                {["Active","On Leave","Inactive"].map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[9px] font-600 text-white/35 uppercase tracking-wide block mb-1">City</label>
              <input value={data.city} onChange={e => setData({...data, city: e.target.value})} className={inputCls} placeholder="Riyadh" />
            </div>
            <div>
              <label className="text-[9px] font-600 text-white/35 uppercase tracking-wide block mb-1">KPI Score (0-100)</label>
              <input type="number" value={data.kpi} onChange={e => setData({...data, kpi: Number(e.target.value)})} className={inputCls} min="0" max="100" />
            </div>
          </div>
        </div>
        <div className="flex items-center justify-end gap-3 px-5 py-4 border-t border-white/[0.05]">
          <button onClick={onClose} className="px-4 py-2 text-[11px] text-white/45 hover:text-white/70 glass-sm rounded-lg transition-colors">Cancel</button>
          <button onClick={() => { onSave(data); onClose(); }} className="px-5 py-2 text-[11px] font-600 bg-white/[0.1] hover:bg-white/[0.16] border border-white/[0.12] text-white/85 rounded-lg transition-colors">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Main page ──────────────────────────────────────────────────────────────────
export default function HRPage() {
  const { roles, addRole, updateRole, deleteRole } = useStore();
  const [employees, setEmployees] = useState<Employee[]>(INIT_EMPLOYEES);
  const [search, setSearch] = useState("");
  const [editEmp, setEditEmp] = useState<Employee | null>(null);
  const [deleteEmpId, setDeleteEmpId] = useState<number | null>(null);
  const [roleModal, setRoleModal] = useState<"add" | "edit" | null>(null);
  const [editRoleId, setEditRoleId] = useState<string | null>(null);
  const [deleteRoleId, setDeleteRoleId] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<"team" | "roles" | "applications">("team");

  // ── Applications state ─────────────────────────────────────────────────────
  const [applications, setApplications] = useState<Application[]>([]);
  const [appsLoading, setAppsLoading] = useState(false);
  const [appsError, setAppsError] = useState<string | null>(null);
  const [appSearch, setAppSearch] = useState("");
  const [selectedApps, setSelectedApps] = useState<Set<number>>(new Set());

  const loadApplications = useCallback(async () => {
    setAppsLoading(true);
    setAppsError(null);
    try {
      const res = await fetch("/api/admin/applications", { credentials: "include" });
      if (!res.ok) throw new Error("Failed");
      const data = await res.json() as Application[];
      setApplications(data);
    } catch {
      setAppsError("Could not load applications");
    } finally {
      setAppsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (activeSection === "applications") void loadApplications();
  }, [activeSection, loadApplications]);

  const updateAppStatus = async (id: number, status: Application["status"]) => {
    try {
      const res = await fetch(`/api/admin/applications/${id}`, {
        method: "PATCH",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) throw new Error("Failed");
      const updated = await res.json() as Application;
      setApplications(prev => prev.map(a => a.id === id ? updated : a));
    } catch {
      setAppsError("Could not update status");
    }
  };

  const handleBulkDelete = async () => {
    if (selectedApps.size === 0) return;
    const ids = Array.from(selectedApps);
    try {
      await Promise.all(ids.map(id =>
        fetch(`/api/admin/applications/${id}`, { method: "DELETE", credentials: "include" })
      ));
      setApplications(prev => prev.filter(a => !selectedApps.has(a.id)));
      setSelectedApps(new Set());
    } catch {
      setAppsError("Failed to delete selected applications");
    }
  };

  const handleBulkStatus = async (status: Application["status"]) => {
    if (selectedApps.size === 0) return;
    const ids = Array.from(selectedApps);
    try {
      const updated = await Promise.all(ids.map(async id => {
        const res = await fetch(`/api/admin/applications/${id}`, {
          method: "PATCH", credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status }),
        });
        return res.ok ? (await res.json() as Application) : null;
      }));
      setApplications(prev => prev.map(a => {
        const u = updated.find(x => x?.id === a.id);
        return u ?? a;
      }));
      setSelectedApps(new Set());
    } catch {
      setAppsError("Failed to update status for selected applications");
    }
  };

  const toggleSelectApp = (id: number) => {
    setSelectedApps(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };

  const filtered = employees.filter(e =>
    !search || e.name.toLowerCase().includes(search.toLowerCase()) || e.role.toLowerCase().includes(search.toLowerCase())
  );
  const active = employees.filter(e => e.status === "Active").length;
  const avgKPI = Math.round(employees.reduce((s, e) => s + e.kpi, 0) / employees.length);
  const editRole = editRoleId ? roles.find(r => r.id === editRoleId) ?? null : null;

  return (
    <div className="space-y-4 max-w-[1400px]">
      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { label: "Total Staff",    value: employees.length, icon: Users,      color: "text-white/80"  },
          { label: "Active",         value: active,           icon: TrendingUp,  color: "text-white/80"  },
          { label: "Avg KPI Score",  value: `${avgKPI}%`,     icon: Award,       color: "text-white/80"  },
          { label: "Leave Pending",  value: LEAVE_REQUESTS.filter(l => l.status === "Pending").length, icon: Calendar, color: "text-white/80"  },
        ].map(s => (
          <div key={s.label} className="glass p-4 flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-white/[0.05] flex items-center justify-center shrink-0">
              <s.icon className={`w-4 h-4 ${s.color}`} />
            </div>
            <div>
              <p className="text-[10px] text-white/35 uppercase tracking-wide">{s.label}</p>
              <p className={`text-[22px] font-700 font-display mt-0.5 ${s.color}`}>{s.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Section switcher */}
      <div className="flex gap-1 glass-sm p-1 rounded-xl w-fit">
        <button onClick={() => setActiveSection("team")}
          className={`px-4 py-1.5 rounded-lg text-[11px] font-600 transition-all ${activeSection === "team" ? "bg-white/[0.1] text-white/85" : "text-white/35 hover:text-white/60"}`}>
          Team Directory
        </button>
        <button onClick={() => setActiveSection("roles")}
          className={`px-4 py-1.5 rounded-lg text-[11px] font-600 transition-all ${activeSection === "roles" ? "bg-white/[0.1] text-white/85" : "text-white/35 hover:text-white/60"}`}>
          Role Management
        </button>
        <button onClick={() => setActiveSection("applications")}
          className={`flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-[11px] font-600 transition-all ${activeSection === "applications" ? "bg-white/[0.1] text-white/85" : "text-white/35 hover:text-white/60"}`}>
          <Inbox className="w-3 h-3" /> Applications
        </button>
      </div>

      {/* ── Team section ────────────────────────────────────────────────── */}
      {activeSection === "team" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="glass overflow-hidden lg:col-span-2">
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/[0.04]">
              <p className="text-[11px] font-600 text-white/65 uppercase tracking-wide font-display">Team Directory</p>
              <div className="flex items-center gap-2">
                <div className="glass-sm flex items-center gap-1.5 px-2.5 py-1">
                  <Search className="w-3 h-3 text-white/28" />
                  <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search..." className="bg-transparent text-[10px] text-white/55 outline-none w-28 placeholder-white/20" />
                </div>
                <button className="glass-sm px-2.5 py-1.5 text-[10px] text-white/45 hover:text-white/70 flex items-center gap-1 transition-colors">
                  <Plus className="w-3 h-3" /> Add
                </button>
              </div>
            </div>
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/[0.04]">
                  {["Employee","Role","Dept","Attendance","KPI","Status",""].map(h => (
                    <th key={h} className="text-left px-3 py-2 text-[9px] font-600 tracking-[0.14em] uppercase text-white/28">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((e) => (
                  <tr key={e.id} className="border-b border-white/[0.03] hover:bg-white/[0.025] transition-colors group">
                    <td className="px-3 py-2.5">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-white/[0.08] border border-white/[0.08] flex items-center justify-center text-[8px] font-700 text-white/60 shrink-0">
                          {e.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                        </div>
                        <div>
                          <p className="text-[11px] font-600 text-white/75">{e.name}</p>
                          <p className="text-[9px] text-white/30">{e.empId}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-3 py-2.5 text-[10px] text-white/50">{e.role}</td>
                    <td className="px-3 py-2.5">
                      <span className={`badge text-[8px] py-0 ${DEPT_COLOR[e.dept] ?? "badge-white"}`}>{e.dept}</span>
                    </td>
                    <td className="px-3 py-2.5">
                      <div className="flex items-center gap-1.5">
                        <div className="w-12 h-1 rounded-full bg-white/[0.06]">
                          <div className="h-full rounded-full bg-green-400/60" style={{ width: `${e.attendance}%` }} />
                        </div>
                        <span className="text-[10px] text-white/50">{e.attendance}%</span>
                      </div>
                    </td>
                    <td className="px-3 py-2.5">
                      <span className={`text-[11px] font-700 ${e.kpi >= 90 ? "text-green-400" : e.kpi >= 75 ? "text-amber-400" : "text-red-400"}`}>{e.kpi}</span>
                    </td>
                    <td className="px-3 py-2.5">
                      <span className={`badge text-[8px] py-0 ${e.status === "Active" ? "badge-green" : "badge-amber"}`}>{e.status}</span>
                    </td>
                    <td className="px-3 py-2.5">
                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button onClick={() => setEditEmp(e)} className="p-1 rounded hover:bg-white/[0.08] text-white/25 hover:text-blue-400 transition-colors" title="Edit">
                          <Edit2 className="w-3 h-3" />
                        </button>
                        <button onClick={() => setDeleteEmpId(e.id)} className="p-1 rounded hover:bg-red-500/10 text-white/25 hover:text-red-400 transition-colors" title="Delete">
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Leave requests */}
          <div className="glass overflow-hidden">
            <div className="px-4 py-3 border-b border-white/[0.04]">
              <p className="text-[11px] font-600 text-white/65 uppercase tracking-wide font-display">Leave Requests</p>
            </div>
            <div className="divide-y divide-white/[0.03]">
              {LEAVE_REQUESTS.map((r, i) => (
                <div key={i} className="px-4 py-3">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <div>
                      <p className="text-[11px] font-600 text-white/70">{r.name}</p>
                      <p className="text-[10px] text-white/35">{r.type}</p>
                    </div>
                    <span className={`badge text-[8px] py-0 ${r.status === "Approved" ? "badge-green" : "badge-amber"}`}>{r.status}</span>
                  </div>
                  <p className="text-[9px] text-white/25">{r.from} → {r.to}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── Role Management section ──────────────────────────────────────── */}
      {activeSection === "roles" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-[11px] text-white/40">Define roles, hierarchy levels, and granular permissions for your team.</p>
            <button onClick={() => setRoleModal("add")}
              className="glass px-3 py-1.5 text-[11px] text-white/55 hover:text-white/80 flex items-center gap-1.5 transition-colors rounded-xl border border-white/[0.08]">
              <Plus className="w-3.5 h-3.5" /> Add New Role
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {roles.map(role => {
              const lm = LEVEL_META[role.level];
              const isProtected = role.id === "r1"; // Super Admin
              const totalPerms = Object.values(role.permissions).flatMap(m => Object.values(m as Record<string, boolean>));
              const activeCount = totalPerms.filter(Boolean).length;
              const totalCount = totalPerms.length;
              return (
                <div key={role.id} className="glass rounded-xl border border-white/[0.06] hover:border-white/[0.1] transition-all group">
                  <div className="p-4 space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <p className="text-[13px] font-700 text-white/85">{role.name}</p>
                          {isProtected && <Lock className="w-3 h-3 text-purple-400" />}
                        </div>
                        <p className="text-[10px] text-white/40 mt-0.5">{role.department} · {role.memberCount} members</p>
                      </div>
                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button onClick={() => { setEditRoleId(role.id); setRoleModal("edit"); }}
                          className="p-1.5 rounded-lg hover:bg-white/[0.08] text-white/25 hover:text-blue-400 transition-colors">
                          <Edit2 className="w-3 h-3" />
                        </button>
                        {!isProtected && (
                          <button onClick={() => setDeleteRoleId(role.id)}
                            className="p-1.5 rounded-lg hover:bg-red-500/10 text-white/25 hover:text-red-400 transition-colors">
                            <Trash2 className="w-3 h-3" />
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Level badge */}
                    <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-[9px] font-700 uppercase tracking-wide ${lm.bg} ${lm.color}`}>
                      <Shield className="w-3 h-3" />
                      {lm.label}
                    </div>

                    {/* Permissions summary */}
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-[9px] text-white/35 uppercase tracking-wide">Permissions</span>
                        <span className="text-[10px] font-600 text-white/55">{activeCount}/{totalCount}</span>
                      </div>
                      <div className="h-1.5 rounded-full bg-white/[0.06]">
                        <div className={`h-full rounded-full ${role.level === 1 ? "bg-purple-400" : role.level <= 3 ? "bg-blue-400" : "bg-white/30"}`} style={{ width: `${(activeCount / totalCount) * 100}%` }} />
                      </div>
                    </div>

                    {/* Module chips */}
                    <div className="flex flex-wrap gap-1">
                      {(Object.keys(MODULE_LABELS) as (keyof RolePermissions)[]).map(mod => {
                        const modPerms = role.permissions[mod] as Record<string, boolean>;
                        const hasAny = Object.values(modPerms).some(Boolean);
                        return (
                          <span key={mod} className={`text-[8px] px-1.5 py-0.5 rounded font-500 transition-colors ${hasAny ? "bg-white/[0.08] text-white/60" : "bg-white/[0.03] text-white/20"}`}>
                            {MODULE_LABELS[mod].label}
                          </span>
                        );
                      })}
                    </div>

                    <div className="flex items-center justify-between pt-1 border-t border-white/[0.04]">
                      <span className="text-[9px] text-white/30">{role.description.slice(0, 50)}{role.description.length > 50 ? "…" : ""}</span>
                      <span className="text-[9px] glass-sm px-2 py-0.5 rounded text-white/40">{role.scope}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ── Modals ─────────────────────────────────────────────────────────── */}
      {editEmp && (
        <EditEmployeeModal emp={editEmp} onClose={() => setEditEmp(null)}
          onSave={updated => setEmployees(prev => prev.map(e => e.id === updated.id ? updated : e))} />
      )}

      {deleteEmpId !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center" onClick={() => setDeleteEmpId(null)}>
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
          <div className="relative bg-[#0d0d0d] border border-white/[0.1] rounded-2xl p-6 w-[320px] shadow-[0_20px_80px_rgba(0,0,0,0.8)]" onClick={e => e.stopPropagation()}>
            <h3 className="text-[14px] font-700 text-white/85 mb-2">Delete Employee?</h3>
            <p className="text-[11px] text-white/45 mb-5">This will permanently remove {employees.find(e => e.id === deleteEmpId)?.name} from the system.</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteEmpId(null)} className="flex-1 py-2 text-[11px] text-white/50 glass-sm rounded-lg">Cancel</button>
              <button onClick={() => { setEmployees(prev => prev.filter(e => e.id !== deleteEmpId)); setDeleteEmpId(null); }}
                className="flex-1 py-2 text-[11px] font-600 bg-red-500/15 hover:bg-red-500/25 border border-red-500/30 text-red-300 rounded-lg transition-colors">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {roleModal && (
        <RoleModal
          role={roleModal === "edit" ? editRole : null}
          onClose={() => { setRoleModal(null); setEditRoleId(null); }}
          onSave={(data) => {
            if (roleModal === "edit" && editRoleId) updateRole(editRoleId, data);
            else addRole(data);
            setRoleModal(null); setEditRoleId(null);
          }}
        />
      )}

      {/* ── Applications inbox ───────────────────────────────────────── */}
      {activeSection === "applications" && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-[11px] text-white/35">
              {appsLoading ? "Loading…" : `${applications.length} application${applications.length !== 1 ? "s" : ""} received`}
            </p>
            <div className="flex items-center gap-2">
              <div className="glass-sm flex items-center gap-1.5 px-2.5 py-1">
                <Search className="w-3 h-3 text-white/28" />
                <input value={appSearch} onChange={e => setAppSearch(e.target.value)} placeholder="Search applicants…" className="bg-transparent text-[10px] text-white/55 outline-none w-32 placeholder-white/20" />
              </div>
              <button
                onClick={() => {
                  const visible = applications.filter(a =>
                    !appSearch || a.name.toLowerCase().includes(appSearch.toLowerCase()) || a.email.toLowerCase().includes(appSearch.toLowerCase())
                  );
                  const header = ["ID","Name","Email","Phone","Position","CV/LinkedIn","Message","Status","Date"].join(",");
                  const rows = visible.map(a => [
                    a.id,
                    `"${a.name.replace(/"/g,'""')}"`,
                    a.email,
                    a.phone ?? "",
                    `"${(a.jobTitle ?? "Open Application").replace(/"/g,'""')}"`,
                    a.linkedin ?? "",
                    `"${(a.message ?? "").replace(/"/g,'""')}"`,
                    a.status,
                    a.createdAt.slice(0,10),
                  ].join(","));
                  const csv = [header,...rows].join("\n");
                  const blob = new Blob([csv],{type:"text/csv"});
                  const url = URL.createObjectURL(blob);
                  const link = document.createElement("a");
                  link.href = url; link.download = `applications-${new Date().toISOString().slice(0,10)}.csv`;
                  link.click(); URL.revokeObjectURL(url);
                }}
                className="glass-sm px-2.5 py-1.5 text-[10px] text-white/45 hover:text-white/70 transition-colors"
              >
                Export CSV
              </button>
              <button onClick={() => void loadApplications()} className="glass-sm px-2.5 py-1.5 text-[10px] text-white/45 hover:text-white/70 transition-colors">Refresh</button>
            </div>
          </div>

          {/* Bulk action bar */}
          {selectedApps.size > 0 && (
            <div className="flex items-center gap-3 glass border border-white/[0.08] rounded-xl px-4 py-2.5">
              <span className="text-[11px] text-white/55 font-600">{selectedApps.size} selected</span>
              <div className="flex items-center gap-2 ml-1">
                {(["reviewed","interview","hired","rejected"] as Application["status"][]).map(s => (
                  <button key={s} onClick={() => void handleBulkStatus(s)}
                    className="px-2.5 py-1 rounded-full text-[10px] font-600 border transition-all bg-white/[0.04] text-white/50 border-white/[0.08] hover:bg-white/[0.08] hover:text-white/75 capitalize">
                    → {s}
                  </button>
                ))}
              </div>
              <button onClick={() => void handleBulkDelete()}
                className="ml-auto flex items-center gap-1 px-3 py-1 rounded-lg text-[10px] font-600 bg-red-500/10 text-red-400/80 border border-red-500/20 hover:bg-red-500/20 transition-colors">
                <Trash2 className="w-3 h-3" /> Delete {selectedApps.size}
              </button>
              <button onClick={() => setSelectedApps(new Set())} className="text-white/25 hover:text-white/50">
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {appsError && <p className="text-[11px] text-red-400 glass border border-red-500/20 px-3 py-2 rounded-lg">{appsError}</p>}
          <div className="glass overflow-hidden">
            {appsLoading ? (
              <div className="flex items-center justify-center py-12 gap-2 text-white/25 text-[12px]"><Loader2 className="w-4 h-4 animate-spin" /> Loading applications…</div>
            ) : (() => {
              const visibleApps = applications.filter(a =>
                !appSearch || a.name.toLowerCase().includes(appSearch.toLowerCase()) || a.email.toLowerCase().includes(appSearch.toLowerCase())
              );
              const allSelected = visibleApps.length > 0 && visibleApps.every(a => selectedApps.has(a.id));
              return (
                <table className="w-full text-[11px]">
                  <thead>
                    <tr className="border-b border-white/[0.06]">
                      <th className="pl-4 py-2.5 w-8">
                        <input type="checkbox" checked={allSelected} onChange={() => {
                          if (allSelected) setSelectedApps(new Set());
                          else setSelectedApps(new Set(visibleApps.map(a => a.id)));
                        }} className="accent-white cursor-pointer" />
                      </th>
                      {["Applicant","Position","Phone","CV / LinkedIn","Message","Status","Date","Actions"].map(h => (
                        <th key={h} className="text-left px-3 py-2.5 text-[10px] font-600 tracking-widest text-white/30 uppercase">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {visibleApps.map((a, i, arr) => (
                      <tr key={a.id} className={`border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors ${selectedApps.has(a.id) ? "bg-white/[0.025]" : ""} ${i === arr.length - 1 ? "border-b-0" : ""}`}>
                        <td className="pl-4 py-3">
                          <input type="checkbox" checked={selectedApps.has(a.id)} onChange={() => toggleSelectApp(a.id)} className="accent-white cursor-pointer" />
                        </td>
                        <td className="px-3 py-3">
                          <p className="font-600 text-white/80">{a.name}</p>
                          <p className="text-[10px] text-white/30 font-mono mt-0.5">{a.email}</p>
                        </td>
                        <td className="px-3 py-3 text-white/45 max-w-[140px]"><p className="truncate">{a.jobTitle ?? "Open Application"}</p></td>
                        <td className="px-3 py-3 text-white/35 text-[10px]">
                          {a.phone ?? <span className="text-white/20">—</span>}
                        </td>
                        <td className="px-3 py-3">
                          <div className="flex flex-col gap-1">
                            {a.cvUrl && (
                              <a
                                href={`/api/storage/objects${a.cvUrl.replace(/^\/objects/, "")}`}
                                target="_blank" rel="noopener noreferrer"
                                className="flex items-center gap-1 text-[10px] text-emerald-400/70 hover:text-emerald-400 transition-colors"
                              >
                                <ExternalLink className="w-3 h-3 shrink-0" />
                                <span>Download CV</span>
                              </a>
                            )}
                            {a.linkedin ? (
                              <a href={a.linkedin.startsWith("http") ? a.linkedin : `https://${a.linkedin}`}
                                target="_blank" rel="noopener noreferrer"
                                className="flex items-center gap-1 text-[10px] text-cyan-400/70 hover:text-cyan-400 transition-colors">
                                <ExternalLink className="w-3 h-3 shrink-0" />
                                <span className="truncate max-w-[100px]">LinkedIn</span>
                              </a>
                            ) : (!a.cvUrl && <span className="text-white/20 text-[10px]">—</span>)}
                          </div>
                        </td>
                        <td className="px-3 py-3 text-white/35 max-w-[160px]">
                          {a.message ? <p className="text-[10px] truncate">{a.message}</p> : <span className="text-white/20">—</span>}
                        </td>
                        <td className="px-3 py-3">
                          <select
                            value={a.status}
                            onChange={e => void updateAppStatus(a.id, e.target.value as Application["status"])}
                            className={`px-2 py-1 rounded-full text-[10px] font-600 border outline-none cursor-pointer transition-all ${
                              a.status === "new" ? "bg-blue-500/10 text-blue-400 border-blue-500/20" :
                              a.status === "reviewed" ? "bg-amber-500/10 text-amber-400 border-amber-500/20" :
                              a.status === "interview" ? "bg-cyan-500/10 text-cyan-400 border-cyan-500/20" :
                              a.status === "hired" ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" :
                              "bg-red-500/8 text-red-400/70 border-red-500/15"
                            } bg-[#0d0d0d]`}
                          >
                            <option value="new">New</option>
                            <option value="reviewed">Reviewed</option>
                            <option value="interview">Interview</option>
                            <option value="hired">Hired</option>
                            <option value="rejected">Rejected</option>
                          </select>
                        </td>
                        <td className="px-3 py-3 text-white/30 font-mono text-[10px]">{a.createdAt.slice(0,10)}</td>
                        <td className="px-3 py-3">
                          <a href={`mailto:${a.email}`} className="text-[10px] text-white/30 hover:text-white/70 transition-colors underline">Reply</a>
                        </td>
                      </tr>
                    ))}
                    {visibleApps.length === 0 && (
                      <tr><td colSpan={9} className="px-4 py-12 text-center text-white/25 text-[12px]">
                        {appSearch ? `No applicants match "${appSearch}"` : "No applications yet. They will appear here when candidates apply through the website."}
                      </td></tr>
                    )}
                  </tbody>
                </table>
              );
            })()}
          </div>
        </div>
      )}

      {deleteRoleId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center" onClick={() => setDeleteRoleId(null)}>
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
          <div className="relative bg-[#0d0d0d] border border-white/[0.1] rounded-2xl p-6 w-[340px] shadow-[0_20px_80px_rgba(0,0,0,0.8)]" onClick={e => e.stopPropagation()}>
            <h3 className="text-[14px] font-700 text-white/85 mb-2">Delete Role?</h3>
            <p className="text-[11px] text-white/45 mb-5">Deleting <strong className="text-white/65">{roles.find(r => r.id === deleteRoleId)?.name}</strong> will affect all members assigned to this role. Reassign them first.</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteRoleId(null)} className="flex-1 py-2 text-[11px] text-white/50 glass-sm rounded-lg">Cancel</button>
              <button onClick={() => { deleteRole(deleteRoleId); setDeleteRoleId(null); }}
                className="flex-1 py-2 text-[11px] font-600 bg-red-500/15 hover:bg-red-500/25 border border-red-500/30 text-red-300 rounded-lg transition-colors">
                Delete Role
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
