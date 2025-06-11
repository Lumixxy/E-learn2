import React from "react";

import { Icon } from "@chakra-ui/react";
import {
  MdPerson,
  MdHome,
  MdOutlineShoppingCart,
  MdDescription,
  MdSchool,
  MdLeaderboard,
  MdMap,
  MdSettings
} from "react-icons/md";

// Admin Imports
import NFTMarketplace from "views/admin/marketplace";
import Profile from "views/admin/profile";
import ResumeGenerator from "views/admin/resumeGenerator";
import MyLearning from "views/admin/myLearning";
import Leaderboard from "views/admin/leaderboard";
import Home from "views/admin/home";
import Roadmap from "views/admin/roadmap";
import Settings from "views/admin/settings";
import CourseDetail from "views/admin/courses/CourseDetail";


// Auth Imports

const routes = [
  {
    name: "Home",
    layout: "/admin",
    path: "/home",
    icon: <Icon as={MdHome} width="20px" height="20px" color="inherit" />,
    component: <Home />,
  },
  {
    name: "My Learning",
    layout: "/admin",
    path: "/my-learning",
    icon: <Icon as={MdSchool} width="20px" height="20px" color="inherit" />,
    component: <MyLearning />,
  },
  {
    name: "Course Detail",
    layout: "/admin",
    path: "/courses/:courseId",
    component: <CourseDetail />,
    hidden: true,
  },
  {
    name: "Roadmap",
    layout: "/admin",
    path: "/roadmap",
    icon: <Icon as={MdMap} width="20px" height="20px" color="inherit" />,
    component: <Roadmap />,
  },
  {
    name: "Marketplace",
    layout: "/admin",
    path: "/marketplace",
    icon: (
      <Icon
        as={MdOutlineShoppingCart}
        width="20px"
        height="20px"
        color="inherit"
      />
    ),
    component: <NFTMarketplace />,
    secondary: true,
  },
  {
    name: "Resume Generator",
    layout: "/admin",
    path: "/resume-generator",
    icon: <Icon as={MdDescription} width="20px" height="20px" color="inherit" />,
    component: <ResumeGenerator />,
  },
  {
    name: "Profile",
    layout: "/admin",
    path: "/profile",
    icon: <Icon as={MdPerson} width="20px" height="20px" color="inherit" />,
    component: <Profile />,
  },
  {
    name: "Leaderboard",
    layout: "/admin",
    path: "/leaderboard",
    icon: <Icon as={MdLeaderboard} width="20px" height="20px" color="inherit" />,
    component: <Leaderboard />,
  },
  
];

export default routes;