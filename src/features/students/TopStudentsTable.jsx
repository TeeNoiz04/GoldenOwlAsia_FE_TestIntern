import { useEffect, useState } from "react";
import { Loader } from "lucide-react";
import { studentService } from "@/features/students/studentService";

const TopStudentsTable = () => {
  const [group, setGroup] = useState("A01");
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const abortController = new AbortController();

    const fetchTopStudents = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await studentService.getTopStudents(group);
        
        // Check if request was cancelled
        if (abortController.signal.aborted) return;
        
        console.log('Response:', response);
        
        // Handle API response structure: { success, message, data: [...] }
        const studentsData = response?.data || response;
        setStudents(Array.isArray(studentsData) ? studentsData : []);
      } catch (err) {
        // Ignore abort errors
        if (err.name === 'AbortError') return;
        
        console.error('Error fetching students:', err);
        setError(err.message || 'Failed to fetch students');
        setStudents([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTopStudents();

    // Cleanup function to cancel request when component unmounts or group changes
    return () => abortController.abort();
  }, [group]);

  // Loading state
  if (loading) {
    return (
      <div className="bg-white rounded-xl border p-8 flex justify-center">
        <Loader className="animate-spin text-orange-500" size={40} />
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="bg-white rounded-xl border p-8 text-center">
        <p className="text-red-500 font-semibold">{error}</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border">
      <div className="flex justify-between p-4">
        <h3 className="font-bold">Top 10 Students</h3>

        <select
          value={group}
          onChange={(e) => setGroup(e.target.value)}
          className="border rounded px-3 py-1"
        >
          <option value="A01">A01</option>
          <option value="A00">A00</option>
          <option value="D01">D01</option>
          <option value="B00">B00</option>
          <option value="C00">C00</option>
          <option value="D07">D07</option>
        </select>
      </div>

      {students.length === 0 ? (
        <div className="p-8 text-center text-gray-500">
          No students found
        </div>
      ) : (
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50">
              <th className="text-left px-4 py-2">Rank</th>
              <th className="text-left px-4 py-2">Reg No</th>
              <th className="text-left px-4 py-2">Total</th>
            </tr>
          </thead>

          <tbody>
            {students.map((s, i) => (
              <tr key={s.registration_number} className="border-t hover:bg-gray-50">
                <td className="px-4 py-2">{i + 1}</td>
                <td className="px-4 py-2">{s.registration_number}</td>
                <td className="px-4 py-2">{s.total_score?.toFixed(2) || '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default TopStudentsTable;
