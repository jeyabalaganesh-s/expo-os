// src/config/sidebarConfig.ts
import {
  LayoutDashboard,
  Users,
  CreditCard,
  CalendarDays,
  Map,
  GraduationCap,
  Wallet,
  Megaphone,
  BarChart3,
  FileText,
  Settings,
  Image, // ✅ ADD THIS
} from "lucide-react";


export type SidebarItem = {
  label: string;
  path: string;
};

export type SidebarGroup = {
  key: string;
  icon: any;
  label: string;
  roles: string[]; // RBAC
  items: SidebarItem[];
};

export const SIDEBAR_CONFIG: SidebarGroup[] = [
  {
    key: "dashboard",
    icon: LayoutDashboard,
    label: "Dashboard",
    roles: ["SUPER_ADMIN", "ADMIN", "VIEWER"],
    items: [
      { label: "Overview", path: "/admin/dashboard/home" },
      { label: "Live Metrics", path: "/admin/dashboard/live" },
      { label: "Activities", path: "/admin/dashboard/activities" },
    ],
  },
  {
    key: "members",
    icon: Users,
    label: "Members",
    roles: ["SUPER_ADMIN", "MEMBERSHIP_ADMIN"],
    items: [
      { label: "All Members", path: "/admin/members/all" },
      { label: "Active Members", path: "/admin/members/active" },
      { label: "Expired Members", path: "/admin/members/expired" },
      { label: "Blocked Members", path: "/admin/members/blocked" },
      { label: "Registrations", path: "/admin/members/registrations" },
    ],
  },
  {
  key: "memberships",
  icon: CreditCard,
  label: "Memberships",
  roles: ["SUPER_ADMIN", "MEMBERSHIP_ADMIN"],
  items: [
    { label: "Plans", path: "/admin/memberships/plans" },
    { label: "Pricing Rules", path: "/admin/memberships/pricing" },
    { label: "Limited Offers", path: "/admin/memberships/offers" },
    { label: "Coupons", path: "/admin/memberships/coupons" },

  ],
},

  {
    key: "events",
    icon: CalendarDays,
    label: "Events",
    roles: ["SUPER_ADMIN", "OPS_ADMIN"],
    items: [
      { label: "All Events", path: "/admin/events/all" },
      { label: "Create Event", path: "/admin/events/create" },
      { label: "Venues & Cities", path: "/admin/events/venues" },
    ],
  },
  {
    key: "stalls",
    icon: Map,
    label: "Stalls",
    roles: ["SUPER_ADMIN", "OPS_ADMIN"],
    items: [
      { label: "Stall Map", path: "/admin/stalls/map" },
      { label: "Bookings", path: "/admin/stalls/bookings" },
      { label: "Pricing", path: "/admin/stalls/pricing" },
    ],
  },
  {
    key: "webinars",
    icon: GraduationCap,
    label: "Webinars",
    roles: ["SUPER_ADMIN", "CONTENT_ADMIN"],
    items: [
      { label: "All Webinars", path: "/admin/webinars/all" },
      { label: "Create Webinar", path: "/admin/webinars/create" },
      { label: "Registrations", path: "/admin/webinars/registrations" },
    ],
  },
  {
    key: "finance",
    icon: Wallet,
    label: "Finance",
    roles: ["SUPER_ADMIN", "FINANCE_ADMIN"],
    items: [
      { label: "Payments", path: "/admin/finance/payments" },
      { label: "Invoices", path: "/admin/finance/invoices" },
      { label: "Refunds", path: "/admin/finance/refunds" },
    ],
  },
  {
    key: "communication",
    icon: Megaphone,
    label: "Communication",
    roles: ["SUPER_ADMIN", "CONTENT_ADMIN"],
    items: [
      { label: "Campaigns", path: "/admin/comm/campaigns" },
      { label: "Email Templates", path: "/admin/comm/email" },
      { label: "WhatsApp Templates", path: "/admin/comm/whatsapp" },
      { label: "SMS Templates", path: "/admin/comm/sms" },
    ],
  },
  {
    key: "media",
    icon: Image,
    label: "Media",
    roles: ["SUPER_ADMIN", "CONTENT_ADMIN"],
    items: [
      { label: "All Media", path: "/admin/media/all" },
      { label: "Create Media", path: "/admin/media/create" },
      { label: "Resources", path: "/admin/media/resources" },
    ],
  },
  {
    key: "reports",
    icon: BarChart3,
    label: "Reports",
    roles: ["SUPER_ADMIN", "VIEWER"],
    items: [
      { label: "Membership Reports", path: "/admin/reports/memberships" },
      { label: "Revenue Reports", path: "/admin/reports/revenue" },
      { label: "Event Performance", path: "/admin/reports/events" },
    ],
  },
  {
    key: "audit",
    icon: FileText,
    label: "Audit",
    roles: ["SUPER_ADMIN"],
    items: [
      { label: "Admin Logs", path: "/admin/audit/admin" },
      { label: "Payment Logs", path: "/admin/audit/payments" },
    ],
  },
  {
    key: "settings",
    icon: Settings,
    label: "Settings",
    roles: ["SUPER_ADMIN"],
    items: [
      { label: "Roles & Permissions", path: "/admin/settings/rbac" },
      { label: "Admin Users", path: "/admin/settings/admins" },
      { label: "Sender Emails & Domains", path: "/admin/settings/sender" },
      // { label: "System Config", path: "/settings/system" },
    ],
  },
];
