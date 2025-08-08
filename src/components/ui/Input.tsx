type InputPropsType = {
  label?: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  required?: boolean;
  type?: "text" | "email" | "password";
  className?: string;
};

export default function Input({
  label,
  placeholder,
  value,
  onChange,
  error,
  required = false,
  type = "text",
  className = "",
}: InputPropsType) {
  return (
    <div className={`space-y-1 ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-200">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        className={`w-full min-w-2xs sm:min-w-sm px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
          error ? "border-red-300" : "border-gray-300"
        }`}
      />
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
}
