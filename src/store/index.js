import { createStore } from "vuex";
import axios from "axios";
import jwt_decode from "jwt-decode";
const baseURL =
  process.env.VUE_APP_BASE_URL || "https://server-edumanage.onrender.com";
export default createStore({
  state: {
    students: [],
    upcomingEvents: [],
    userRole: null,
    userName: null,
    userId: null,
    userPhoto: null,

    attendanceHistory: [],
    attendanceStats: {
      daily: [],
      today: {
        present: 0,
        absent: 0,
        leave: 0,
        total: 0,
      },
    },

    userCache: {},
    currentUser: null,
    attendancePagination: {
      page: 1,
      limit: 20,
      total: 0,
      pages: 1,
    },
    studentPagination: {
      page: 1,
      limit: 20,
      total: 0,
      pages: 1,
    },
    studentTotalCount: 0,
  },

  getters: {
    getUpcomingEvents: (state) => state.upcomingEvents,
    allStudents: (state) => state.students,
    getUserRole: (state) => state.userRole,
    getUserPhoto: (state) => state.userPhoto,
    isTeacher: (state) => state.userRole === "teacher",
    isStudent: (state) => state.userRole === "student",
    getUserName: (state) => state.userName,
    getUserId: (state) => state.userId,
    getAttendanceHistory: (state) => state.attendanceHistory,
    getAttendanceStats: (state) => state.attendanceStats,
    getUserFromCache: (state) => (id) => state.userCache[id],
    getAttendancePagination: (state) => state.attendancePagination,
    getTotalAttendanceResults: (state) => state.attendancePagination.total,
    getStudentPagination: (state) => state.studentPagination,
    getTotalStudents: (state) => state.studentPagination.total,
    getTotalStudentCount: (state) => state.studentTotalCount,
  },

  mutations: {
    setUpcomingEvents(state, events) {
      state.upcomingEvents = events;
    },
    SET_ATTENDANCE_PAGINATION(state, pagination) {
      state.attendancePagination = pagination;
    },

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
    SET_USER_PHOTO(state, photo) {
      state.userPhoto = photo;
    },
    SET_ATTENDANCE_HISTORY(state, history) {
      state.attendanceHistory = history;
    },
    SET_ATTENDANCE_STATS(state, stats) {
      state.attendanceStats = stats;
    },
    // SET_USER_CACHE(state, { userId, user }) {
    //   state.userCache[userId] = user;
    // },
    SET_USER_CACHE(state, { userId, user }) {
      state.userCache = {
        ...state.userCache,
        [userId]: user,
      };
    },
    SET_CURRENT_USER(state, user) {
      state.currentUser = user;
    },
    SET_STUDENT_PAGINATION(state, pagination) {
      state.studentPagination = pagination;
    },
    SET_TOTAL_STUDENT_COUNT(state, total) {
      state.studentTotalCount = total;
    },
  },

  actions: {
    async fetchUpcomingEvents(
      { commit },
      { calendarId, apiKey, timeMin, timeMax }
    ) {
      const url = `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events?key=${apiKey}&timeMin=${timeMin}&timeMax=${timeMax}&singleEvents=true&orderBy=startTime`;
      try {
        const res = await fetch(url);
        const data = await res.json();
        commit("setUpcomingEvents", data.items || []);
      } catch (err) {
        console.error("Error fetching calendar events", err);
      }
    },

    async fetchTotalStudentCount({ commit }) {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(`${baseURL}/api/students`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            page: 1,
            limit: 1, // ✅ Only fetch 1 student to get total count
          },
        });

        const total = res.data.pagination?.total || 0;
        commit("SET_TOTAL_STUDENT_COUNT", total);
      } catch (err) {
        console.error("Failed to fetch total student count:", err);
      }
    },
    async fetchUserById({ state, commit }, userId) {
      // ✅ Return cached user if available
      if (state.userCache[userId]) {
        commit("SET_CURRENT_USER", state.userCache[userId]); // Optional: set current user
        return state.userCache[userId];
      }

      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`${baseURL}/api/users/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const user = res.data;

        // ✅ Store in cache and current user
        commit("SET_USER_CACHE", { userId, user });
        commit("SET_CURRENT_USER", user);
        return user;
      } catch (err) {
        console.error("Failed to fetch user:", err);
        return null;
      }
    },

    async fetchStudents({ commit }, filters = {}) {
      try {
        const token = localStorage.getItem("token");
        const {
          search = "",
          page = 1,
          limit = 10,
          sort = "desc",
          class: classFilter = "",
        } = filters;

        const res = await axios.get(`${baseURL}/api/students`, {
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
        if (res.data.pagination) {
          commit("SET_STUDENT_PAGINATION", res.data.pagination);
        }
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
        commit("SET_USER_PHOTO", null); // ✅ reset photo
        return;
      }

      try {
        const decoded = jwt_decode(token);
        const { role, name, userId, photo } = decoded;

        commit("SET_USER_ROLE", role || null);
        commit("SET_USER_NAME", name || null);
        commit("SET_USER_ID", userId || null);
        commit("SET_USER_PHOTO", photo || null); // ✅ store photo
      } catch (error) {
        console.error("Failed to decode token:", error);
        commit("SET_USER_ROLE", null);
        commit("SET_USER_NAME", null);
        commit("SET_USER_ID", null);
        commit("SET_USER_PHOTO", null); // ✅ reset on failure
      }
    },

    async addStudent(_, studentData) {
      try {
        const res = await axios.post(
          `${baseURL}/api/auth/register`,
          studentData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
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
          `${baseURL}/api/attendance/manual`,
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

        // console.log("Attendance marked successfully:", res.data);
        return res.data;
      } catch (err) {
        console.error(
          "Failed to mark attendance:",
          err.response?.data || err.message
        );
        throw err;
      }
    },

    // ✅ Fetch Attendance History and attach names
    async fetchAttendanceHistory({ commit, dispatch }, filters = {}) {
      try {
        const token = localStorage.getItem("token");

        const {
          studentId = "",
          startDate = "",
          endDate = "",
          page = 1,
          limit = 20,
          self = false,
          search = "", // ✅ Add search
          class: classFilter = "", // ✅ Add class filter
        } = filters;

        const res = await axios.get(`${baseURL}/api/attendance/history`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            studentId,
            startDate,
            endDate,
            page,
            limit,
            self: self ? "true" : "false",
            search, // ✅ Pass search query
            class: classFilter, // ✅ Pass class filter (as 'class')
          },
        });

        const attendance = res.data.attendance || [];
        const pagination = res.data.pagination || {};

        // 🔄 Enrich with user names
        const enriched = await Promise.all(
          attendance.map(async (entry) => {
            if (entry.studentId && typeof entry.studentId === "string") {
              const student = await dispatch("fetchUserById", entry.studentId);
              entry.studentName = student?.name || "Unknown";
            }
            if (entry.teacherId && typeof entry.teacherId === "string") {
              const teacher = await dispatch("fetchUserById", entry.teacherId);
              entry.teacherName = teacher?.name || "Unknown";
            }
            return entry;
          })
        );

        commit("SET_ATTENDANCE_HISTORY", enriched);
        commit("SET_ATTENDANCE_PAGINATION", pagination);
      } catch (err) {
        console.error("Failed to fetch attendance history:", err);
      }
    },
    // ✅ Fetch Attendance Stats
    async fetchAttendanceStats(
      { commit },
      { classFilter = null, date = null } = {}
    ) {
      try {
        const token = localStorage.getItem("token");

        // Build query string
        const params = new URLSearchParams();
        if (classFilter !== null) params.append("class", classFilter);
        if (date) params.append("date", date);

        const res = await axios.get(
          `${baseURL}/api/attendance/stats?${params.toString()}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        commit("SET_ATTENDANCE_STATS", res.data || {});
      } catch (err) {
        console.error("Failed to fetch attendance stats:", err);
      }
    },
    async editUserById(_, { userId, updates }) {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.put(`${baseURL}/api/users/${userId}`, updates, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log("User updated successfully:", res.data);
        return res.data; // returns updated user
      } catch (err) {
        console.error(
          "Failed to update user:",
          err.response?.data || err.message
        );
        throw err;
      }
    },

    async deleteUserById(_, userId) {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.delete(`${baseURL}/api/users/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log("User deleted successfully:", res.data);
        return res.data; // Contains { message, user }
      } catch (err) {
        console.error(
          "Failed to delete user:",
          err.response?.data || err.message
        );
        throw err;
      }
    },

    async promoteStudentsByIds(_, studentIds) {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.post(
          `${baseURL}/api/users/promote`,
          { studentIds }, // send array of IDs instead of class
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log("Students promoted successfully:", res.data);
        return res.data;
      } catch (err) {
        console.error(
          "Failed to promote students:",
          err.response?.data || err.message
        );
        throw err;
      }
    },
  },
});
