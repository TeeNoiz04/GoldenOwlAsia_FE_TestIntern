import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { BarChart2, AlertCircle, Loader, RefreshCw } from "lucide-react";
import { statisticService } from '@/features/statistics/statisticService';

const COLORS = {
  excellent: "#f97316",
  good: "#3b82f6",
  average: "#10b981",
  poor: "#ef4444",
};

const SubjectStatisticsBarChart = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [chartData, setChartData] = useState([]);
  const [viewMode, setViewMode] = useState("stacked");

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await statisticService.getSubjectStatisticsBar();
      // Handle API response structure
      const barData = response?.data || response;
      const data = Array.isArray(barData) ? barData : statisticService.getMockDataBarChart();
      setChartData(data);
    } catch (err) {
      console.error('Error loading bar chart:', err);
      setError(err.message);
      setChartData(statisticService.getMockDataBarChart());
    } finally {
      setLoading(false);
    }
  };

  const totals = chartData.reduce(
    (acc, item) => {
      acc.excellent += item.excellent;
      acc.good += item.good;
      acc.average += item.average;
      acc.poor += item.poor;
      return acc;
    },
    { excellent: 0, good: 0, average: 0, poor: 0 },
  );

  const CustomTooltip = ({ active, payload, label }) => {
    if (!active || !payload?.length) return null;

    const total = payload.reduce((sum, i) => sum + i.value, 0);

    return (
      <div className="bg-white p-4 rounded-lg shadow border">
        <p className="font-semibold mb-2">{label}</p>
        {payload.map((item) => (
          <div key={item.name} className="flex justify-between text-sm">
            <span style={{ color: item.color }}>{item.name}</span>
            <strong>{item.value.toLocaleString()}</strong>
          </div>
        ))}
        <div className="border-t mt-2 pt-2 font-bold">
          Total: {total.toLocaleString()}
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="bg-white p-8 rounded-xl flex justify-center">
        <Loader className="animate-spin text-orange-500" size={40} />
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border">
      {/* Header */}
      <div className="flex justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="bg-orange-50 p-3 rounded-lg">
            <BarChart2 className="text-orange-500" />
          </div>
          <div>
            <h3 className="font-bold">Subject Performance Distribution</h3>
            <p className="text-sm text-gray-500">By performance level</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {error && (
            <span className="flex items-center gap-1 text-amber-600 bg-amber-50 px-2 py-1 rounded">
              <AlertCircle size={14} /> Demo data
            </span>
          )}

          <div className="bg-gray-100 p-1 rounded">
            {["stacked", "grouped"].map((mode) => (
              <button
                key={mode}
                onClick={() => setViewMode(mode)}
                className={`px-3 py-1 text-xs rounded ${
                  viewMode === mode ? "bg-white shadow text-orange-600" : ""
                }`}
              >
                {mode}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={450}>
        <BarChart data={chartData} margin={{ bottom: 70 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="subject" angle={-45} textAnchor="end" height={100} />
          <YAxis tickFormatter={(v) => `${v / 1000}k`} />
          <Tooltip content={<CustomTooltip />} />
          <Legend />

          {Object.keys(COLORS).map((key) => (
            <Bar
              key={key}
              dataKey={key}         
              fill={COLORS[key]}
              stackId={viewMode === "stacked" ? "stack" : undefined}
              name={key.charAt(0).toUpperCase() + key.slice(1)}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>

      {/* Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
        {Object.keys(totals).map((key) => (
          <div
            key={key}
            className="text-center p-4 rounded-lg"
            style={{ background: `${COLORS[key]}22` }}
          >
            <div className="text-xs font-medium">{key.toUpperCase()}</div>
            <div className="text-xl font-bold" style={{ color: COLORS[key] }}>
              {totals[key].toLocaleString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubjectStatisticsBarChart;
