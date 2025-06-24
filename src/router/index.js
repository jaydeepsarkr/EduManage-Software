import { createRouter, createWebHistory } from "vue-router";

// Auth Views
import Login from "../views/Auth/LoginView.vue";
import Signup from "../views/Auth/SignupView.vue";

// Main Views
import HomeView from "../views/HomeView.vue";
import AboutView from "../views/AboutView.vue";
import UnderConstraction from "../views/UnderConstration.vue";
import Students from "../views/Students.vue";
import Attendance from "../views/Attendance.vue";
import MarkAttendance from "../views/NFC/MarkAttendance.vue";

const routes = [
  // Public Routes
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/signup",
    name: "Signup",
    component: Signup,
  },
  {
    path: "/working",
    name: "UnderConstraction",
    component: UnderConstraction,
  },

  // Protected Routes
  {
    path: "/",
    name: "Home",
    component: HomeView,
    meta: { requiresAuth: true },
  },
  {
    path: "/about",
    name: "About",
    component: AboutView,
    meta: { requiresAuth: true },
  },
  {
    path: "/students",
    name: "Students",
    component: Students,
    meta: { requiresAuth: true },
  },
  {
    path: "/attendance",
    name: "Attendance",
    component: Attendance,
    meta: { requiresAuth: true },
  },
  {
    path: "/mark-attendance/:studentId",
    name: "MarkAttendance",
    component: MarkAttendance,
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// ✅ Global Navigation Guard
router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem("token");

  if (to.meta.requiresAuth && !isAuthenticated) {
    next("/login");
  } else if (
    (to.path === "/login" || to.path === "/signup") &&
    isAuthenticated
  ) {
    next("/");
  } else {
    next();
  }
});

export default router;
