import { useEffect, useState } from 'react';
import StatCard from '@/components/cards/StatCard';
import { statisticService } from '@/features/statistics/statisticService';
import { Users, TrendingUp, BookOpen } from 'lucide-react';

export default function DashboardStats() {
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await statisticService.getStudentSummary();
        const summaryData = data?.data || data;

        setStats([
          {
            title: 'Total Students',
            value: summaryData.total_students?.toLocaleString() || 0,
            color: 'orange',
            icon: Users,
          },
          {
            title: 'Science - No Low Score',
            value: `${summaryData.science_group?.percent_no_subject_below_4 || 0}%`,
            color: 'blue',
            icon: TrendingUp,
          },
          {
            title: 'Social - No Low Score',
            value: `${summaryData.social_group?.percent_no_subject_below_4 || 0}%`,
            color: 'green',
            icon: BookOpen,
          },
        ]);
      } catch (err) {
        console.error('Error fetching stats:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  // Debug: này stats được updated
  useEffect(() => {
    if (stats.length > 0) {
      console.log('Stats updated:', stats);
    }
  }, [stats]);

  if (loading) return (
      <div className="bg-white rounded-2xl shadow-lg p-12 text-center border">
        {" "}
        <div className="inline-block">
          {" "}
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>{" "}
        </div>{" "}
        <p className="text-gray-600 mt-4">Loading data...</p>{" "}
      </div>
    );

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {stats.map(stat => (
        <StatCard key={stat.title} {...stat} />
      ))}
    </div>
  );
}
