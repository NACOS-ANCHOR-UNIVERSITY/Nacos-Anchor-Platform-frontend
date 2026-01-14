// src/features/content-moderation/ModerationStats.jsx
import Card from '../../components/ui/Card';

const ModerationStats = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {/* Pending Review */}
      <Card className="p-6">
        <div className="text-sm font-medium text-gray-500">Pending Review</div>
        <div className="mt-2 text-2xl font-bold text-gray-900">14</div>
      </Card>

      {/* Flagged Content */}
      <Card className="p-6">
        <div className="text-sm font-medium text-gray-500">Flagged Content</div>
        <div className="mt-2 text-2xl font-bold text-red-600">03</div>
        <div className="mt-1 text-xs text-red-600">⚠️ Immediate Action Required</div>
      </Card>

      {/* Approved Today */}
      <Card className="p-6">
        <div className="text-sm font-medium text-gray-500">Approved Today</div>
        <div className="mt-2 text-2xl font-bold text-green-600">28</div>
        <div className="mt-1 text-xs text-green-600">All Clear</div>
      </Card>

      {/* Total Uploads */}
      <Card className="p-6">
        <div className="text-sm font-medium text-gray-500">Total Uploads</div>
        <div className="mt-2 text-2xl font-bold text-gray-900">1,024</div>
      </Card>
    </div>
  );
};

export default ModerationStats;