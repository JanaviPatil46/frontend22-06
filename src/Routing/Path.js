import React from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import AdminLogin from "../Logins/AdminLogin/AdminLogin/AdminLogin";
import Error from "../Error404/Error";
import "../App.css";
import AdminSignup from "../Logins/AdminLogin/AdminSignup/AdminSignUp.js";
import Sidebar from "../Components/Sidebar/Sidebar.js";
import ForgotPassword from "../Logins/AdminLogin/AdminLogin/ForgotPassword";
import ResetPassword from "../Logins/AdminLogin/AdminLogin/ResetPassword";
import Insights from "../Pages/AllPages/Insights/Insights.js";
import AccountsData from "../Pages/AllPages/Insights/AccountsData.js";

import Overview from "../Components/nested-navbar/NewPages/Overview.js";
import Notes from "../Components/nested-navbar/NewPages/Notes";
import Workflow from "../Components/nested-navbar/NewPages/Workflow";
import Pipelines from "../Components/nested-navbar/workflow-nav/Pipelines";
import ActiveJobs from "../Components/nested-navbar/workflow-nav/ActiveJobs";
import ArchivedJobs from "../Components/nested-navbar/workflow-nav/ArchivedJobs";
import Info from "../Components/nested-navbar/NewPages/Info";
import Proposals from "../Components/nested-navbar/NewPages/Proposals";
import Docs from "../Components/nested-navbar/NewPages/Docs";
import Communication from "../Components/nested-navbar/NewPages/Commuication";
import Organizers from "../Components/nested-navbar/NewPages/Organizers";
import Invoices from "../Components/nested-navbar/NewPages/Invoices";
import Email from "../Components/nested-navbar/NewPages/Email";
import Inbox from "../Components/nested-navbar/email-nav/Inbox";
import Sent from "../Components/nested-navbar/email-nav/Sent";
import Payments from "../Components/nested-navbar/invoices-nav/Payments";
import Invoice from "../Components/nested-navbar/invoices-nav/Invoice";
import AccountDash from "../Pages/AllPages/Insights/AccountsDash.js";
import Documents from "../Components/nested-navbar/documents-nav/Documents";
import Approvals from "../Components/nested-navbar/documents-nav/Approvals";
import Signatures from "../Components/nested-navbar/documents-nav/Signatures";
import FileRequest from "../Components/nested-navbar/documents-nav/FileRequest";
import Trash from "../Components/nested-navbar/documents-nav/Trash";
import IRS from "../Components/nested-navbar/documents-nav/IRS";
import TagCreate from "../Pages/AllPages/Insights/TagCreate.js";
import ContactTable from "../Pages/AllPages/Insights/ContactTable.js";

