const ButtonComponent = ({
  text,
  textColor = "text-white",
  bg = "bg-[#633CFF]",
  border = "border-none",
  spacing = "",
  onClick,
  disabled,
  type,
}) => {
  return (
    <button
      className={`${textColor} ${border} ${spacing} font-semibold text-[16px] ${bg} inline-flex items-center justify-center px-[27px] py-[11px] rounded-[8px] ${
        disabled ? "bg-[#633CFF] cursor-not-allowed opacity-50" : `${bg}`
      }`}
      onClick={onClick}
      disabled={disabled}
      type={type}
    >
      {text}
    </button>
  );
};

export default ButtonComponent;
