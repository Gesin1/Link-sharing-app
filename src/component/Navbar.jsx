import mobLogo from "../img/mob-logo.svg";
import link from "../img/links-icon.svg";
import profile from "../img/profile-icon.svg";
import eye from "../img/eye-icon.svg";
import webLogo from "../img/web-logo.svg";
import { Link } from "react-router-dom";

const Navbar = ({
  image = link,
  src = profile,
  className = "bg-[#EFEBFF] py-[11px] flex flex-row justify-center items-center px-[27px] rounded-lg",
  classNameTwo = "py-[11px] flex flex-row justify-center items-center px-[27px]",
  textLink = "hidden md:block text-[#633CFF] font-semibold text-[16px]",
  textProfile = "hidden md:block font-semibold text-[16px] ",
}) => {
  return (
    <nav className="bg-white flex flex-row justify-between items-center p-4 md:m-4 md:rounded-xl">
      <img src={mobLogo} alt="devlinks" className="block md:hidden" />
      <img src={webLogo} alt="devlinks" className="hidden md:block" />

      <div className="flex flex-row justify-center items-center">
        <div>
          <Link to={"/linkPage"} className={`${className}`}>
            <img src={image} alt="link" className="mr-2" />
            <span className={`${textLink}`}>Link</span>
          </Link>
        </div>
        <Link to={"/profilePage"} className={`${classNameTwo}`}>
          <img
            src={src}
            alt="profile details"
            className="mr-2 hover:text-[#633CFF]"
          />
          <span className={`${textProfile}`}>Profile Details</span>
        </Link>
      </div>
      <Link className="border border-[#633CFF] py-[11px] flex flex-row justify-center items-center px-[16px] rounded-lg hover:bg-[#EFEBFF]">
        <img src={eye} alt="Preview" className="block md:hidden" />
        <span className="hidden md:block text-[#633CFF] font-semibold text-[16px] ">
          Preview
        </span>
      </Link>
    </nav>
  );
};

export default Navbar;
