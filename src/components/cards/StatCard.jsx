const colorMap = {
  orange: "bg-orange-50 border-orange-200",
  blue: "bg-blue-50 border-blue-200",
  green: "bg-green-50 border-green-200",
};

const StatCard = ({ title, value, color, icon: Icon }) => {
  return (
    <div className={`w-full rounded-xl p-6 border ${colorMap[color] ?? "bg-gray-50 border-gray-200"}`}>
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-sm text-gray-600">{title}</h3>
          <p className="text-3xl font-bold text-gray-800 mt-2">{value}</p>
        </div>
        {Icon && <Icon className="text-gray-400" size={24} />}
      </div>
    </div>
  );
};

export default StatCard;
