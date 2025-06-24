// store/index.js
import { createStore } from "vuex";
import axios from "axios";
import jwt_decode from "jwt-decode";

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
      state.students = students; // ✅ each student now includes attendanceStatus and remarks
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

        // ✅ This now includes attendanceStatus and remarks per student
        commit("SET_STUDENTS", res.data.students);
      } catch (err) {
        console.error("Failed to fetch students:", err);
      }
    },

    initializeUserRole({ commit }) {
      const token = localStorage.getItem("token");

      if (!token) {
        commit("SET_USER_ROLE", null);
        commit("SET_USER_NAME", null);
        commit("SET_USER_ID", null);
        return;
      }

      try {
        const decoded = jwt_decode(token);
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

    async markAttendance(_, { studentId, status, subject = "", notes = "" }) {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("Token not found");

        const res = await axios.post(
          "http://localhost:5000/api/attendance/manual",
          {
            studentId,
            status,
            subject,
            notes: notes || "",
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log("Attendance marked successfully:", res.data);
        return res.data;
      } catch (err) {
        console.error(
          "Failed to mark attendance:",
          err.response?.data || err.message
        );
        throw err;
      }
    },
  },
});