import FirmTemplates from "../Pages/AllPages/Insights/FirmTemplates.js";
import JobsTemp from "../Components/Templates/JobTemp.js";
import PipelinesTemp from "../Components/Templates/PipelineTemp.js";
import OrgnizersTemp from "../Components/Templates/OrganizersTemp.js";
import FoldersTemp from "../Components/Templates/FolderTemp.js";
import ChatsTemp from "../Components/Templates/ChatsTemp.js";
import SmsTemp from "../Components/Templates/SmsTemp.js";
import ProposalsTemp from "../Components/Templates/ProposalsTemp.js";
import InvoicesTemp from "../Components/Templates/InvoicesTemp.js";
import RecurringInvoices from "../Components/Templates/RecurringInvoices.js";
import SignaturesTemp from "../Components/Templates/SignaturesTemp.js";
import PipelineTempUpdate from "../Components/Templates/PipelineTempUpdate.js";
import JobTemplateUpdate from "../Components/Templates/JobTemplateUpdate.js";
import CreateEmailTemplate from "../Components/Templates/CreateEmailTemplate.js";
import UpdateEmail from "../Components/Templates/UpdateEmail.js";
import ClientLogin from "../Logins/ClientSignup/ClientLogin/ClientLogin.js";
import ClientSignup from "../Logins/ClientSignup/ClientSignup/ClientSignup.js";
// import ClientDash from "../Pages/Dashboards/ClientDashboard/ClientDash.js";
import TeamsPlans from "../Pages/AllPages/Insights/TeamsPlans.js";
import PlanOverview from "../Components/nested-navbar/teamplans-nav/PlanOverview.js";
import TeamMembers from "../Components/nested-navbar/teamplans-nav/TeamMembers.js";
import TeamInvoices from "../Components/nested-navbar/teamplans-nav/Invoices.js";
import ActiveMembres from "../Pages/AllPages/Insights/ActiveMembres.js";
import DeactivatedMembers from "../Pages/AllPages/Insights/DeactivatedMembers.js";
import ActiveAccount from "../Pages/AllPages/Insights/ActiveAccount.js";
import ClientSidebar from "../Client-dash/ClientSidebar.js";
import NoPage from "../Client-dash/client-pages/NoPage.js";
import Home from "../Client-dash/client-pages/Home.js";
import Document from "../Client-dash/client-pages/Document.js";
import Chats from "../Client-dash/client-pages/Chats.js";
import Task from "../Client-dash/client-pages/Tasks.js";
import Organizer from "../Client-dash/client-pages/Organiser.js";
import Proposal from "../Client-dash/client-pages/Proposals.js";
import ELS from "../Client-dash/client-pages/Els.js";
import Billing from "../Client-dash/client-pages/Billing.js";
import Settings from "../Client-dash/client-pages/Settings.js";
import AddJobs from "../Pages/AllPages/Insights/AddJobs.js";
import JobsData from "../Pages/AllPages/Insights/JobsData.js";
import Archive from "../Client-dash/client-pages/nav-pages/Archive.js";
import Active from "../Client-dash/client-pages/nav-pages/Active.js";
import Myaccount from "../Pages/AllPages/Insights/My_account";
import BillingInvoces from "../Client-dash/client-pages/Billing_nav/Invoices.js";
import Recurring_invoices from "../Client-dash/client-pages/Billing_nav/Recurring_invoices.js";
import Payment from "../Client-dash/client-pages/Billing_nav/Payment.js";
import Tasks from "../Components/Templates/Tasks.js";
import CreateInvoice from "../Pages/AllPages/Insights/CreateInvoice.js";
import OneTimeInvoice from "../Pages/AllPages/Insights/OneTimeInvoice.js";
import BillingRecurringInvoice from "../Pages/AllPages/Insights/RecurringInvoice.js";
import Services from "../Components/Templates/Services.js";
import ServiceTemplateUpdate from "../Components/Templates/ServiceTemplateUpdate.js";
import InvoicesTempUpdate from "../Components/Templates/InvoicesTempUpdate.js";
import ChatsTempUpdate from "../Components/Templates/ChatsTempUpdate.js";
import OneTimeInvoiceUpdate from "../Pages/AllPages/Insights/OneTimeInvoiceUpdate.js";
import PipelineList from '../Pages/AllPages/Insights/PipelineList.js'
import TaskEditor from "../Components/Templates/TaskEditor.js";
import StaticOrganizer from "../Pages/AllPages/Insights/StaticOrganizer.js";
import EmailFetch from "../Pages/settings/EmailFetch.js";
import Inboxemail from "../Pages/settings/Inboxemail.js";
import SentEmail from "../Pages/settings/SentEmail.js";
import OrganizerTempUpdate from "../Components/Templates/OrganizerTempUpdate.js";
import CreateOrganizerUpdate from '../Pages/AllPages/Insights/createOrganizerUpdate.js'
import CreateOrganizer from '../Pages/AllPages/Insights/createOrganizer.js';
import InboxOrg from '../Pages/AllPages/Insights/Inbox.js'
// import UpdateJobCard from "../Pages/AllPages/Insights/UpdateJobCard.js";
const Path = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Sidebar />}>
          <Route index element={<Insights />} />
          <Route path="/accounts" element={<AccountsData />} />
         <Route path="/inbox" element={<InboxOrg/>}/>
          <Route path="*" element={<Error />} />
          <Route path="/staticorganizer" element={<StaticOrganizer/>}/>
          <Route path='/pipeline' element={<PipelineList />} ></Route>
          {/* <Route path="/updatejobcard/:id" element={<UpdateJobCard/>}/> */}
          
          {/* <Route path="/tags" element={<TagCreate />} /> */}
          <Route path="/contacts" element={<ContactTable />} />
          <Route path="/invoiceupdate/:_id" element={<OneTimeInvoiceUpdate />} />
          <Route path="/createOrganizer/:data" element={<CreateOrganizer />} />
          <Route path="/billinginvoices" element={<CreateInvoice />}>
            <Route path="onetime" element={<OneTimeInvoice />} />
            <Route path="recurring" element={<BillingRecurringInvoice />} />
          </Route>

          <Route path="/teams/" element={<TeamsPlans />}>
            <Route path="plansoverview" element={<PlanOverview />} />
            <Route path="teammembers/" element={<TeamMembers />}>
              <Route path="active" element={<ActiveMembres />}></Route>

              <Route path="deactivated" element={<DeactivatedMembers />} />
            </Route>
            <Route path="invoices" element={<TeamInvoices />} />
          </Route>

          <Route path="/upemailtemplate/:_id" element={<UpdateEmail />} />
          <Route path="firmtemplates" element={<FirmTemplates />}>
          <Route path="tasks" element={<Tasks />} />
          <Route path="tasks/TaskTemplateUpdate/:_id" element={<TaskEditor />} />
            <Route path="tags" element={<TagCreate />}>
              {/* <Route path="tags"  /> */}
            </Route>

            <Route path="emails" element={<CreateEmailTemplate />} />

            <Route path="jobs" element={<JobsTemp />} />
            <Route path="jobs/JobTemplateUpdate/:_id" element={<JobTemplateUpdate />} />
            <Route path="pipelines" element={<PipelinesTemp />} />
            <Route path="pipelines/PipelineTemplateUpdate/:_id" element={<PipelineTempUpdate />} />
            <Route path="organizers" element={<OrgnizersTemp />} />
            <Route path="organizers/OrganizerTempUpdate/:_id" element={<OrganizerTempUpdate />} />
            <Route path="folders/" element={<FoldersTemp />}></Route>

            <Route path="chats" element={<ChatsTemp />} />
            <Route path="sms" element={<SmsTemp />} />
            <Route path="proposals" element={<ProposalsTemp />} />
            <Route path="invoices" element={<InvoicesTemp />} />
            <Route path="recurring-invoices" element={<RecurringInvoices />} />
            <Route path="signatures" element={<SignaturesTemp />} />
            <Route path="invoices/invoicestempupdate/:_id" element={<InvoicesTempUpdate />} />
            <Route path="chats/chatstempupdate/:_id" element={<ChatsTempUpdate />} />
          </Route>

          <Route path="/services" element={<Services />} />
          <Route path="services/ServiceTemplateUpdate/:_id" element={<ServiceTemplateUpdate />} />

          <Route path="/myaccount" element={<Myaccount />} />
          <Route path="/CreateOrganizerUpdate/:_id" element={<CreateOrganizerUpdate />} />
          <Route path="/emailfetch" element={<EmailFetch />} />
          <Route path="/Inboxmail" element={<Inboxemail />} />
          <Route path="/Sentmail" element={<SentEmail />} />

          {/* <Route path='/contacts' element={<Contact/>}/> */}
          <Route path="/accountsdash" element={<AccountDash />}>
            <Route path="overview/:data" element={<Overview />} />
            <Route path="info/:data" element={<Info />} />
            <Route path="docs/:data" element={<Docs />}>
              <Route path="documents" element={<Documents />} />
              <Route path="approvals" element={<Approvals />} />
              <Route path="signatures" element={<Signatures />} />
              <Route path="filerequests" element={<FileRequest />} />
              <Route path="trash" element={<Trash />} />
              <Route path="irs" element={<IRS />} />
            </Route>
            <Route path="communication/:data" element={<Communication />} />
            <Route path="organizers/:data" element={<Organizers />} />
            <Route path="invoices/:data" element={<Invoices />}>
              <Route path="invoice" element={<Invoice />} />
              <Route path="payments" element={<Payments />} />
            </Route>
            <Route path="email/:data" element={<Email />}>
              <Route path="inbox" element={<Inbox />} />
              <Route path="sent" element={<Sent />} />
            </Route>
            <Route path="proposals/:data" element={<Proposals />} />
            <Route path="notes/:data" element={<Notes />} />

            <Route path="workflow/:data" element={<Workflow />}>
              <Route path="pipelines" element={<Pipelines />} />
              <Route path="activejobs" element={<ActiveJobs />} />
              <Route path="archivedjobs" element={<ArchivedJobs />} />
            </Route>
          </Route>
          <Route path="/AddJobs" element={<AddJobs />} />
          <Route path="/jobs" element={<JobsData />} />
        </Route>
        <Route path="/signup" element={<AdminSignup />} />
        <Route path="/login" element={<AdminLogin />} />
        <Route path="/forgotpass" element={<ForgotPassword />} />
        <Route path="*" element={<Error />} />
        <Route path="/resetpassword/:id/:token" element={<ResetPassword />} />

        <Route path="/clientsignup" element={<ClientSignup />} />
        <Route path="/clientlogin" element={<ClientLogin />} />
        {/* <Route path="/clientDash" element={<ClientDash />} /> */}

        {/* Client dashboard routes */}
        <Route path="/clientdash" element={<ClientSidebar />}>
          <Route path="*" element={<NoPage />} />
          <Route path="home" element={<Home />} />
          <Route path="document" element={<Document />} />
          <Route path="chats" element={<Chats />} />
          <Route path="task" element={<Task />} />
          <Route path="organiser/" element={<Organizer />}>
            {/* <Route index element={<Active/>} /> */}
            <Route path="active" element={<Active />} />
            <Route path="archive" element={<Archive />} />
          </Route>
          <Route path="proposals" element={<Proposal />} />
          <Route path="els" element={<ELS />} />
          <Route path="billing" element={<Billing />}>
            <Route path="invoices" element={<BillingInvoces />} />
            <Route path="recurring_invoices" element={<Recurring_invoices />} />
            <Route path="payment" element={<Payment />} />
          </Route>
          <Route path="setting" element={<Settings />} />
        </Route>

        <Route path="/activate/:_id/:token" element={<ActiveAccount />} />
      </Routes>
    </Router>
  );
};

export default Path;
