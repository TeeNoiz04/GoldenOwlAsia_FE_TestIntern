import { User, TrendingUp, CheckCircle } from 'lucide-react';

const StudentInfoCard = ({ student }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border">
      <div className="flex items-center gap-4 mb-6">
        <div className="bg-orange-100 p-3 rounded-xl">
          <User className="text-orange-600" />
        </div>
        <div>
          <p className="text-sm text-gray-500">Registration Number</p>
          <p className="text-2xl font-bold font-mono">
            {student.registration_number}
          </p>
        </div>
      </div>

      <div className="bg-orange-50 rounded-xl p-6 border">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm text-gray-600">Total Score</p>
            <p className="text-4xl font-bold text-orange-600">
              {student.total_all_subjects?.toFixed(1)}
            </p>
          </div>
          <CheckCircle className="text-orange-500" size={40} />
        </div>
      </div>
    </div>
  );
};

export default StudentInfoCard;
