import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { TrendingUp, AlertCircle, Loader } from "lucide-react";
import { statisticService } from "@/features/statistics/statisticService";

const COLORS = {
  Excellent: "#f97316",
  Good: "#3b82f6",
  Average: "#10b981",
  Poor: "#ef4444",
};

export default function SubjectStatisticLineChart() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [chartData, setChartData] = useState([]);
  const [datasetLabels, setDatasetLabels] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(false);

      const response = await statisticService.getSubjectStatisticsLine();

      // Handle API response structure
      const lineData = response?.data || response;
      const apiData = Array.isArray(lineData)
        ? { labels: [], datasets: [] }
        : lineData;

      const result = statisticService.transformToChartData(apiData);

      setChartData(result.chartData);
      setDatasetLabels(result.datasetLabels);
    } catch (err) {
      console.error("Error loading line chart:", err);
      setError(true);
      const mock = statisticService.getMockDataLine();
      const result = statisticService.transformToChartData(mock);

      setChartData(result.chartData);
      setDatasetLabels(result.datasetLabels);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-12 text-center border">
        {" "}
        <div className="inline-block">
          {" "}
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>{" "}
        </div>{" "}
        <p className="text-gray-600 mt-4">Loading chart data...</p>{" "}
      </div>
    );
  }
 
  return (
    <div className="bg-white rounded-xl p-6 border shadow-sm">
      <div className="flex justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="bg-orange-50 p-3 rounded-lg">
            <TrendingUp className="text-orange-500" />
          </div>
          <div>
            <h3 className="font-bold text-lg">
              Subject Statistics by Performance Level
            </h3>
            <p className="text-sm text-gray-500">
              Distribution of student performance across subjects
            </p>
          </div>
        </div>

        {error && (
          <div className="flex items-center gap-2 text-amber-600 bg-amber-50 px-3 py-2 rounded">
            <AlertCircle size={16} />
            <span className="text-xs">Using demo data</span>
          </div>
        )}
      </div>

      <ResponsiveContainer width="100%" height={450}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="subject" angle={-45} textAnchor="end" height={100} />
          <YAxis tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
          <Tooltip />
          <Legend />

          {datasetLabels.map((label) => (
            <Line
              key={label}
              type="monotone"
              dataKey={label}
              stroke={COLORS[label]}
              strokeWidth={3}
              dot={{ r: 4 }}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
