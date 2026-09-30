// src/App.tsx
import { Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

/* =====================================================
   CORE LAYOUTS
===================================================== */
import Layout from "./layouts/Layout";
import WorkspaceLayout from "./layouts/WorkspaceLayout";

import CustomerLayout from "./layouts/CustomerLayout";
import FieldLayout from "./layouts/FieldLayout";
import FinanceLayout from "./layouts/FinanceLayout";
import CommunicationLayout from "./layouts/CommunicationLayout";
import ConferenceLayout from "./layouts/ConferenceLayout";
import CreativeLayout from "./layouts/CreativeLayout";
import MemberLayout from "./layouts/MemberLayout";

/* =====================================================
   AUTH
===================================================== */
import AdminLogin from "./pages/auth/LoginPage";
import InviteAccept from "./pages/InviteAccept";
import MemberLogin from "./pages/auth/MemberLogin";

/* =====================================================
   WORKSPACE – PRE EVENT
===================================================== */
import PreEventDashboard from "./pages/workspace/pre/Dashboard";
import AgendaWorkspace from "./pages/workspace/pre/Agenda";
import BrandingWorkspace from "./pages/workspace/pre/Branding";
import EventDetailsWorkspace from "./pages/workspace/pre/EventDetails";
import TimelineWorkspace from "./pages/workspace/pre/Timeline";
import VenueWorkspace from "./pages/workspace/pre/Venue";
import Landing from "./pages/workspace/pre/Landing";

import WorkspaceEventDetails from "./pages/workspace/pre/EventDetails";
import WorkspaceEmailCampaigns from "./pages/workspace/pre/EmailCampaigns";
import WorkspaceWhatsappCampaigns from "./pages/workspace/pre/WhatsAppCampaigns";
import WorkspaceEmailTemplate from "./pages/workspace/pre/CreateEmailTemplatePage";
import WorkspaceEditEmailTemplate from "./pages/workspace/pre/EditEmailTemplatePage";
import WorkspaceEmailCampaign from "./pages/workspace/pre/RunEmailCampaignPage";

import WorkspaceCoupons from "./pages/workspace/pre/Coupons";
import WorkspaceMedia from "./pages/workspace/pre/Media";
import WorkspaceSEO from "./pages/workspace/pre/Seo";
import WorkspaceRegistration from "./pages/workspace/pre/Registrations";
import WorkspaceCustomeFields from "./pages/workspace/pre/CustomFieldsPage";
import WorkspaceWaitlist from "./pages/workspace/pre/Waitlist";
import WorkspaceTicketPricing from "./pages/workspace/pre/Pricing";
import WorkspacePayments from "./pages/workspace/pre/Payments";
import WorkspaceTeam from "./pages/workspace/pre/Team";
import WorkspaceRoles from "./pages/workspace/pre/Roles";

/* =====================================================
   WORKSPACE – ONGOING EVENT
===================================================== */
import WorkspaceCheckin from "./pages/workspace/ongoing/Checkin";
import WorkspaceSessions from "./pages/workspace/ongoing/Sessions";
import WorkspaceSpeakers from "./pages/workspace/ongoing/Speakers";
import WorkspaceTasks from "./pages/workspace/ongoing/Tasks";
import WorkspaceLIvePayment from "./pages/workspace/ongoing/LivePayments";
import WorkspaceQA from "./pages/workspace/ongoing/Qa";
import WorkspaceSupport from "./pages/workspace/ongoing/Support";
import WorkspacePolls from "./pages/workspace/ongoing/Polls";
import WorkspaceManualCheckin from "./pages/workspace/ongoing/ManualCheckin";

/* =====================================================
   WORKSPACE – POST EVENT
===================================================== */
import WorkspaceArchieve from "./pages/workspace/post/Archive";
import WorkspaceReports from "./pages/workspace/post/Reports";
import WorkspaceFinance from "./pages/workspace/post/Finance";
import WorkspaceAttendance from "./pages/workspace/post/Attendance";
import WorkspaceCertificate from "./pages/workspace/post/Certificates";
import WorkspaceRecordings from "./pages/workspace/post/Recordings";
import WorkspaceGallery from "./pages/workspace/post/Gallery";
import WorkspaceFollowUpEmail from "./pages/workspace/post/FollowupEmails";
import WorkspaceEventSummary from "./pages/workspace/post/Summary";
import WorkspaceCampaignPerformance from "./pages/workspace/post/CampaignPerformance";

/* =====================================================
   ADMIN – DASHBOARD
===================================================== */
import DashboardPage from "./pages/admin/dashboard/DashboardPage";
import LiveMetricsPage from "./pages/admin/dashboard/LiveMetricsPage";
import Activities from "./pages/admin/dashboard/ActivitiesPage";

/* =====================================================
   ADMIN – MEMBERS
===================================================== */
import AllMembersPage from "./pages/admin/members/AllMembersPage";
import ActiveMembersPage from"./pages/admin/members/ActiveMembersPage";
import ExpiredMembersPage from"./pages/admin/members/ExpiredMembersPage";
import BlockedMembersPage from"./pages/admin/members/BlockedMembersPage";
import AddMemberPage from"./pages/admin/members/AddMemberPage";
import MembershipRegistrationsPage from "./pages/admin/members/MembershipRegistrationsPage";


import MemberViewPage from "./pages/admin/members/MemberViewPage";
import MemberEditPage from "./pages/admin/members/MemberEditPage";
import SecurityReviewPage from "./pages/admin/members/SecurityReviewPage";

/* =====================================================
   ADMIN – MEMBERSHIPS
===================================================== */
import MembershipPlansPage from "./pages/admin/memberships/MembershipPlansPage";
import PricingDetailsPage from "./pages/admin/memberships/PricingDetailsPage";
import LimitedOffersPage from "./pages/admin/memberships/LimitedOffersPage";
import CouponsPage from "./pages/admin/memberships/CouponsPage";

import CreateMembershipPlanPage from "./pages/admin/memberships/CreateMembershipPlanPage";
import CreatePricingRulePage from "./pages/admin/memberships/CreatePricingRulePage";
import CreateOfferPage from "./pages/admin/memberships/CreateOfferPage";
import CreateCouponPage from "./pages/admin/memberships/CreateCouponPage";

/* =====================================================
   ADMIN – EVENTS / WEBINARS / STALLS
===================================================== */
import AllEventsPage from "./pages/admin/events/AllEventsPage";
import CreateEventPage from "./pages/admin/events/CreateEventPage";
import EventDetailPage from "./pages/admin/events/EventDetailsPage";
import EditEventPage from "./pages/admin/events/EditEventPage";

import AllWebinarsPage from "./pages/admin/webinars/AllWebinarsPage";
import CreateWebinarPage from "./pages/admin/webinars/CreateWebinarPage";
import WebinarRegistrationsPage from "./pages/admin/webinars/WebinarRegistrationsPage";
import WebinarDetailPage from "./pages/admin/webinars/WebinarDetailPage";
import EditWebinarPage from "./pages/admin/webinars/EditWebinarPage";

import StallMapPage from "./pages/admin/stalls/StallMapPage";
import StallPricingPage from "./pages/admin/stalls/StallPricingPage";
import StallBookingsPage from "./pages/admin/stalls/StallBookingsPage";

import AdminMediaPage from "./pages/admin/media/AdminMediaPage";
import AdminMediaForm from "./pages/admin/media/AdminMediaForm";
import AdminUploadVideo from "./pages/admin/media/AdminUploadVideo";

/* =====================================================
   ADMIN – COMMUNICATION
===================================================== */
import EmailTemplatesPage from "./pages/admin/communication/EmailTemplatesPage";
import CreateEmailTemplatePage from "./pages/admin/communication/CreateEmailTemplatePage";
import EditEmailTemplatePage from "./pages/admin/communication/EditEmailTemplatePage";
import WhatsAppTemplatesPage from "./pages/admin/communication/WhatsAppTemplatesPage";
import SMSTemplatesPage from "./pages/admin/communication/SMSTemplatesPage";
import CampaignRunDetailsPage from "./pages/admin/communication/CampaignRunDetailsPage";
import AdminCampaignsPage from "./pages/admin/communication/AdminCampaignsPage";

/* =====================================================
   ADMIN – FINANCE / REPORTS / AUDIT / SETTINGS
===================================================== */
import PaymentsPage from "./pages/admin/finance/PaymentsPage";
import InvoicesPage from "./pages/admin/finance/InvoicesPage";
import RefundsPage from "./pages/admin/finance/RefundsPage";

import MembershipReportPage from "./pages/admin/reports/MembershipReportPage";
import RevenueReportPage from "./pages/admin/reports/RevenueReportPage";
import EventPerformanceReportPage from "./pages/admin/reports/EventPerformanceReportPage";

import AdminAuditLogsPage from "./pages/admin/audit/AdminAuditLogsPage";
import PaymentLogsPage from "./pages/admin/audit/PaymentLogsPage";

import RolesPermissionsPage from "./pages/admin/settings/RolesPermissionsPage";
import AdminUsersPage from "./pages/admin/settings/AdminUsersPage";
import CreateRolePage from "./pages/admin/settings/CreateRolePage";
import AddAdminPage from "./pages/admin/settings/AddAdminPage";
import SenderSettingsPage from "./pages/admin/settings/SenderSettingsPage";

/* =====================================================
   COMMUNICATION (GLOBAL)
===================================================== */
import CampaignsPage from "./pages/communication/CampaignsPage";
import TemplatesPage from "./pages/communication/TemplatesPage";
import MessageLogsPage from "./pages/communication/MessageLogsPage";
import CreateCampaignPage from "./pages/communication/CreateCampaignPage";
import CreateTemplatePage from "./pages/communication/CreateTemplate";


/* =====================================================
   CONFERENCE
===================================================== */
import ConferenceHallsPage from "./pages/conference/HallsPage";
import SessionsPage from "./pages/conference/SessionsPage";
import SpeakersPage from "./pages/conference/SpeakersPage";
import SchedulePage from "./pages/conference/SchedulePage";
import RegistrationsPage from "./pages/conference/RegistrationsPage";

/* =====================================================
   CREATIVE TEAM
===================================================== */
import CreativeDashboardPage from "./pages/creative/DashboardPage";
import CreativeTasksPage from "./pages/creative/TasksPage";
import UploadsPage from "./pages/creative/UploadsPage";
import ApprovalsPage from "./pages/creative/ApprovalsPage";
import CreativeProfilePage from "./pages/creative/ProfilePage";

/* =====================================================
   FIELD
===================================================== */
import TasksPage from "./pages/field/TasksPage";
import TaskDetailPage from "./pages/field/TaskDetailPage";
import AlertsPage from "./pages/field/AlertsPage";
import AlertDetailPage from "./pages/field/AlertDetailPage";
import ProfileFieldPage from "./pages/field/ProfilePage";

/* =====================================================
   CUSTOMER
===================================================== */
import CustomerDashboard from "./pages/customer/Dashboard";
import MyBookingPage from "./pages/customer/MyBookingPage";
import BookStallPage from "./pages/customer/BookStallPage";
import MyStallPage from "./pages/customer/MyStallPage";
import QRPassPage from "./pages/customer/QRPassPage";
import SupportPage from "./pages/customer/SupportPage";
import ProfilePage from "./pages/customer/ProfilePage";
import PaymentPage from "./pages/customer/PaymentsPage";
import PaymentSummaryPage from "./pages/customer/PaymentSummaryPage";
import BrandingPage from "./pages/customer/BrandingPage";
import BadgePage from "./pages/customer/BadgePage";
import ActivitiesPage from "./pages/customer/ActivitiesPage";


/* =====================================================
   MEMBER PORTAL
===================================================== */
import MemberDashboard from "./pages/members/Dashboard";
import MemberProfile from "./pages/members/Profile";
import MemberResources from "./pages/members/Resources";
import MemberEvents from "./pages/members/Events";
import MemberCommunity from "./pages/members/Community";
import MemberMembership from "./pages/members/Membership";
import MemberSettings from "./pages/members/Settings";
import MemberVideoWatch from "./pages/members/MemberVideoWatch";

/* =====================================================
   MISC
===================================================== */
import NotFoundPage from "./pages/NotFoundPage";

/* =====================================================
   APP
===================================================== */
export default function App() {
  return (
    <Suspense fallback={<div className="p-6">Loading...</div>}>
      <Routes>

        {/* AUTH */}
        <Route path="/" element={<MemberLogin />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/invite/:token" element={<InviteAccept />} />

        {/* MEMBER PORTAL */}
        <Route path="members" element={<MemberLayout />} >
         <Route index element={<Navigate to="dashboard" replace />} />
         <Route path="dashboard" element={<MemberDashboard />} />
         <Route path="profile" element={<MemberProfile />} />
         <Route path="resources" element={<MemberResources />} />
         <Route path="events" element={<MemberEvents />} />
         <Route path="community" element={<MemberCommunity />} />
         <Route path="membership" element={<MemberMembership />} />
         <Route path="settings" element={<MemberSettings />} />
         <Route path="resources/:id" element={<MemberVideoWatch />} />

        </Route>


        {/* WORKSPACE */}
        <Route path="workspace" element={<WorkspaceLayout />}>
          <Route index element={<PreEventDashboard />} />
          <Route path="dashboard" element={<PreEventDashboard />} />
          <Route path="agenda" element={<AgendaWorkspace />} />
          <Route path="branding" element={<BrandingWorkspace />} />
          <Route path="event-details" element={<EventDetailsWorkspace />} />
          <Route path="details" element={<WorkspaceEventDetails />} />
          <Route path="timeline" element={<TimelineWorkspace />} />
          <Route path="venue" element={<VenueWorkspace />} />
          <Route path="landing" element={<Landing />} />

          <Route path="campaigns/email" element={<WorkspaceEmailCampaigns />} />
          <Route path="campaigns/whatsapp" element={<WorkspaceWhatsappCampaigns />} />
          <Route path="email/templates/create" element={<WorkspaceEmailTemplate />} />
          <Route path="email/templates/:templateId/edit" element={<WorkspaceEditEmailTemplate />} />
          <Route path="email/campaigns/create" element={<WorkspaceEmailCampaign />} />

          <Route path="fields" element={<WorkspaceCustomeFields />} />
          <Route path="coupons" element={<WorkspaceCoupons />} />
          <Route path="media" element={<WorkspaceMedia />} />
          <Route path="seo" element={<WorkspaceSEO />} />
          <Route path="registrations" element={<WorkspaceRegistration />} />
          <Route path="waitlist" element={<WorkspaceWaitlist />} />
          <Route path="pricing" element={<WorkspaceTicketPricing />} />
          <Route path="payments" element={<WorkspacePayments />} />
          <Route path="team" element={<WorkspaceTeam />} />
          <Route path="roles" element={<WorkspaceRoles />} />

          <Route path="checkin" element={<WorkspaceCheckin />} />
          <Route path="sessions" element={<WorkspaceSessions />} />
          <Route path="speakers" element={<WorkspaceSpeakers />} />
          <Route path="tasks" element={<WorkspaceTasks />} />
          <Route path="live-payments" element={<WorkspaceLIvePayment />} />
          <Route path="qa" element={<WorkspaceQA />} />
          <Route path="support" element={<WorkspaceSupport />} />
          <Route path="polls" element={<WorkspacePolls />} />
          <Route path="manual-checkin" element={<WorkspaceManualCheckin />} />

          <Route path="archive" element={<WorkspaceArchieve />} />
          <Route path="reports" element={<WorkspaceReports />} />
          <Route path="finance" element={<WorkspaceFinance />} />
          <Route path="attendance" element={<WorkspaceAttendance />} />
          <Route path="certificates" element={<WorkspaceCertificate />} />
          <Route path="recordings" element={<WorkspaceRecordings />} />
          <Route path="gallery" element={<WorkspaceGallery />} />
          <Route path="followup/emails" element={<WorkspaceFollowUpEmail />} />
          <Route path="summary" element={<WorkspaceEventSummary />} />
          <Route path="campaigns" element={<WorkspaceCampaignPerformance />} />
        </Route>

        {/* ADMIN */}
        <Route path="admin" element={<Layout />}>
          <Route index element={<Navigate to="dashboard/home" replace />} />

          {/* DASHBOARD */}
          <Route path="dashboard/home" element={<DashboardPage />} />
          <Route path="dashboard/activities" element={<Activities />} />
          <Route path="dashboard/live" element={<LiveMetricsPage />} />

          {/* MEMBERS */}
          <Route path="members/all" element={<AllMembersPage />} />
          <Route path="members/active" element={<ActiveMembersPage />} />
          <Route path="members/expired" element={<ExpiredMembersPage />} />
          <Route path="members/blocked" element={<BlockedMembersPage />} />
          <Route path="members/security-review" element={<SecurityReviewPage />} />
          <Route path="members/add" element={<AddMemberPage />} />
          <Route path="members/registrations" element={<MembershipRegistrationsPage />} />
          <Route path="members/:id" element={<MemberViewPage />} />
          <Route path="members/:id/edit" element={<MemberEditPage />} />
          
          {/* MEMBERSHIPS */}
          <Route path="memberships/plans" element={<MembershipPlansPage />} />
          <Route path="memberships/plans/create" element={<CreateMembershipPlanPage />} />
          <Route path="memberships/pricing" element={<PricingDetailsPage />} />
          <Route path="memberships/pricing/create" element={<CreatePricingRulePage />} />
          <Route path="memberships/offers" element={<LimitedOffersPage />} />
          <Route path="memberships/offers/create" element={<CreateOfferPage />} />
          <Route path="memberships/coupons" element={<CouponsPage />} />
          <Route path="memberships/coupons/create" element={<CreateCouponPage />} />
          
          {/* EVENTS / WEBINARS / STALLS */}
          <Route path="media/all" element={<AdminMediaPage />} />
          <Route path="media/create" element={<AdminMediaForm />} />
          <Route path="media/:id/edit" element={<AdminMediaForm />} />
          <Route path="media/resources" element={<AdminUploadVideo />} />

          <Route path="events/all" element={<AllEventsPage />} />
          <Route path="events/create" element={<CreateEventPage />} />
          <Route path="events/:id" element={<EventDetailPage />} />
          <Route path="events/:id/edit" element={<EditEventPage />} />

          <Route path="stalls/map" element={<StallMapPage />} />
          <Route path="stalls/bookings" element={<StallBookingsPage />} />
          <Route path="stalls/pricing" element={<StallPricingPage />} />

          <Route path="webinars/all" element={<AllWebinarsPage />} />
          <Route path="webinars/create" element={<CreateWebinarPage />} />
          <Route path="webinars/registrations" element={<WebinarRegistrationsPage />} />
          <Route path="webinars/:id" element={<WebinarDetailPage />} />
          <Route path="webinars/edit/:id" element={<EditWebinarPage />} />

          {/* FINANCE / REPORTS / AUDIT / SETTINGS */}
          <Route path="finance/payments" element={<PaymentsPage />} />
          <Route path="finance/invoices" element={<InvoicesPage />} />
          <Route path="finance/refunds" element={<RefundsPage />} />

          <Route path="comm/email" element={<EmailTemplatesPage />} />
          <Route path="comm/whatsapp" element={<WhatsAppTemplatesPage />} />
          <Route path="comm/campaigns" element={<AdminCampaignsPage />} />
          <Route path="comm/campaigns/:campaignId" element={<CampaignRunDetailsPage />} />
          <Route path="comm/email/create" element={<CreateEmailTemplatePage />} />
          <Route path="comm/email/edit/:id" element={<EditEmailTemplatePage />} />
          <Route path="comm/sms" element={<SMSTemplatesPage />} />

          <Route path="reports/memberships" element={<MembershipReportPage />} />
          <Route path="reports/revenue" element={<RevenueReportPage />} />
          <Route path="reports/events" element={<EventPerformanceReportPage />} />

          <Route path="audit/admin" element={<AdminAuditLogsPage />} />
          <Route path="audit/payments" element={<PaymentLogsPage />} />

          <Route path="settings/rbac" element={<RolesPermissionsPage />} />
          <Route path="settings/admins" element={<AdminUsersPage />} />
          <Route path="settings/admins/create" element={<AddAdminPage />} />
          <Route path="settings/roles/create" element={<CreateRolePage />} />
          <Route path="settings/sender" element={<SenderSettingsPage />} />
        </Route>

        {/* FINANCE */}
        <Route path="/finance" element={<FinanceLayout />} />

        {/* COMMUNICATION */}
        <Route path="/communications" element={<CommunicationLayout />}>
          <Route index element={<CampaignsPage />} />
          <Route path="templates" element={<TemplatesPage />} />
          <Route path="logs" element={<MessageLogsPage />} />
          <Route path="template/create" element={<CreateTemplatePage />} />
          <Route path="campaign/create" element={<CreateCampaignPage />} />
        </Route>

        {/* CONFERENCE */}
        <Route path="/conference" element={<ConferenceLayout />}>
          <Route path="halls" element={<ConferenceHallsPage />} />
          <Route path="sessions" element={<SessionsPage />} />
          <Route path="speakers" element={<SpeakersPage />} />
          <Route path="schedule" element={<SchedulePage />} />
          <Route path="registrations" element={<RegistrationsPage />} />
        </Route>

        {/* CREATIVE */}
        <Route path="/creative" element={<CreativeLayout />}>
          <Route index element={<CreativeDashboardPage />} />
          <Route path="tasks" element={<CreativeTasksPage />} />
          <Route path="uploads" element={<UploadsPage />} />
          <Route path="approvals" element={<ApprovalsPage />} />
          <Route path="profile" element={<CreativeProfilePage />} />
        </Route>

        {/* FIELD */}
        <Route path="/field" element={<FieldLayout />}>
          <Route index element={<TasksPage />} />
          <Route path="tasks/:id" element={<TaskDetailPage />} />
          <Route path="alerts" element={<AlertsPage />} />
          <Route path="alerts/:id" element={<AlertDetailPage />} />
          <Route path="profile" element={<ProfileFieldPage />} />
        </Route>

        {/* CUSTOMER */}
        <Route path="/customer" element={<CustomerLayout />}>
          <Route index element={<CustomerDashboard />} />
          <Route path="booking" element={<MyBookingPage />} />
          <Route path="booking/new" element={<BookStallPage />} />
          <Route path="stall" element={<MyStallPage />} />
          <Route path="payments" element={<PaymentPage />} />
          <Route path="payments/:paymentId" element={<PaymentSummaryPage />} />
          <Route path="branding" element={<BrandingPage />} />
          <Route path="qr" element={<QRPassPage />} />
          <Route path="support" element={<SupportPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="badge" element={<BadgePage />} />
          <Route path="activity" element={<ActivitiesPage />} />
        </Route>

        {/* FALLBACK */}
        <Route path="/no-access" element={<SimpleMessage title="Access Denied" message="No permission" />} />
        <Route path="*" element={<NotFoundPage />} />

      </Routes>
    </Suspense>
  );
}

/* =====================================================
   HELPER
===================================================== */
interface SimpleMessageProps {
  title: string;
  message: string;
}

function SimpleMessage({ title, message }: SimpleMessageProps) {
  return (
    <div className="p-10">
      <h2 className="text-2xl font-semibold">{title}</h2>
      <p className="text-gray-600">{message}</p>
    </div>
  );
}
