import { Link } from "react-router-dom";
import CardButtonComponet from "../component/CardButtonComponet";
import getUserProfile from "../hook/getUserProfile";
import useSaveLinks from "../hook/savelink";
import facebook from "../img/facebook.svg";
import linkedIn from "../img/linkedin.svg";
import github from "../img/Vector.svg";

const PreviewPage = () => {
  const { userData, Loading: loadingProfile } = getUserProfile();
  const { saveLinks, Loading: loadingData, error } = useSaveLinks();

  if (loadingData || loadingProfile) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error Loding: {error.message}</p>;
  }

  const getImageAndBg = (name) => {
    switch (name) {
      case "GitHub":
        return { image: github, bg: "bg-black" };
      case "LinkedIn":
        return { image: linkedIn, bg: "bg-blue-400" };
      case "Facebook":
        return { image: facebook, bg: "bg-blue-800" };
      default:
        return { image: github, bg: "bg-gray-300" };
    }
  };

  return (
    <div className="bg-white h-screen md:h-auto">
      <nav className=" md:bg-[#633CFF] md:p-4">
        <div className="flex justify-between items-center  px-4 md:py-6 py-8 bg-white rounded-lg">
          <Link to={"/profilePage"}>
            <span className="bg-white border border-[#633CFF] text-[#633CFF] font-bold text-[16px] px-[27px] py-[11px] rounded-lg ">
              Back to Editor
            </span>
          </Link>
          <Link to={"/profilePage"}>
            <span className="bg-[#633CFF] text-white font-bold text-[16px] px-[27px] py-[11px] rounded-lg">
              Back to Editor
            </span>
          </Link>
        </div>
      </nav>
      <div className="hidden md:block bg-[#633CFF] rounded-bl-[32px] rounded-br-[32px] h-52 md:relative"></div>
      <main className="flex flex-col items-center justify-center gap-12 px-20 md:px-16 md:mt-44 mt-20 md:absolute md:top-[290px] md:left-1/2 md:transform md:-translate-x-1/2 md:-translate-y-1/2 md:bg-white rounded-[24px] md:py-10 md:motion-reduce:first-line">
        <div className="flex flex-col items-center justify-center ">
          <img
            src={userData?.profilePicture}
            alt=""
            className="w-[104px] h-[104px] rounded-[50%] border-2 border-[#633CFF] mb-4"
          />
          <div className="flex flex-col items-center justify-center gap-1">
            <div className="flex flex-col md:flex-row justify-center items-center">
              <h2 className="font-bold text-[32px] text-[#333333] ">
                {userData?.firstName}
              </h2>
              <h2 className="font-bold text-[32px] text-[#333333] ">
                {userData?.lastName}{" "}
              </h2>
            </div>
            <p className="text-[#737373] text-[16px] font-normal">
              {userData?.email}
            </p>
          </div>
        </div>
        <div className="w-64 flex flex-col gap-3 md:max-h-[400px] max-h-[50px] md:overflow-y-auto">
          {saveLinks.map((link, index) => {
            const { image, bg } = getImageAndBg(link.name);
            return (
              <CardButtonComponet
                key={index}
                name={link.name}
                image={image}
                bg={bg}
                url={link.link}
              />
            );
          })}
        </div>
      </main>
    </div>
  );
};

export default PreviewPage;
