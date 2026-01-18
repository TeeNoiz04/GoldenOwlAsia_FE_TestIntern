import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export default function EnrollmentLineChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Line dataKey="students" stroke="#f97316" strokeWidth={3} />
        <Line dataKey="newEnrollments" stroke="#60a5fa" strokeWidth={3} />
      </LineChart>
    </ResponsiveContainer>
  );
}
