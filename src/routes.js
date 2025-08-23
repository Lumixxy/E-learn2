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
import AdventurePathPage from "views/admin/courses/AdventurePathPage";
import WebWarriorGrid from "views/admin/courses/WebWarriorGrid";
import WebWarriorCourseDetail from "views/admin/courses/WebWarriorCourseDetail";
import CourseAssessment from "views/admin/courses/CourseAssessment";
import FinalAssessment from "views/admin/courses/FinalAssessment";
import CourseEnroll from "views/admin/courses/CourseEnroll";
import CourseLearn from "views/admin/courses/CourseLearn";
import CourseRoadmap from "views/admin/courses/CourseRoadmap";
import PythonRoadmap from "views/admin/courses/PythonRoadmap";
import Certificate from "views/admin/courses/Certificate";
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
  // Temporarily hidden Adventure Path
  // {
  //   name: "Adventure Path",
  //   layout: "/admin",
  //   path: "/adventure-path",
  //   icon: <Icon as={MdLibraryBooks} width="20px" height="20px" color="inherit" />,
  //   component: <AdventurePathPage />,
  // },
  {
    name: "Adventure Course Detail",
    layout: "/admin",
    path: "/adventure-path/courses/:courseId",
    component: <WebWarriorCourseDetail />,
    hidden: true,
  },
  {
    name: "Adventure Course Assessment",
    layout: "/admin",
    path: "/adventure-path/courses/:courseId/assessment",
    component: <CourseAssessment />,
    hidden: true,
  },
  {
    name: "Final Assessment",
    layout: "/admin",
    path: "/final-assessment",
    component: <FinalAssessment />,
    hidden: true,
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
    component: <PythonRoadmap />,
    hidden: false,
  },
  {
    name: "Course Certificate",
    layout: "/admin",
    path: "/courses/:courseId/certificate",
    component: <Certificate />,
    hidden: true,
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