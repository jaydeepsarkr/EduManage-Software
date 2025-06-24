// store/index.js
import { createStore } from "vuex";
import axios from "axios";
import jwt_decode from "jwt-decode"; // ✅ default import for v3

export default createStore({
  state: {
    students: [],
    userRole: null,
    userName: null,
    userId: null,
  },

  getters: {
    allStudents: (state) => state.students,
    getUserRole: (state) => state.userRole,
    isTeacher: (state) => state.userRole === "teacher",
    isStudent: (state) => state.userRole === "student",
    getUserName: (state) => state.userName,
    getUserId: (state) => state.userId,
  },

  mutations: {
    SET_STUDENTS(state, students) {
      state.students = students;
    },
    SET_USER_ROLE(state, role) {
      state.userRole = role;
    },
    SET_USER_NAME(state, name) {
      state.userName = name;
    },
    SET_USER_ID(state, id) {
      state.userId = id;
    },
  },

  actions: {
    async fetchStudentsByRole({ commit }) {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get("http://localhost:5000/api/students", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            role: "student", // 👈 pass the filter to backend
          },
        });

        commit("SET_STUDENTS", res.data.students); // reuse existing mutation
      } catch (err) {
        console.error("Failed to fetch students by role:", err);
      }
    },

    async fetchStudents({ commit }, filters = {}) {
      try {
        const token = localStorage.getItem("token");
        const {
          search = "",
          page = 1,
          limit = 10,
          sort = "asc",
          class: classFilter = "",
        } = filters;

        const res = await axios.get("http://localhost:5000/api/students", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            search,
            page,
            limit,
            sort,
            class: classFilter,
          },
        });

        commit("SET_STUDENTS", res.data.students);
      } catch (err) {
        console.error("Failed to fetch students:", err);
      }
    },

    initializeUserRole({ commit }) {
      const token = localStorage.getItem("token");
      console.log(token);
      // First, check if the token exists
      if (!token) {
        commit("SET_USER_ROLE", null);
        commit("SET_USER_NAME", null);
        commit("SET_USER_ID", null);

        return;
      }

      // If token exists, try to decode it
      try {
        const decoded = jwt_decode(token); // ✅ call it directly

        // Optional: check if necessary fields exist in the decoded token
        const { role, name, userId } = decoded;
        commit("SET_USER_ROLE", role || null);
        commit("SET_USER_NAME", name || null);
        commit("SET_USER_ID", userId || null);
      } catch (error) {
        console.error("Failed to decode token:", error);
        commit("SET_USER_ROLE", null);
        commit("SET_USER_NAME", null);
        commit("SET_USER_ID", null);
      }
    },
    async addStudent(_, studentData) {
      try {
        // Add default role as student
        const payload = {
          ...studentData,
          role: "student",
        };

        const res = await axios.post(
          "http://localhost:5000/api/auth/register",
          payload
        );
        console.log("Student registered successfully:", res.data);
        return res.data;
      } catch (err) {
        console.error(
          "Failed to register student:",
          err.response?.data || err.message
        );
        throw err;
      }
    },
  },
});
