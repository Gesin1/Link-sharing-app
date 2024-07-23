const ButtonComponent = ({
  text,
  bg = "bg-[#633CFF]",
  onClick,
  disabled,
  type,
}) => {
  return (
    <button
      className={`text-white font-semibold text-[16px] ${bg} w-full inline-flex items-center justify-center px-[27px] py-[11px] rounded-[8px] ${
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
