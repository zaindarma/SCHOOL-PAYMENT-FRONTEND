const InputField = ({
  label,
  placeholder,
  type = "text",
  name,
  value,
  onChange,
  required = false,
  readOnly = false,
}) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      placeholder={placeholder}
      className="w-full p-2 border rounded dark:bg-gray-800 dark:text-white"
      readOnly={readOnly}
    />
  </div>
);

export default InputField;
