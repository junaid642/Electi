import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(value: number, currency = "SAR") {
  if (value >= 1_000_000) return `${currency} ${(value / 1_000_000).toFixed(1)}M`;
  if (value >= 1_000) return `${currency} ${(value / 1_000).toFixed(0)}K`;
  return `${currency} ${value.toLocaleString()}`;
}

export function formatDate(date: string | Date) {
  return new Date(date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export function formatRelative(date: string | Date) {
  const d = new Date(date);
  const now = new Date();
  const diff = Math.floor((now.getTime() - d.getTime()) / 1000);
  if (diff < 60) return `${diff}s ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}

export const STAGE_COLOR: Record<string, string> = {
  "Incoming Lead":         "badge-blue",
  "Initial Contact":       "badge-cyan",
  "Qualified":             "badge-purple",
  "Discovery Meeting":     "badge-amber",
  "Demo Scheduled":        "badge-amber",
  "Proposal Preparation":  "badge-white",
  "Proposal Sent":         "badge-amber",
  "Client Review":         "badge-blue",
  "Negotiation":           "badge-amber",
  "Waiting for Approval":  "badge-purple",
  "Legal / Procurement":   "badge-cyan",
  "Won":                   "badge-green",
  "Lost":                  "badge-red",
  "Follow-Up Later":       "badge-cyan",
  "Strategic Opportunity": "badge-purple",
  "Partnership Potential": "badge-cyan",
};

export const STATUS_COLOR: Record<string, string> = {
  Active:      "badge-green",
  Inactive:    "badge-white",
  Pending:     "badge-amber",
  Overdue:     "badge-red",
  Paid:        "badge-green",
  Draft:       "badge-white",
  Sent:        "badge-blue",
  Viewed:      "badge-purple",
  Accepted:    "badge-green",
  Rejected:    "badge-red",
  "In Progress": "badge-blue",
  Completed:   "badge-green",
  Planning:    "badge-amber",
  "On Hold":   "badge-white",
  Live:        "badge-green",
  Expired:     "badge-red",
};
