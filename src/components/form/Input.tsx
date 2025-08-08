interface InputFieldPropsType
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
  name: string;
  type: string;
  error?: string;
}

const InputField: React.FC<InputFieldPropsType> = ({
  label,
  id,
  name,
  type,
  error,
  ...rest
}) => {
  return (
    <div className="mb-4">
      <label
        htmlFor={id}
        className="block text-gray-700 text-sm font-bold mb-2"
      >
        {label}:
      </label>
      <input
        id={id}
        name={name}
        type={type}
        className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
          error ? "border-red-500" : ""
        }`}
        {...rest}
      />
      {error && <p className="text-red-500 text-xs italic mt-1">{error}</p>}
    </div>
  );
};

export default InputField;
