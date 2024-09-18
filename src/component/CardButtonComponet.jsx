import { useState } from "react";
import github from "../img/Vector.svg";
import arrow from "../img/foword-arrow2.svg";
import { toast } from "react-toastify";

const CardButtonComponet = ({
  name = "GitHub",
  image = github,
  bg = "bg-[#1A1A1A]",
  space = "w-full",
  url,
}) => {
  const [copy, setCopy] = useState(false);

  const handleCopy = () => {
    if (typeof url === "string")
      navigator.clipboard
        .writeText(url)
        .then(() => {
          setCopy(true); // Set copy to true when the link is copied
          setTimeout(() => setCopy(false), 2000); // Reset after 2 seconds
          toast.success("The link has been copied to your clipboard!", {
            position: "bottom-center",
            autoClose: 3000,
          });
        })
        .catch((err) => {
          console.error("Failed to copy the link", err);
          toast.error("Error in copy in the link", {
            position: "bottom-center",
            autoClose: 3000,
          });
        });
  };

  return (
    <div className="w-full">
      <button
        onClick={handleCopy} // Attach the copy functionality
        className={`flex justify-between items-center px-2 py-[6px] ${bg} ${space} rounded-lg`}
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
