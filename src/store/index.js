import { createStore } from "vuex";
import api from "@/utils/api";
import jwt_decode from "jwt-decode";
// const baseURL =
//   process.env.VUE_APP_BASE_URL || "https://server-edumanage.onrender.com";
export default createStore({
  state: {
    notifications: [], // ✅ Add this line
    attendanceRecords: [],
    attendanceTotal: 0,
    currentUserDetails: null,
    teachers: [],

    teacherPagination: {
      totalPages: 0,
      totalResults: 0,
      currentPage: 1,
    },

    students: [],
    schools: [],
    upcomingEvents: [],
    userRole: null,
    userName: null,
    userId: null,
    schoolId: null,
    userPhoto: null,

    attendanceHistory: [],
    todaysAttendancePercentage: null,
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
    currentUserDetails: (state) => state.currentUserDetails,
    getTotalTeachers: (state) => state.teacherPagination.totalResults,
    getTeacherPagination: (state) => state.teacherPagination,
    getAllTeachers: (state) => state.teachers || [],

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
    getSchools: (state) => state.schools,
  },

  mutations: {
    SET_ATTENDANCE_DATA(state, payload) {
      state.attendanceRecords = payload.records;
      state.attendanceTotal = payload.total;
      state.attendancePagination.page = payload.page;
      state.attendancePagination.limit = payload.limit;
    },
    SET_ATTENDANCE_NOTIFICATIONS(state, notifications) {
      state.notifications = notifications;
    },
    SET_CURRENT_USER_DETAILS(state, user) {
      state.currentUserDetails = user;
    },
    SET_TEACHER_PAGINATION(state, pagination) {
      state.teacherPagination = pagination;
    },
    SET_TEACHERS(state, teachers) {
      state.teachers = teachers;
    },
    SET_SCHOOLS(state, schools) {
      state.schools = schools;
    },
    SET_SCHOOL_ID(state, schoolId) {
      state.schoolId = schoolId; // ✅ Add this
    },
    SET_TODAYS_ATTENDANCE_PERCENTAGE(state, payload) {
      state.todaysAttendancePercentage = payload;
    },
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
    async fetchAttendanceForToday(
      { commit },
      { page = 1, limit = 10, name = "", date = "" }
    ) {
      try {
        const res = await api.get("/api/attendance/teacher/today", {
          params: { page, limit, name, date },
        });

        commit("SET_ATTENDANCE_DATA", res.data);
      } catch (err) {
        console.error("❌ Failed to fetch today's attendance:", err);
      }
    },

    async fetchAttendanceNotifications({ commit }) {
      const res = await api.get("/api/attendance/teacher/notifications");
      const notifications = res.data.notifications;
      commit("SET_ATTENDANCE_NOTIFICATIONS", notifications);
      return notifications;
    },

    async updateCurrentUserProfile({ commit }, payload) {
      try {
        let res;
        if (payload instanceof FormData) {
          res = await api.put("/api/users/update-profile", payload, {
            headers: { "Content-Type": "multipart/form-data" },
          });
        } else {
          res = await api.put("/api/users/update-profile", payload);
        }

        if (res.data?.photo) {
          commit("SET_USER_PHOTO", res.data.photo);
          commit("SET_CURRENT_USER_DETAILS", {
            ...this.state.currentUserDetails,
            photo: res.data.photo,
          });
        }

        console.log("✅ Profile updated:", res.data);
        return res.data;
      } catch (err) {
        console.error(
          "❌ Failed to update profile:",
          err.response?.data || err.message
        );
        throw err;
      }
    },
    async fetchCurrentUser({ commit }) {
      try {
        const res = await api.get("/api/users/me");
        commit("SET_CURRENT_USER_DETAILS", res.data.user || res.data);
      } catch (error) {
        console.error("❌ Failed to fetch current user:", error);
      }
    },
    async editTeacherById(_, { teacherId, updates }) {
      try {
        const res = await api.put(`/api/teachers/${teacherId}`, updates);

        return res.data;
      } catch (err) {
        console.error(
          "❌ Failed to update teacher:",
          err.response?.data || err.message
        );
        throw err;
      }
    },
    async fetchTeachers({ commit }, { page = 1, limit = 10, search = "" }) {
      try {
        const res = await api.get("/api/teachers", {
          params: { page, limit, search },
        });

        const { data, totalPages, total, page: currentPage } = res.data;
        const pagination = {
          totalPages,
          totalResults: total,
          currentPage,
        };

        commit("SET_TEACHERS", data);
        commit("SET_TEACHER_PAGINATION", pagination);
      } catch (err) {
        console.error(
          "❌ Failed to fetch teachers:",
          err.response?.data || err.message
        );
        commit("SET_TEACHERS", []);
        commit("SET_TEACHER_PAGINATION", {
          totalPages: 0,
          totalResults: 0,
          currentPage: 1,
        });
      }
    },
    async addTeacher(_, formData) {
      try {
        const res = await api.post("/api/auth/register", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        console.log("✅ Teacher registered successfully:", res.data);
        return res.data;
      } catch (err) {
        console.error(
          "❌ Failed to register teacher:",
          err.response?.data || err.message
        );
        throw err;
      }
    },
    async createSchool({ dispatch }, schoolData) {
      try {
        const res = await api.post("/api/schools", schoolData);

        // Save new token if sent (optional)
        if (res.data.token) {
          localStorage.setItem("token", res.data.token);
          dispatch("initializeUserRole"); // update Vuex from token
        }

        // Immediately fetch updated school
        await dispatch("fetchMySchool");

        return res.data.school;
      } catch (err) {
        console.error(
          "❌ Failed to create school:",
          err.response?.data || err.message
        );
        throw err;
      }
    },
    async fetchMySchool({ commit }) {
      try {
        const res = await api.get("/api/schools"); // current user’s school
        if (res.data.school) {
          commit("SET_SCHOOLS", [res.data.school]); // store as array
        } else {
          commit("SET_SCHOOLS", []);
        }
      } catch (err) {
        console.error("❌ Failed to fetch school:", err);
        commit("SET_SCHOOLS", []);
      }
    },
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
        const res = await api.get("/api/students", {
          params: {
            page: 1,
            limit: 1, // ✅ Just to get pagination.total
          },
        });

        const total = res.data.pagination?.total || 0;
        commit("SET_TOTAL_STUDENT_COUNT", total);
      } catch (err) {
        console.error("❌ Failed to fetch total student count:", err);
        commit("SET_TOTAL_STUDENT_COUNT", 0); // optional: reset on error
      }
    },

    async fetchUserById({ state, commit }, userId) {
      // ✅ Return from cache if available
      if (state.userCache[userId]) {
        commit("SET_CURRENT_USER", state.userCache[userId]);
        return state.userCache[userId];
      }

      try {
        const res = await api.get(`/api/users/${userId}`); // 👈 token auto-attached
        const user = res.data;

        // ✅ Cache and set current user
        commit("SET_USER_CACHE", { userId, user });
        commit("SET_CURRENT_USER", user);
        return user;
      } catch (err) {
        console.error("❌ Failed to fetch user:", err);
        return null;
      }
    },

    async fetchStudents({ commit }, filters = {}) {
      try {
        const {
          search = "",
          page = 1,
          limit = 20,
          sort = "desc",
          class: classFilter = "",
        } = filters;
        const res = await api.get("/api/students", {
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
        console.error("❌ Failed to fetch students:", err);
        commit("SET_STUDENTS", []); // Optional: reset students on error
      }
    },

    initializeUserRole({ commit }) {
      const token = localStorage.getItem("token");

      if (!token) {
        commit("SET_USER_ROLE", null);
        commit("SET_USER_NAME", null);
        commit("SET_USER_ID", null);
        commit("SET_USER_PHOTO", null); // ✅ reset photo
        commit("SET_SCHOOL_ID", null); // ✅ reset schoolId
        return;
      }

      try {
        const decoded = jwt_decode(token);
        const { role, name, userId, photo, schoolId } = decoded;

        commit("SET_USER_ROLE", role || null);
        commit("SET_USER_NAME", name || null);
        commit("SET_USER_ID", userId || null);
        commit("SET_USER_PHOTO", photo || null); // ✅ store photo
        commit("SET_SCHOOL_ID", schoolId || null); // ✅ commit schoolId
      } catch (error) {
        console.error("Failed to decode token:", error);
        commit("SET_USER_ROLE", null);
        commit("SET_USER_NAME", null);
        commit("SET_USER_ID", null);
        commit("SET_USER_PHOTO", null); // ✅ reset on failure
        commit("SET_SCHOOL_ID", null); // ✅ reset on failure
      }
    },

    async addStudent(_, studentData) {
      try {
        const res = await api.post("/api/auth/register", studentData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        console.log("✅ Student registered successfully:", res.data);
        return res.data;
      } catch (err) {
        console.error(
          "❌ Failed to register student:",
          err.response?.data || err.message
        );
        throw err;
      }
    },

    async markAttendance(
      _,
      { studentId, status, subject = "", notes = "", attendanceByNFC = false }
    ) {
      try {
        const res = await api.post("/api/attendance/manual", {
          studentId,
          status,
          subject,
          notes,
          attendanceByNFC,
        });

        // console.log("✅ Attendance marked:", res.data);
        return res.data;
      } catch (err) {
        console.error(
          "❌ Failed to mark attendance:",
          err.response?.data || err.message
        );
        throw err;
      }
    },
    // ✅ Fetch Attendance History and attach names
    async fetchAttendanceHistory({ commit, dispatch }, filters = {}) {
      try {
        const {
          studentId = "",
          startDate = "",
          endDate = "",
          page = 1,
          limit = 20,
          self = false,
          search = "",
          class: classFilter = "",
        } = filters;

        const res = await api.get("/api/attendance/history", {
          params: {
            studentId,
            startDate,
            endDate,
            page,
            limit,
            self: self ? "true" : "false",
            search,
            class: classFilter,
          },
        });

        const attendance = res.data.attendance || [];
        const pagination = res.data.pagination || {};

        // 🔄 Enrich attendance with user names
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
        console.error("❌ Failed to fetch attendance history:", err);
        commit("SET_ATTENDANCE_HISTORY", []); // Optional fallback
      }
    },

    // ✅ Fetch Attendance Stats
    async fetchAttendanceStats(
      { commit },
      { classFilter = null, date = null } = {}
    ) {
      try {
        const params = {};

        if (classFilter !== null) params.class = classFilter;

        if (date) {
          // Ensure date format is YYYY-MM-DD
          const formattedDate = new Date(date).toISOString().split("T")[0];
          params.date = formattedDate;
        }

        const res = await api.get("/api/attendance/stats", { params });

        commit("SET_ATTENDANCE_STATS", res.data || {});
      } catch (err) {
        console.error("❌ Failed to fetch attendance stats:", err);
        commit("SET_ATTENDANCE_STATS", {}); // Optional: reset stats on error
      }
    },

    async fetchTodaysAttendancePercentage({ commit }) {
      try {
        const res = await api.get("/api/attendance/percentage/today");

        commit("SET_TODAYS_ATTENDANCE_PERCENTAGE", res.data);
      } catch (error) {
        console.error(
          "❌ Failed to fetch today's attendance percentage:",
          error
        );
        commit("SET_TODAYS_ATTENDANCE_PERCENTAGE", null); // Optional reset
      }
    },

    async editUserById(_, { userId, updates }) {
      try {
        const res = await api.put(`/api/users/${userId}`, updates);

        console.log("✅ User updated successfully:", res.data);
        return res.data; // Returns updated user
      } catch (err) {
        console.error(
          "❌ Failed to update user:",
          err.response?.data || err.message
        );
        throw err;
      }
    },

    async deleteUserById(_, userId) {
      try {
        const res = await api.delete(`/api/users/${userId}`);

        console.log("✅ User deleted successfully:", res.data);
        return res.data; // Contains { message, user }
      } catch (err) {
        console.error(
          "❌ Failed to delete user:",
          err.response?.data || err.message
        );
        throw err;
      }
    },

    async promoteStudentsByIds(_, studentIds) {
      try {
        const res = await api.post("/api/users/promote", { studentIds });

        console.log("✅ Students promoted successfully:", res.data);
        return res.data;
      } catch (err) {
        console.error(
          "❌ Failed to promote students:",
          err.response?.data || err.message
        );
        throw err;
      }
    },
  },
});
