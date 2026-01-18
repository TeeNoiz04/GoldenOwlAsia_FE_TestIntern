import { Award } from 'lucide-react';

const GroupScores = ({ groups }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border">
      <h3 className="text-xl font-bold mb-4 flex gap-2">
        <Award className="text-orange-500" /> Group Scores
      </h3>

      <div className="space-y-3">
        {groups.map((g, i) => (
          <div key={i} className="p-4 bg-blue-50 rounded-xl border">
            <p className="font-bold">{g.group_name}</p>
            <p className="text-2xl font-bold text-blue-600">
              {g.total_score.toFixed(1)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GroupScores;
