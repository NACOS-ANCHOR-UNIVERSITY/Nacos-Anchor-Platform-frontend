export default function InquiryOptions() {
  const options = ["General Inquiry", "Support", "Feedback", "Other"];

  return (
    <div>
      <p className="text-sm font-medium mb-3">Select Subject</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
        {options.map((item, index) => (
          <label key={index} className="flex items-center gap-3 cursor-pointer">
            <input
              type="radio"
              name="subject"
              className="accent-black"
              defaultChecked={index === 0}
            />
            {item}
          </label>
        ))}
      </div>
    </div>
  );
}
