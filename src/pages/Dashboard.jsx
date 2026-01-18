
import DashboardStats from "@/features/statistics/StudentSummary";
import SubjectStatisticLineChart from "@/features/statistics/SubjectStatisticLineChart";
import SubjectStatisticsBarChart from "@/features/statistics/SubjectStatisticsBarChart";
import TopStudentsTable from "@/features/students/TopStudentsTable";
export default function Dashboard() {
  return (
    <div className="p-8 space-y-8 bg-white rounded-lg shadow">
      <DashboardStats />      
      <SubjectStatisticLineChart />
      <SubjectStatisticsBarChart />
      <TopStudentsTable />
    </div>
  );
}
