// src/features/content-moderation/ContentModerationPage.jsx
import ModerationStats from './ModerationStats';
import ModerationCard from './ModerationCard';
import RecentLogsTable from './RecentLogsTable';
import AdminLayout from '../../layouts/AdminLayout';

const ContentModerationPage = () => {
  const posts = [
    {
      id: 1,
      title: "CSC 301 - Data Structures Past Questions (2020-2024).pdf",
      type: "Material",
      uploadedBy: "Sarah Johnson (300L)",
      timeAgo: "2 hours ago",
      message: "Hi admins, compiled these from the library. Please approve for the exam prep!",
      status: "pending",
    },
    {
      id: 2,
      title: "Selling HP Laptop (Cheap)",
      type: "Post",
      uploadedBy: "Mike T. (100L)",
      timeAgo: "4 hours ago",
      message: "DM me for cheap laptops. 50k only. Pay before delivery...",
      status: "flagged",
      flagReason: "Spam",
    },
    {
      id: 3,
      title: "Question about MTH 202 Exam",
      type: "Post",
      uploadedBy: "David O. (200L)",
      timeAgo: "5 hours ago",
      message: "Does anyone know if the exam will cover the last chapter on Vector Spaces? The lecturer wasn't clear...",
      status: "approved",
    },
  ];

  const logs = [
    {
      action: "Content removal: “Crypto Scam Link”",
      source: "Upload (Post #442)",
      moderator: "Auto-Mod Bot",
      date: "Oct 24, 10:30 AM",
      outcome: "Deleted",
      details: "View Snapshot",
    },
    {
      action: "User Suspension: “Mike T.”",
      reason: "Repeated Spamming (3rd strike)",
      moderator: "Admin User",
      date: "Oct 24, 09:15 AM",
      outcome: "Suspended (7 Days)",
      details: "Unban",
    },
    {
      action: "Bulk Approval",
      description: "Approved 5 study materials for 100L",
      moderator: "Raphael F. (Gen Sec)",
      date: "Oct 23, 04:45 PM",
      outcome: "Published",
      details: "View Items",
    },
    {
      action: "Flag Dismissed: “Event Photos”",
      description: "Marked as Safe (False Positive)",
      moderator: "Admin user",
      date: "Oct 23, 02:20 PM",
      outcome: "Restored",
      details: "Details",
    },
  ];

  return (
    <AdminLayout>
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Content Moderation</h1>
        <p className="text-gray-600">Review and manage user-generated content across the platform.</p>
      </div>

      <ModerationStats />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {posts.map(post => (
          <ModerationCard key={post.id} post={post} />
        ))}
      </div>

      <RecentLogsTable logs={logs} />
    </AdminLayout>
  );
};

export default ContentModerationPage;