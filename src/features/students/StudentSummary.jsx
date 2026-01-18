import { useEffect, useState } from 'react';
import { statisticService } from '@/features/statistics/statisticService';
import StatCard from '@/components/cards/StatCard';

const StudentSummary = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        setLoading(true);
        const response = await statisticService.getStudentSummary();
        const summaryData = response?.data || response;
        setData(summaryData);
      } catch (err) {
        console.error('Error fetching summary:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSummary();
  }, []);

  if (loading) return <div className="text-center py-4">Loading...</div>;
  if (error) return <div className="text-center py-4 text-red-500">{error}</div>;
  if (!data) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <StatCard
        title="Total Students"
        value={data.totalStudents?.toLocaleString() || 0}
        color="orange"
      />

      <StatCard
        title="Science - No Low Score"
        value={`${data.percentScienceNoLowScore || 0}%`}
        color="blue"
      />

      <StatCard
        title="Social - No Low Score"
        value={`${data.percentSocialNoLowScore || 0}%`}
        color="green"
      />
    </div>
  );
};

export default StudentSummary;
