import axiosClient from './axiosClient';

/**
 * Lấy thống kê theo môn học (chart)
 * GET /statistics/subjects
 */
export const getSubjectStatistics = () => {
  return axiosClient.get('/statistics/subjects');
};

/**
 * Thống kê tổng hợp học sinh
 * GET /statistics/student-summary
 */
export const getStudentSummary = () => {
  return axiosClient.get('/statistics/student-summary');
};
