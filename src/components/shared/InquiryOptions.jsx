export default function InquiryOptions() {
  const options = [
    "General Inquiry",
    "Support",
    "Feedback",
    "Other",
  ];

  return (
    <div>
      <p className="text-sm font-medium mb-3 text-gray-700">
        Select Subject?
      </p>

      <div className="flex flex-wrap gap-6 text-sm">
        {options.map((option, index) => (
          <label
            key={option}
            className="flex items-center gap-2 cursor-pointer"
          >
          <input
  type="radio"
  name="subject"
  defaultChecked={index === 0}
  className="w-4 h-4 accent-black"
/>

            {option}
          </label>
        ))}
      </div>
    </div>
  );
}
