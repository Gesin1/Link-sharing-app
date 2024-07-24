import mobLogo from "../img/mob-logo.svg";
import link from "../img/links-icon.svg";
import profile from "../img/profile-icon.svg";
import eye from "../img/eye-icon.svg";
import webLogo from "../img/web-logo.svg";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-white flex flex-row justify-between items-center p-4 md:m-4 md:rounded-xl">
      <img src={mobLogo} alt="devlinks" className="block md:hidden" />
      <img src={webLogo} alt="devlinks" className="hidden md:block" />

      <div className="flex flex-row justify-center items-center">
        <div>
          <Link
            to={"/link"}
            className="bg-[#EFEBFF] py-[11px] flex flex-row justify-center items-center px-[27px] rounded-lg"
          >
            <img src={link} alt="link" className="mr-2" />
            <span className="hidden md:block text-[#633CFF] font-semibold text-[16px]">
              Link
            </span>
          </Link>
        </div>
        <Link className=" py-[11px] flex flex-row justify-center items-center px-[27px]">
          <img
            src={profile}
            alt="profile details"
            className="mr-2 hover:text-[#633CFF]"
          />
          <span className=" hidden md:block font-semibold text-[16px] hover:text-[#633CFF] ">
            Profile Details
          </span>
        </Link>
      </div>
      <Link className="border border-[#633CFF] py-[11px] flex flex-row justify-center items-center px-[16px] rounded-lg hover:bg-[#EFEBFF]">
        <img src={eye} alt="Preview" className="block mr-2 md:hidden" />
        <span className="hidden md:block text-[#633CFF] font-semibold text-[16px] ">
          Preview
        </span>
      </Link>
    </nav>
  );
};

export default Navbar;
