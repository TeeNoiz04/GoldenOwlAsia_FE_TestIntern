import axiosClient from './axiosClient';

/**
 * Check score by SBD (Số báo danh)
 * GET /students/{sbd}
 *
 * @param {string|number} sbd
 * @returns Promise
 */
export const checkScoreBySbd = (sbd) => {
  return axiosClient.get(`/students/${sbd}`);
};

/**
 * Get top 10 students by group (A, B, C...)
 * GET /students/top?group=A
 *
 * @param {string} group
 */
export const getTopStudentsByGroup = (group) => {
  return axiosClient.get('/students/top', {
    params: { group },
  });
};
