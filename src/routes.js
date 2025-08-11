import React from "react";

import { Icon } from "@chakra-ui/react";
import {
  MdPerson,
  MdHome,
  MdOutlineShoppingCart,
  MdDescription,
  MdSchool,
  MdLeaderboard,

  MdLibraryBooks,
} from "react-icons/md";

// Admin Imports
import NFTMarketplace from "views/admin/marketplace";
import Profile from "views/admin/profile";
import ResumeGenerator from "views/admin/resumeGenerator";
import MyLearning from "views/admin/myLearning";
import Leaderboard from "views/admin/leaderboard";
import Home from "views/admin/home";

import CourseDetail from "views/admin/courses/CourseDetail";
import Courses from "views/admin/courses/Courses";
import WebWarrior from "views/admin/courses/WebWarrior";
import CourseEnroll from "views/admin/courses/CourseEnroll";
import CourseLearn from "views/admin/courses/CourseLearn";
import CourseRoadmap from "views/admin/courses/CourseRoadmap";
import PythonRoadmap from "views/admin/courses/PythonRoadmap";
import CourseImport from "views/admin/courses/CourseImport";


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
    name: "Courses",
    layout: "/admin",
    path: "/courses",
    icon: <Icon as={MdLibraryBooks} width="20px" height="20px" color="inherit" />,
    component: <Courses />,
  },
  {
    name: "Web Warrior",
    layout: "/admin",
    path: "/web-warrior",
    icon: <Icon as={MdLibraryBooks} width="20px" height="20px" color="inherit" />,
    component: <WebWarrior />,
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
    name: "Course Enroll",
    layout: "/admin",
    path: "/courses/:courseId/enroll",
    component: <CourseEnroll />,
    hidden: true,
  },
  {
    name: "Course Learn",
    layout: "/admin",
    path: "/courses/:courseId/learn",
    component: <CourseLearn />,
    hidden: true,
  },
  {
    name: "Course Roadmap",
    layout: "/admin",
    path: "/courses/:courseId/roadmap",
    component: <CourseRoadmap />,
    hidden: true,
  },
  {
    name: "Python Roadmap",
    layout: "/admin",
    path: "/courses/:courseId/roadmap",
    component: <PythonRoadmap />,
    hidden: false,
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
    name: "Leaderboard",
    layout: "/admin",
    path: "/leaderboard",
    icon: <Icon as={MdLeaderboard} width="20px" height="20px" color="inherit" />,
    component: <Leaderboard />,
  },
  {
    name: "Profile",
    layout: "/admin",
    path: "/profile",
    icon: <Icon as={MdPerson} width="20px" height="20px" color="inherit" />,
    component: <Profile />,
  },
  {
    path: "courses/import",
    element: <CourseImport />,
  },
];

export default routes;