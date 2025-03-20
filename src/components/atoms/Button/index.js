const Button = ({
  text,
  onClick,
  className = "",
  type = "button",
  disabled = false,
}) => (
  <button
    type={type}
    onClick={onClick}
    disabled={disabled}
    className={`px-4 py-2 rounded ${className} ${
      disabled ? "opacity-50 cursor-not-allowed" : ""
    }`}
  >
    {text}
  </button>
);

export default Button;
