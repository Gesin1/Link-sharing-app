import { Link } from "react-router-dom";
import CardButtonComponet from "../component/CardButtonComponet";
const PreviewPage = () => {
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
      <main className="flex flex-col items-center justify-center gap-12 px-20 md:px-16 mt-20 md:absolute md:top-[290px] md:left-1/2 md:transform md:-translate-x-1/2 md:-translate-y-1/2 md:bg-white rounded-[24px] md:py-10">
        <div className="flex flex-col items-center justify-center">
          <img
            src=""
            alt=""
            className="w-[104px] h-[104px] rounded-[50%] border-2 border-[#633CFF] mb-4"
          />
          <div className="flex flex-col items-center justify-center gap-1">
            <h2 className="font-bold text-[32px] text-[#333333]">Ben Wright</h2>
            <p className="text-[#737373] text-[16px] font-normal">
              ben@example.com
            </p>
          </div>
        </div>
        <div className="w-64 flex flex-col gap-2">
          <CardButtonComponet />
        </div>
      </main>
    </div>
  );
};

export default PreviewPage;
