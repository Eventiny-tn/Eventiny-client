import { createRouter, createWebHistory } from "vue-router";
import Home from "../components/Home.vue";
import Signup from "../components/Signup";
import LogIn from "../components/LogIn";
import Userprofile from "../components/Userprofile";
import GeneralPage from "../components/GeneralPage";
import EventDetails from "../components/EventDetails";
import PlannerRequest from "../components/PlannerRequest";
import PlannerDashboard from "../components/PlannerDashboard";
import UpgradeToPremium from "../components/UpgradeToPremium";
import EditEvent from "../components/EditEvent";
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
    path: "/plannerDemand",
    name: "plannerDemand",
    component: UpgradeToPremium,
  },
  {
    path: "/PlannerDashboard",
    name: "PlannerDashboard",
    component: PlannerDashboard,
  },
  {
    path: "/editevent",
    name: "EditEvent",
    component: EditEvent,
    meta: {
      authRequired: true,
    },
  },
];
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});
// router.beforeEach((to, from, next) => {
//   if (to.name === "Login" && localStorage.getItem("token")) {
//     next({ name: "Home" });
//   }
// });
export default router;
