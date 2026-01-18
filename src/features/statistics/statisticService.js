import {
  getSubjectStatisticsBar,
  getSubjectStatisticsLine,
  getStudentSummary,
} from '../../api/statisticApi';

export const statisticService = {
  // Lấy thống kê môn học (line chart)
  async getSubjectStatisticsLine() {
    try {
      return await getSubjectStatisticsLine();
    } catch (error) {
      console.error('Error fetching subject statistics (line):', error);
      return this.getMockDataLine();
    }
  },

  // Lấy thống kê môn học (bar chart)
  async getSubjectStatisticsBar() {
    try {
      return await getSubjectStatisticsBar();
    } catch (error) {
      console.error('Error fetching subject statistics (bar):', error);
      return this.getMockDataBarChart();
    }
  },

  // Lấy thống kê tổng hợp học sinh
  async getStudentSummary() {
    try {
      return await getStudentSummary();
    } catch (error) {
      console.error('Error fetching student summary:', error);
      return {
        totalStudents: 1000000,
        percentScienceNoLowScore: 82,
        percentSocialNoLowScore: 76,
      };
    }
  },

  transformToChartData(apiData) {
    const { labels, datasets } = apiData;

    const chartData = labels.map((label, index) => {
      const item = { subject: label };

      datasets.forEach((ds) => {
        item[ds.label] = ds.data[index];
      });

      return item;
    });

    return {
      chartData,
      datasetLabels: datasets.map((ds) => ds.label),
    };
  },

  // fallback khi API lỗi
  getMockDataLine() {
    return {
      labels: [
        "Math",
        "Physics",
        "Chemistry",
        "Biology",
        "History",
        "Geography",
        "Civic Education",
        "Literature",
        "Foreign Language",
      ],
      datasets: [
        {
          label: "Excellent",
          data: [
            198392, 94146, 93333, 34438, 138533, 218515, 384222, 377879, 133483,
          ],
        },
        {
          label: "Good",
          data: [
            505836, 148641, 144959, 182049, 342577, 382087, 181440, 513116,
            219652,
          ],
        },
        {
          label: "Average",
          data: [
            258654, 79272, 88447, 116263, 200392, 96226, 16886, 141056, 363532,
          ],
        },
        {
          label: "Poor",
          data: [82731, 23556, 19779, 9628, 24712, 7854, 1061, 18050, 196038],
        },
      ],
    };
  },

  getMockDataBarChart() {
    return [
      {
        subject: "Math",
        excellent: 198392,
        good: 505836,
        average: 258654,
        poor: 82731,
      },
      {
        subject: "Literature",
        excellent: 377879,
        good: 513116,
        average: 141056,
        poor: 18050,
      },
      {
        subject: "Foreign Language",
        excellent: 133483,
        good: 219652,
        average: 363532,
        poor: 196038,
      },
      {
        subject: "Physics",
        excellent: 94146,
        good: 148641,
        average: 79272,
        poor: 23556,
      },
      {
        subject: "Chemistry",
        excellent: 93333,
        good: 144959,
        average: 88447,
        poor: 19779,
      },
      {
        subject: "Biology",
        excellent: 34438,
        good: 182049,
        average: 116263,
        poor: 9628,
      },
      {
        subject: "History",
        excellent: 138533,
        good: 342577,
        average: 200392,
        poor: 24712,
      },
      {
        subject: "Geography",
        excellent: 218515,
        good: 382087,
        average: 96226,
        poor: 7854,
      },
      {
        subject: "Civic Education",
        excellent: 384222,
        good: 181440,
        average: 16886,
        poor: 1061,
      },
    ];
  },
};
