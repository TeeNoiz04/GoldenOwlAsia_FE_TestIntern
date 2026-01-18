import { Award } from 'lucide-react';

const SubjectScores = ({ subjects, getColor, getBadge, getLabel }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border">
      <h3 className="text-xl font-bold mb-4 flex gap-2">
        <Award className="text-orange-500" /> Subject Scores
      </h3>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Object.entries(subjects).map(([key, score]) => (
          <div key={key} className="border rounded-xl p-4">
            <div className="flex justify-between mb-2">
              <span className="font-semibold text-sm">
                {key}
              </span>
              <span className={`text-xs px-2 py-1 rounded ${getBadge(score)}`}>
                {getLabel(score)}
              </span>
            </div>
            <p className={`text-3xl font-bold ${getColor(score)}`}>
              {score || score === 0 ? score.toFixed(1) : '—'}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubjectScores;
