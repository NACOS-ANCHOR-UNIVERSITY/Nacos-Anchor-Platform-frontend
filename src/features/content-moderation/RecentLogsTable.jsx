// src/features/content-moderation/RecentLogsTable.jsx
import Card from '../../components/ui/Card';

const RecentLogsTable = ({ logs }) => {
  return (
    <Card className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h2 className="text-lg font-semibold text-gray-900">Recent Moderation Logs</h2>
        </div>
        <div className="flex space-x-2">
          <button className="px-3 py-1 text-xs font-medium text-gray-700 hover:bg-gray-100 rounded-md">
            Export Log
          </button>
          <button className="px-3 py-1 text-xs font-medium bg-nacos-green text-white rounded-md">
            View All
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ACTION TAKEN</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">MODERATOR</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">DATE/TIME</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">OUTCOME</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">DETAILS</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {logs.map((log, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-4 py-3 text-sm text-gray-900">
                  <div className="font-medium">{log.action}</div>
                  <div className="text-xs text-gray-500">{log.source || log.reason || log.description}</div>
                </td>
                <td className="px-4 py-3 text-sm text-gray-700">{log.moderator}</td>
                <td className="px-4 py-3 text-sm text-gray-700">{log.date}</td>
                <td className="px-4 py-3 text-sm">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    log.outcome.includes('Deleted') ? 'bg-red-100 text-red-800' :
                    log.outcome.includes('Suspended') ? 'bg-gray-100 text-gray-800' :
                    log.outcome.includes('Published') ? 'bg-green-100 text-green-800' :
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {log.outcome}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm text-nacos-green font-medium cursor-pointer hover:underline">
                  {log.details}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
};

export default RecentLogsTable;