import { createRouter, createWebHistory } from "vue-router"; // Use createWebHistory
import HomeView from "../views/HomeView.vue";
import AboutView from "../views/AboutView.vue";
import Login from "../views/Auth/LoginView.vue";
import Signup from "../views/Auth/SignupView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/about",
    name: "about",
    component: AboutView,
  },
  {
    path: "/login",
    name: "login",
    component: Login,
  },
  {
    path: "/signup",
    name: "signup",
    component: Signup,
  },
];

const router = createRouter({
  history: createWebHistory(), // Changed from createWebHashHistory
  routes,
});

export default router;
