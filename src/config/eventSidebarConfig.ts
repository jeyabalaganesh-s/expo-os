import {
  LayoutDashboard,
  Settings,
  FileText,
  Users,
  Megaphone,
  CreditCard,
  Briefcase,
  Shield,
  QrCode,
    MapPin,
    Palette,
    Search,
    Clock,
    Sliders,
    Tag,
    Receipt,
    ImageIcon,
  Mic,
  ClipboardList,
  MessageSquare,
  Activity,
  BarChart3,
  Video,
  Archive,
  LifeBuoy,
  Mail,
} from "lucide-react";

export type EventPhase = "pre-event" | "on-going" | "post-event";

export const EVENT_SIDEBAR_CONFIG: Record<
  EventPhase,
  {
    section: string;
    items: {
      label: string;
      path: string;
      icon: any;
    }[];
  }[]
> = {
  /* ================= PRE EVENT ================= */
  "pre-event": [
    {
      section: "Overview",
      items: [
        {
          label: "Dashboard",
          path: "",
          icon: LayoutDashboard,
        },
        {
          label: "Event Timeline",
          path: "timeline",
          icon: Activity,
        },
      ],
    },

    {
      section: "Event Setup",
      items: [
        {
          label: "Event Details",
          path: "details",
          icon: Settings,
        },
        {
          label: "Agenda & Schedule",
          path: "agenda",
          icon: FileText,
        },
        {
          label: "Venue / Online Setup",
          path: "venue",
          icon: MapPin,
        },
        {
          label: "Branding & Theme",
          path: "branding",
          icon: Palette,
        },
      ],
    },

    {
      section: "Landing & Content",
      items: [
        {
          label: "Landing Page",
          path: "landing",
          icon: FileText,
        },
        {
          label: "Media Library",
          path: "media",
          icon: ImageIcon,
        },
        {
          label: "SEO & Meta",
          path: "seo",
          icon: Search,
        },
      ],
    },

    {
      section: "Registrations",
      items: [
        {
          label: "Registrations",
          path: "registrations",
          icon: Users,
        },
        {
          label: "Waitlist",
          path: "waitlist",
          icon: Clock,
        },
        {
          label: "Custom Fields",
          path: "fields",
          icon: Sliders,
        },
      ],
    },

    {
      section: "Campaigns",
      items: [
        {
          label: "Email Campaigns",
          path: "campaigns/email",
          icon: Megaphone,
        },
        {
          label: "WhatsApp Campaigns",
          path: "campaigns/whatsapp",
          icon: MessageSquare,
        },
        {
          label: "Coupons",
          path: "coupons",
          icon: Tag,
        },
      ],
    },

    {
      section: "Payments",
      items: [
        {
          label: "Ticket Pricing",
          path: "pricing",
          icon: CreditCard,
        },
        {
          label: "Transactions",
          path: "payments",
          icon: Receipt,
        },
      ],
    },

    {
      section: "Team",
      items: [
        {
          label: "Team Members",
          path: "team",
          icon: Briefcase,
        },
        {
          label: "Roles & Access",
          path: "roles",
          icon: Shield,
        },
      ],
    },
  ],

  /* ================= ONGOING EVENT ================= */
  "on-going": [
    {
      section: "Live Control",
      items: [
        {
          label: "Live Dashboard",
          path: "",
          icon: Activity,
        },
      ],
    },

    {
      section: "Entry & Attendance",
      items: [
        {
          label: "QR Check-in",
          path: "checkin",
          icon: QrCode,
        },
        {
          label: "Manual Check-in",
          path: "manual-checkin",
          icon: Users,
        },
      ],
    },

    {
      section: "Speakers & Sessions",
      items: [
        {
          label: "Speakers",
          path: "speakers",
          icon: Mic,
        },
        {
          label: "Sessions",
          path: "sessions",
          icon: FileText,
        },
      ],
    },

    {
      section: "Operations",
      items: [
        {
          label: "Tasks",
          path: "tasks",
          icon: ClipboardList,
        },
        {
          label: "Helpdesk",
          path: "support",
          icon: LifeBuoy,
        },
      ],
    },

    {
      section: "Engagement",
      items: [
        {
          label: "Live Q&A",
          path: "qa",
          icon: MessageSquare,
        },
        {
          label: "Polls & Feedback",
          path: "polls",
          icon: BarChart3,
        },
      ],
    },

    {
      section: "Payments",
      items: [
        {
          label: "On-spot Payments",
          path: "payments",
          icon: CreditCard,
        },
      ],
    },
  ],

  /* ================= POST EVENT ================= */
  "post-event": [
    {
      section: "Summary",
      items: [
        {
          label: "Event Summary",
          path: "",
          icon: LayoutDashboard,
        },
      ],
    },

    {
      section: "Analytics",
      items: [
        {
          label: "Reports",
          path: "reports",
          icon: BarChart3,
        },
        {
          label: "Attendance Stats",
          path: "attendance",
          icon: Users,
        },
        {
          label: "Campaign Performance",
          path: "campaigns",
          icon: Megaphone,
        },
      ],
    },

    {
      section: "Media",
      items: [
        {
          label: "Recordings",
          path: "recordings",
          icon: Video,
        },
        {
          label: "Gallery",
          path: "gallery",
          icon: ImageIcon,
        },
      ],
    },

    {
      section: "Follow-up",
      items: [
        {
          label: "Thank You Emails",
          path: "followup/emails",
          icon: Mail,
        },
        {
          label: "Certificates",
          path: "certificates",
          icon: FileText,
        },
      ],
    },

    {
      section: "Closure",
      items: [
        {
          label: "Finance Closure",
          path: "finance",
          icon: CreditCard,
        },
        {
          label: "Archive Event",
          path: "archive",
          icon: Archive,
        },
      ],
    },
  ],
};
