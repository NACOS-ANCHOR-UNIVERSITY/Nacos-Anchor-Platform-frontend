// src/components/ui/Badge.jsx
const Badge = ({ status, children }) => {
  const styles = {
    pending: "bg-yellow-100 text-yellow-800",
    approved: "bg-green-100 text-green-800",
    flagged: "bg-red-100 text-red-800",
  };

  return (
    <span className={`px-2 py-1 text-xs font-medium rounded-full ${styles[status] || styles.pending}`}>
      {children}
    </span>
  );
};

export default Badge;