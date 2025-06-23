// store/index.js
import { createStore } from "vuex";
import axios from "axios";
import jwtDecode from "jwt-decode"; // Make sure this is installed

export default createStore({
  state: {
    students: [],
    userRole: null, // 👈 add this
  },

  getters: {
    allStudents: (state) => state.students,
    getUserRole: (state) => state.userRole, // 👈 add getter
    isTeacher: (state) => state.userRole === "teacher",
    isStudent: (state) => state.userRole === "student",
  },

  mutations: {
    SET_STUDENTS(state, students) {
      state.students = students;
    },
    SET_USER_ROLE(state, role) {
      state.userRole = role;
    },
  },

  actions: {
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
      if (token) {
        try {
          const decoded = jwtDecode(token);
          commit("SET_USER_ROLE", decoded.role); // 👈 assumes token has `role`
        } catch (error) {
          console.error("Failed to decode token:", error);
          commit("SET_USER_ROLE", null);
        }
      } else {
        commit("SET_USER_ROLE", null);
      }
    },
  },
});
