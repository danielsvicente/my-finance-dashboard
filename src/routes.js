import React from "react";

import { Icon } from "@chakra-ui/react";
import {
  MdFormatListBulletedAdd,
  MdOutlineDashboard
} from "react-icons/md";

// Admin Imports
import Default from "views/admin/default";
import Accounts from "views/admin/accounts";
import Dashboard from "views/admin/dashboard";

const routes = [
  {
    name: "Dashboard",
    layout: "/admin",
    path: "/dashboard",
    icon: <Icon as={MdOutlineDashboard} width='20px' height='20px' color='inherit' />,
    component: Dashboard,
  },
  {
    name: "Accounts",
    layout: "/admin",
    path: "/accounts",
    icon: <Icon as={MdFormatListBulletedAdd} width='20px' height='20px' color='inherit' />,
    component: Accounts,
  },
  {
    name: "Default",
    layout: "/admin",
    path: "/default",
    icon: <Icon as={MdOutlineDashboard} width='20px' height='20px' color='inherit' />,
    component: Default,
  }
];

export default routes;
