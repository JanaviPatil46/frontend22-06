import { AiOutlineAppstoreAdd } from "react-icons/ai";
import { MdOutlineMail } from "react-icons/md";
import { GoDotFill } from "react-icons/go";
import {  IoPeopleOutline} from "react-icons/io5";
// import { TbTemplate } from "react-icons/tb";
import { LuWorkflow } from "react-icons/lu";
import { MdFormatListBulletedAdd } from "react-icons/md";
export const menuItems = [
  
  {
    title: "Home",
    path: "/clientdash/home",
    icon: <AiOutlineAppstoreAdd />,
  },

  {
    title: "Documents",
    path: "/clientdash/document",
    icon: <MdOutlineMail />,
  },
  {
    title: "Chats & Task", 
    icon: <IoPeopleOutline />,
    submenus: [
      {
        title: "Chat",
        path: "/clientdash/chats",
        icon: <GoDotFill />
        ,
        
      },
      {
        title: "Task",
        path: "/clientdash/task",
        icon: <GoDotFill />,
      },
    ],
  },
  {
    title: "Organizers", 
    path: "/clientdash/organiser",
    icon: <LuWorkflow />,
    // submenus: [
    //   {
    //     title: "Tasks",
    //     path: "",
    //     icon: <GoDotFill />,
    //   },
    //   {
    //     title: "Jobs",
    //     path: "",
    //     icon: <GoDotFill />,
    //   },
    //   {
    //     title: "Jobrecurrences",
    //     path: "",
    //     icon: <GoDotFill />,
    //   },
    //   {
    //     title: "Pipelines",
    //     path: "",
    //     icon: <GoDotFill />,
    //   },
     
    // ],
  },
  
{
    title: "Proposals & ELS", 
    icon: <MdFormatListBulletedAdd />,
    submenus: [
      
      {
        title: "Proposals ",
        path: "/clientdash/proposals",
        icon: <GoDotFill />,
      },
     
      // {
      //   title: "Tags",
      //   path: "/tags",
      //   icon: <GoDotFill />,
      // },
      {
        title: "ELS",
        path: "/clientdash/els",
        icon: <GoDotFill />,
      },
      
    ],
  },
  {
    title: "Billing",
    path: "/clientdash/billing",
    icon: <AiOutlineAppstoreAdd />,
  },
  {
    title: "Settings",
    path: "/clientdash/setting",
    icon: <AiOutlineAppstoreAdd />,
  },
  {
    title: "Settings22",
    path: "/clientdash/2",
    icon: <AiOutlineAppstoreAdd />,
  },

  
];
