export default function NavItem({ icon, label, active }) {
  return (
    <button className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${active ? "bg-green-600 text-white" : "text-gray-700 hover:bg-gray-100"}`}>
      <span className="text-lg">{icon}</span>
      <span>{label}</span>
    </button>
  )
}
