// src/features/content-moderation/ModerationCard.jsx
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';

const ModerationCard = ({ post }) => {
  // Determine icon based on type
  const getIcon = () => {
    if (post.type === "Material") {
      return (
        <img src="/icon-pdf.png" alt="PDF" className="h-5 w-5" />
      );
    } else if (post.status === 'flagged') {
      return (
        <img src="/icon-warning.png" alt="Warning" className="h-5 w-5" />
      );
    } else {
      return (
        <img src="/icon-chat.png" alt="Post" className="h-5 w-5" />
      );
    }
  };

  return (
    <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow mb-4">
      {/* Header */}
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center space-x-3">
          {getIcon()}
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="font-medium text-gray-900">{post.title}</h3>
              {post.status === 'flagged' && (
                <Badge status="flagged">Flagged: {post.flagReason || 'Spam'}</Badge>
              )}
            </div>
            <div className="text-xs text-gray-500 mt-1">{post.type}</div>
          </div>
        </div>
        <div className="flex space-x-2">
          <button className="p-1 text-gray-500 hover:text-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          </button>
          <button className="p-1 text-gray-500 hover:text-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      {/* Meta */}
      <div className="text-xs text-gray-500 mb-2">
        Uploaded by {post.uploadedBy} • {post.timeAgo}
      </div>

      {/* Message */}
      <p className="text-gray-700 text-sm mb-4">{post.message}</p>

      {/* Actions */}
      <div className="flex justify-end space-x-2">
        {post.status === 'flagged' ? (
          <>
            <Button variant="outline" size="sm" className="bg-red-50 text-red-700 border-red-300 hover:bg-red-100">
              Reject
            </Button>
            <Button variant="ghost" size="sm" className="text-gray-700">
              ✓
            </Button>
          </>
        ) : (
          <Button variant="default" size="sm" className="bg-green-50 text-green-700 border-green-300 hover:bg-green-100">
            Approve
          </Button>
        )}
      </div>
    </div>
  );
};

export default ModerationCard;