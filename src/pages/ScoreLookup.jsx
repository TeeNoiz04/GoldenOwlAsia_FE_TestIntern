import { useState } from "react";
import ScoreSearchBox from "@/features/students/ScoreSearchBox";
import StudentInfoCard from "@/features/students/StudentInfoCard";
import GroupScores from "@/features/students/GroupScores";
import SubjectScores from "@/features/students/SubjectScores";
import { studentService } from "@/features/students/studentService";

const ScoreLookup = () => {
  const [sbd, setSbd] = useState("");
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showError, setShowError] = useState(false);

  // Get color for score
  const getColor = (score) => {
    if (!score) return "text-gray-400";
    if (score >= 8) return "text-green-600";
    if (score >= 6.5) return "text-blue-600";
    if (score >= 5) return "text-orange-600";
    return "text-red-600";
  };

  // Get badge styling
  const getBadge = (score) => {
    if (!score) return "bg-gray-100 text-gray-600";
    if (score >= 8) return "bg-green-100 text-green-700";
    if (score >= 6.5) return "bg-blue-100 text-blue-700";
    if (score >= 5) return "bg-orange-100 text-orange-700";
    return "bg-red-100 text-red-700";
  };

  // Get label
  const getLabel = (score) => {
    if (!score) return "N/A";
    if (score >= 8) return "Excellent";
    if (score >= 6.5) return "Good";
    if (score >= 5) return "Average";
    return "Poor";
  };

  // Handle search
  const handleSearch = async () => {
    if (!sbd.trim()) {
      setError("Please enter registration number");
      setShowError(true);
      return;
    }
    setLoading(true);
    setError("");
    setShowError(false);

    try {
      const data = await studentService.checkStudentScore(sbd);
      console.log("Student score data:", data);

      // Handle API response structure
      const studentData = data?.data || data;

      if (studentData) {
        setStudent(studentData);
      } else {
        setError("No data received from server");
        setShowError(true);
        setStudent(null);
      }
    } catch (err) {
      console.error("Search error:", err);
      
      // Check error status and set appropriate message
      if (err.response?.status === 404) {
        setError("Student not found");
      } else if (err.response?.status === 422) {
        setError("Invalid input data");
      } else if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError(err.message || "System error. Please try again later.");
      }
      setShowError(true);
      setStudent(null);
    } finally {
      setLoading(false);
    }
  };

  // Handle key press
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-2">Score Lookup</h1>
      <p className="text-gray-600 mb-6">
        Enter student registration number to view scores
      </p>

      {/* Search Box */}
      <ScoreSearchBox
        value={sbd}
        onChange={(e) => setSbd(e.target.value)}
        onSearch={handleSearch}
        onKeyPress={handleKeyPress}
        loading={loading}
        error={error}
        showError={showError}
      />

      {/* Results */}
      {student && (
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Student Info */}
            <StudentInfoCard student={student} />

            {/* Subject Scores */}
            <SubjectScores
              subjects={student.subjects}
              getColor={getColor}
              getBadge={getBadge}
              getLabel={getLabel}
            />
          </div>

          {/* Right Column */}
          <div>
            {/* Group Scores */}
            <GroupScores groups={student.group_scores || []} />
          </div>
        </div>
      )}

      {/* Empty State */}
      {!student && !loading && (
        <div className="bg-white rounded-2xl shadow-lg p-12 text-center border">
          <div className="text-6xl mb-4">🔍</div>
          <h2 className="text-xl font-semibold mb-2">No Student Selected</h2>
          <p className="text-gray-600">
            Enter a registration number above to search for student scores
          </p>
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="bg-white rounded-2xl shadow-lg p-12 text-center border">
          <div className="inline-block">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
          </div>
          <p className="text-gray-600 mt-4">Searching for student...</p>
        </div>
      )}
    </div>
  );
};

export default ScoreLookup;
