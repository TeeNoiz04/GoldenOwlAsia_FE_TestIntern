import { Search, User, Loader, XCircle } from 'lucide-react';

const ScoreSearchBox = ({
  value,
  onChange,
  onSearch,
  onKeyPress,
  loading,
  error,
  showError
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border">
      <div className="flex gap-3">
        <div className="flex-1 relative">
          <input
            value={value}
            onChange={onChange}
            onKeyPress={onKeyPress}
            disabled={loading}
            placeholder="Enter registration number"
            className="w-full px-5 py-4 border rounded-xl"
          />
          <User className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
        </div>

        <button
          onClick={onSearch}
          disabled={loading}
          className="px-8 py-4 bg-orange-500 text-white rounded-xl"
        >
          {loading ? <Loader className="animate-spin" /> : <Search />}
        </button>
      </div>

      {showError && error && (
        <div className="mt-4 flex items-center gap-2 text-red-700 bg-red-50 p-3 rounded-lg">
          <XCircle size={20} />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
};

export default ScoreSearchBox;
