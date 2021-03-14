import { createRouter, createWebHistory } from "vue-router";
import Home from "../components/Home.vue";
import Signup from "../components/Signup";
import LogIn from "../components/LogIn";

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
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;