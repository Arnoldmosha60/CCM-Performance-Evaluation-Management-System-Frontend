import React from "react";

// Admin Imports
import MainDashboard from "views/admin/default";
import Profile from "views/admin/profile";

// Auth Imports
import SignIn from "views/auth/SignIn";

// Icon Imports
import {
  MdHome,
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
import Targets from "views/admin/Targets/Targets";
import ViewTargets from "views/admin/Targets/ViewTargets";
import ViewIndicators from "views/admin/Indicators/ViewIndicators";
import Indicators from "views/admin/Indicators/Indicators";

const routes = [
  {
    name: "Main Dashboard",
    layout: "/admin",
    path: "default",
    icon: <MdHome className="h-6 w-6" />,
    component: <MainDashboard />,
  },
  {
    name: "Regions Representatives",
    layout: "/admin",
    icon: <MdOutlinePeople className="h-6 w-6" />,
    path: 'representatives',
    component: <Representatives />,
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
    name: "Targets",
    layout: "/admin",
    icon: <MdOutlineGpsFixed className="h-6 w-6" />,
    path: "targets",
    component: <Targets />,
  },
  {
    name: "View Targets",
    layout: "/admin",
    icon: <MdOutlineGpsFixed className="h-6 w-6" />,
    path: "view_targets/:objectiveId/",
    component: <ViewTargets />
  },
  {
    name: "Indicators",
    layout: "/admin",
    icon: <MdOutlineFlag className="h-6 w-6" />,
    path: "indicators",
    component: <Indicators />,
  },
  {
    name: "View Indicators",
    layout: "/admin",
    icon: <MdOutlineFlag className="h-6 w-6" />,
    path: "view_indicators/:targetId/",
    component: <ViewIndicators />,
  },
  {
    name: "Regions Data",
    layout: "/admin",
    icon: <MdOutlineGpsFixed className="h-6 w-6" />,
    path: 'regions',
    component: <Regions />,
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
