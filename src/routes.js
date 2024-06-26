import React from "react";

// Admin Imports
import MainDashboard from "views/admin/default";
import NFTMarketplace from "views/admin/marketplace";
import Profile from "views/admin/profile";
import DataTables from "views/admin/tables";

// Auth Imports
import SignIn from "views/auth/SignIn";

// Icon Imports
import {
  MdHome,
  MdOutlineShoppingCart,
  MdBarChart,
  MdPerson,
  MdLock,
  MdOutlineFlag,
  MdOutlineShowChart,
  MdOutlineGpsFixed,
  MdOutlinePeople,
} from "react-icons/md";
import Signup from "views/auth/Signup";
import Objectives from "views/admin/Objectives/Objectives";
import Regions from "views/admin/default/components/Regions";
import Representatives from "views/admin/Representatives/Representatives";
import ViewObjectives from "views/admin/Objectives/ViewObjectives";

const routes = [
  {
    name: "Main Dashboard",
    layout: "/admin",
    path: "default",
    icon: <MdHome className="h-6 w-6" />,
    component: <MainDashboard />,
  },
  {
    name: "Objectives",
    layout: "/admin",
    icon: <MdOutlineShowChart className="h-6 w-6" />,
    path: "objectives",
    component: <Objectives />,
  },
  {
    name: "View Objectives",
    layout: "/admin",
    icon: <MdOutlineFlag className="h-6 w-6" />,
    path: "view_objectives/:representativeId/",
    component: <ViewObjectives />,
  },
  {
    name: "Indicators",
    layout: "/admin",
    icon: <MdOutlineFlag className="h-6 w-6" />,
    path: "indicators",
    component: <Objectives />,
  },
  {
    name: "Targets",
    layout: "/admin",
    icon: <MdOutlineGpsFixed className="h-6 w-6" />,
    path: "targets",
    component: <Objectives />,
  },
  {
    name: "Regions Data",
    layout: "/admin",
    icon: <MdOutlineGpsFixed className="h-6 w-6" />,
    path: 'regions',
    component: <Regions />,
  },
  {
    name: "Regions Representatives",
    layout: "/admin",
    icon: <MdOutlinePeople className="h-6 w-6" />,
    path: 'representatives',
    component: <Representatives />,
  },
  {
    name: "NFT Marketplace",
    layout: "/admin",
    path: "nft-marketplace",
    icon: <MdOutlineShoppingCart className="h-6 w-6" />,
    component: <NFTMarketplace />,
    secondary: true,
  },
  {
    name: "Data Tables",
    layout: "/admin",
    icon: <MdBarChart className="h-6 w-6" />,
    path: "data-tables",
    component: <DataTables />,
  },
  {
    name: "Profile",
    layout: "/admin",
    path: "profile",
    icon: <MdPerson className="h-6 w-6" />,
    component: <Profile />,
  },
  {
    name: "Sign In",
    layout: "/auth",
    path: "sign-in",
    icon: <MdLock className="h-6 w-6" />,
    component: <SignIn />,
  },
  {
    name: "Register",
    layout: "/auth",
    path: "register",
    icon: <MdLock className="h-6 w-6" />,
    component: <Signup />,
  },
];
export default routes;
