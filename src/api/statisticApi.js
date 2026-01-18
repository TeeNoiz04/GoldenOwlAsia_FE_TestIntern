import axiosClient from "./axiosClient";

/**
 * Lấy thống kê theo môn học (bar chart)
 * GET /statistics/subjects
 */
export const getSubjectStatisticsBar = () => {
  return axiosClient.get("/statistics/subject-statistics-bar");
};

/**
 * Lấy thống kê theo môn học (line chart)
 * GET /statistics/subjects
 */
export const getSubjectStatisticsLine = () => {
  return axiosClient.get("/statistics/subject-statistics-line");
};

/**
 * Thống kê tổng hợp học sinh
 * GET /statistics/student-summary
 */
export const getStudentSummary = () => {
  return axiosClient.get("/statistics/student-summary");
};
