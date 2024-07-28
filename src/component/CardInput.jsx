import * as Select from "@radix-ui/react-select";
import { useState, forwardRef } from "react";
import github from "../img/black-icon/GitHub.svg";
import mentor from "../img/black-icon/mentor-icon.svg";
import codepen from "../img/black-icon/codepen-icon.svg";
import facebook from "../img/black-icon/facebook-icon.svg";
import twitter from "../img/black-icon/twitter-icon.svg";
import arrow from "../img/arrowDown-icon.svg";
import bar from "../img/bar.svg";

const CardInput = ({ index, onRemove, onChange }) => {
  const [selectedItemIdx, setSelectedItemIdx] = useState(0);
  const [removeBg, setRemoveBg] = useState(false);

  const handleInputChange = (event) => {
    setRemoveBg(true);
    onChange(event.target.value);
  };

  const menuItems = [
    {
      name: "GitHub",
      avatar: `${github}`,
    },
    {
      name: "Fronend Mentor",
      avatar: `${mentor}`,
    },
    {
      name: "Facebook",
      avatar: `${facebook}`,
    },
    {
      name: "Codepen",
      avatar: `${codepen}`,
    },
    {
      name: "Twitter",
      avatar: `${twitter}`,
    },
  ];

  return (
    <div className="bg-[#FAFAFA] rounded-lg flex flex-col p-6  m-4 w-[90%]">
      <div className="flex flex-row justify-between items-center mb-4">
        <div className="flex flex-row gap-1 justify-center items-center">
          <img src={bar} alt="icon" />
          <p className="font-bold text-[#737373] text-[16px]">
            Link
            <span className="font-bold text-[#737373] text-[16px]">
              #{index + 1}
            </span>
          </p>
        </div>
        <div>
          <p
            className="text-[#737373] font-normal text-[16px] cursor-pointer"
            onClick={() => onRemove(index)}
          >
            Remove
          </p>
        </div>
      </div>

      <Select.Root
        value={selectedItemIdx}
        onValueChange={(value) => setSelectedItemIdx(Number(value))}
      >
        <div className="w-full">
          <label className="text-xs text-[#333333] mb-1">Platform</label>
          <Select.Trigger className="w-full inline-flex items-center justify-between px-4 py-3 text-sm text-gray-600 bg-white border rounded-lg shadow-sm outline-none focus:ring-offset-2 ">
            <Select.Value placeholder="Select a member">
              <div className="flex items-center gap-4 text-[16px] text-[#333333]">
                <img
                  src={menuItems[selectedItemIdx].avatar}
                  className="w-5 h-5 rounded-full"
                />
                <div className="flex-1 text-left flex items-center gap-x-1">
                  {menuItems[selectedItemIdx].name}
                </div>
              </div>
            </Select.Value>
            <Select.Icon className="text-[#633CFF]">
              <img src={arrow} alt="icon" />
            </Select.Icon>
          </Select.Trigger>
          <Select.Portal>
            <Select.Content
              position="popper"
              avoidCollisions={false}
              className="w-[var(--radix-select-trigger-width)] max-h-64 mt-3 overflow-y-auto bg-white border rounded-lg shadow-sm text-sm"
            >
              <Select.Viewport className="">
                {menuItems.map((item, idx) => (
                  <SelectItem key={idx} value={idx}>
                    <img
                      src={item.avatar}
                      className="w-5 h-5 rounded-full"
                      alt={item.name}
                    />
                    <div className="flex-1 text-left text-[16px] font-normal text-[#333333] flex items-center gap-x-1">
                      {item.name}
                    </div>
                  </SelectItem>
                ))}
              </Select.Viewport>
            </Select.Content>
          </Select.Portal>
        </div>
      </Select.Root>
      <div className="mt-4">
        <label className="text-xs text-[#333333] mb-1">Link</label>
        <input
          type="text"
          placeholder="e.g.https://www.github.com/"
          onChange={handleInputChange}
          className={`w-full px-4 py-3 border border-[#D9D9D9] rounded-lg text-[16px] text-[#333333] outline-none ${
            removeBg
              ? ""
              : "bg-link bg-link-20px-center bg-link-50px bg-no-repeat"
          }`}
        />
      </div>
    </div>
  );
};

export default CardInput;

const SelectItem = forwardRef(
  ({ children, className, ...props }, forwardedRef) => {
    return (
      <Select.Item
        className="flex items-center justify-between px-3 cursor-default py-2 duration-150 text-[#333333] font-normal text-[16px] data-[state=checked]:text-[#633CFF] data-[state=checked]:bg-indigo-50 data-[highlighted]:text-[#633CFF] data-[highlighted]:bg-indigo-50 data-[highlighted]:hover:text-[#633CFF] data-[highlighted]:hover:bg-indigo-50 outline-none"
        {...props}
        ref={forwardedRef}
      >
        <Select.ItemText>
          <div className="pr-4 line-clamp-1 flex items-center gap-2">
            {children}
          </div>
        </Select.ItemText>
        <div className="w-6">
          <Select.ItemIndicator>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 text-[#633CFF]"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>{" "}
          </Select.ItemIndicator>
        </div>
      </Select.Item>
    );
  }
);
