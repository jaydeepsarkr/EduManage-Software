import { createRouter, createWebHistory } from "vue-router";
import store from "@/store";

// Auth Views
import Login from "../views/Auth/LoginView.vue";
import Signup from "../views/Auth/SignupView.vue";

// Main Views
import HomeView from "../views/HomeView.vue";
import Students from "../views/Students.vue";
import Attendance from "../views/Attendance.vue";
import MarkAttendance from "../views/NFC/MarkAttendance.vue";
import HelpSupport from "../views/Help&Support.vue";
import createSchool from "../views/School/createSchool.vue";
import schoolDetails from "../views/School/schoolDtails.vue";
import Teacher from "../views/Teacher.vue";
import Profile from "../components/Profile.vue";

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

  // Protected Routes
  {
    path: "/",
    name: "Home",
    component: HomeView,
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
  {
    path: "/HelpSupport",
    name: "HelpSupport",
    component: HelpSupport,
    meta: { requiresAuth: true },
  },
  {
    path: "/createSchool",
    name: "createSchool",
    component: createSchool,
    meta: { requiresAuth: true },
  },
  {
    path: "/schoolDetails",
    name: "schoolDetails",
    component: schoolDetails,
    meta: { requiresAuth: true },
  },
  {
    path: "/teacher",
    name: "Teacher",
    component: Teacher,
    meta: { requiresAuth: true },
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
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
  const schoolId = store.state.schoolId;

  // 🔒 Not authenticated → redirect to login
  if (to.meta.requiresAuth && !isAuthenticated) {
    return next("/login");
  }

  // 🧭 Authenticated but trying to go to login/signup → redirect to home
  if ((to.path === "/login" || to.path === "/signup") && isAuthenticated) {
    return next("/");
  }

  // 🚫 Prevent access to /createSchool if schoolId already exists
  if (to.path === "/createSchool" && schoolId) {
    return next("/schoolDetails"); // or redirect to home or schoolDetails
  }

  next();
});

export default router;
