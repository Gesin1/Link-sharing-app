import github from "../img/Vector.svg";
import arrow from "../img/foword-arrow2.svg";

const CardButtonComponet = ({
  name = "GitHub",
  image = github,
  bg = "bg-[#1A1A1A]",
  space = "w-full",
}) => {
  return (
    <div className="w-full">
      <button
        className={`flex justify-between items-center px-2 py-3 ${bg} ${space}  rounded-lg`}
      >
        <div className="flex justify-center items-center gap-2">
          <img src={image} alt="icon" />
          <p className="text-[16px] text-white font-normal">{name}</p>
        </div>
        <img src={arrow} alt="arrow" />
      </button>
    </div>
  );
};

export default CardButtonComponet;
