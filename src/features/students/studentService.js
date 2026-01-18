import { getTopStudentsByGroup, checkScoreBySbd } from "../../api/studentApi";

export const studentService = {
  // Lấy top học sinh theo nhóm
  async getTopStudents(group) {
    try {
      console.log("Fetching top students for group:", group);
      return await getTopStudentsByGroup(group);
    } catch (error) {
      console.error(`Error fetching top students for group ${group}:`, error);
      throw error;
    }
  },

  // Kiểm tra điểm theo SBD
  async checkStudentScore(sbd) {
    try {
      return await checkScoreBySbd(sbd);
    } catch (error) {
     
      console.error(`Error fetching score for SBD ${sbd}:`, error);
      throw error;
    }
  },
};
