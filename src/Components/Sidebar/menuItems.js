import { AiOutlineAppstoreAdd } from "react-icons/ai";
import { MdOutlineMail } from "react-icons/md";
import { GoDotFill } from "react-icons/go";
import {  IoPeopleOutline} from "react-icons/io5";
// import { TbTemplate } from "react-icons/tb";
import { LuWorkflow } from "react-icons/lu";
import { MdFormatListBulletedAdd } from "react-icons/md";
import { FiSettings } from "react-icons/fi";
import { LiaMoneyBillSolid } from "react-icons/lia";

export const menuItems = [
  
  {
    title: "Insights",
    path: "/",
    icon: <AiOutlineAppstoreAdd />,
  },

  {
    title: "Inbox +",
    path: "/inbox",
    icon: <MdOutlineMail />,
  },
  {
    title: "Clients", 
    icon: <IoPeopleOutline />,
    submenus: [
      {
        title: "Accounts",
        path: "/accounts",
        icon: <GoDotFill />
        ,
        
      },
      {
        title: "Contacts",
        path: "/contacts",
        icon: <GoDotFill />,
      },
    ],
  },
  {
    title: "Workflow", 
    icon: <LuWorkflow />,
    submenus: [
      {
        title: "Jobs",
        path: "/jobs",
        icon: <GoDotFill />,
      },
      {
        title: "Jobrecurrences",
        path: "/tags",
        icon: <GoDotFill />,
      },
      {
        title: "Pipelines",
        path: "/pipeline",
        icon: <GoDotFill />,
      },
     
     
    ],
  },
  {
    title: "Billing",
    icon: <LiaMoneyBillSolid />,
    submenus: [
      
      {
        title: "Invoices",
        path: "/billinginvoices",
        icon: <GoDotFill />,
      },
    ],
  },
  
{
    title: "Templates", 
    icon: <MdFormatListBulletedAdd />,
    submenus: [
      
      {
        title: "Firm templates",
        path: "/firmtemplates/tasks",
        icon: <GoDotFill />,
      },
     
      // {
      //   title: "Tags",
      //   path: "/tags",
      //   icon: <GoDotFill />,
      // },
      {
        title: "Teams & Plans",
        path: "/teams/plansoverview",
        icon: <GoDotFill />,
      },
      


      {
        title: "Services",
        path: "/services",
        icon: <GoDotFill />,
      },



      
    ],
  },

  {
    title: "Settings",
    icon: <FiSettings />,
    submenus: [
      
      {
        title: "My account",
        path: "/myaccount",
        icon: <GoDotFill />,
      },
      {
        title: "Email Fetch",
        path: "/emailfetch",
        icon: <GoDotFill />,
      },
      {
        title: "Inbox",
        path: "/Inboxmail",
        icon: <GoDotFill />,
      },
      {
        title: "Sent Email",
        path: "/Sentmail",
        icon: <GoDotFill />,
      },
   
     
    ],
  }
  
];
