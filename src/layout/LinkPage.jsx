import { useState } from "react";
import Navbar from "../component/Navbar";
import illustration from "../img/illust-icon.svg";
import ButtonComponent from "../component/ButtonComponent";
import CardInput from "../component/CardInput";
import phone from "../img/phone-icon.svg";

const LinkPage = () => {
  const [showCard, setShowCard] = useState([]);
  const [inputs, setInputs] = useState([]);

  const handleClick = () => {
    setShowCard([...showCard, {}]);
    setInputs([...inputs, ""]);
  };

  const handleRemoveLink = (index) => {
    setShowCard(showCard.filter((_, i) => i !== index));
    setInputs(inputs.filter((_, i) => i !== index));
  };

  const handleInputWithButton = (index, value) => {
    const updateInputButton = [...inputs];
    updateInputButton[index] = value;
    setInputs(updateInputButton);
  };

  const saveButton =
    showCard.length === 0 || inputs.some((input) => input.trim() === "");

  return (
    <div>
      <Navbar />
      <div className="flex flex-col lg:flex-row-reverse lg:justify-center lg:w-full py-4 mb-4">
        <main className="bg-white flex flex-col mt-4 mx-4 py-4 rounded-lg justify-center items-center lg:w-[58%] lg:mt-0 lg:mx-0 lg:pb-0">
          <div className="flex flex-col justify-start items-start gap-2 mb-10 mx-4 w-[90%]">
            <h2 className="font-bold text-2xl text-[#333333]">
              Customize your links
            </h2>
            <p className="font-normal text-[16px] text-[#737373] md:w-[721px] lg:w-full">
              Add/edit/remove links below and then share all your profiles with
              the world!
            </p>
          </div>
          <ButtonComponent
            text="+ Add new link"
            textColor="text-[#633CFF]"
            type="submit"
            spacing="w-[90%]"
            bg="bg-white"
            border="border border-[#633CFF]"
            onClick={handleClick}
          />
          {showCard.length === 0 ? (
            <div className="bg-[#FAFAFA] flex flex-col gap-2 justify-center items-center w-[90%] px-4 py-6 mt-6 rounded-xl">
              <img src={illustration} alt="illustration" className="block" />
              <h3 className="font-bold text-2xl text-[#333333]">
                Let&#39;s get you started
              </h3>
              <p className="font-normal text-[16px] text-[#737373] md:max-w-[488px] md:text-center">
                Use the “Add new link” button to get started. Once you have more
                than one link, you can reorder and edit them. We&#39;re here to
                help you share your profiles with everyone!
              </p>
            </div>
          ) : (
            showCard.map((_, index) => (
              <CardInput
                key={index}
                index={index}
                onRemove={handleRemoveLink}
                onChange={(value) => handleInputWithButton(index, value)}
              />
            ))
          )}
          <div className="w-full h-[1px] border mt-8 mb-3"></div>
          <div className="w-full flex justify-center md:justify-end md:pr-4">
            <ButtonComponent
              type="submit"
              text="Save"
              spacing="mb-3 w-[90%] md:w-[15%] md:mr-6 outline-none"
              onClick={() => {}}
              disabled={saveButton}
            />
          </div>
        </main>
        <div className="hidden lg:flex lg:items-center lg:justify-center lg:w-[38%] lg:bg-white mr-8 ">
          <img src={phone} alt="phone image" className="w-[280px] h-[500px]" />
        </div>
      </div>
    </div>
  );
};

export default LinkPage;
