import { createRouter, createWebHistory } from "vue-router";
import Home from "../components/Home.vue";
import Signup from "../components/Signup";
import LogIn from "../components/LogIn";
import Userprofile from "../components/Userprofile";
import GeneralPage from "../components/GeneralPage";
import EventDetails from "../components/EventDetails";
import PlannerRequest from "../components/PlannerRequest";
import PlannerDashboard from "../components/PlannerDashboard";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },

  {
    path: "/Signup",
    name: "Signup",
    component: Signup,
  },

  {
    path: "/Login",
    name: "Login",
    component: LogIn,
  },

  {
    path: "/Profile",
    name: "Profile",
    component: Userprofile,
  },

  {
    path: "/GeneralPage",
    name: "GeneralPage",
    component: GeneralPage,
  },
  {
    path: "/EventDetails",
    name: "EventDetails",
    component: EventDetails,
  },
  {
    path: "/PlannerRequest",
    name: "PlannerRequest",
    component: PlannerRequest,
  },
  {
    path: "/PlannerDashboard",
    name: "PlannerDashboard",
    component: PlannerDashboard,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
