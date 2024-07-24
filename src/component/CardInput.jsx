import * as Select from "@radix-ui/react-select";
import bar from "../img/bar.svg";
import codewars from "../img/black-icon/codeware-icon.svg";
import devto from "../img/black-icon/devto-icon.svg";
import facebook from "../img/black-icon/facebook-icon.svg";
import fcc from "../img/black-icon/FCC-icon.svg";
import gitHub from "../img/black-icon/GitHub.svg";
import gitlab from "../img/black-icon/gitlab-icon.svg";
import hashnode from "../img/black-icon/hashnode-icon.svg";
import linkedin from "../img/black-icon/linedln-icon.svg";
import mentor from "../img/black-icon/mentor-icon.svg";
import stack from "../img/black-icon/stack-icon.svg";
import twitch from "../img/black-icon/twitch-icon.svg";
import twitter from "../img/black-icon/twitter-icon.svg";
import youtube from "../img/black-icon/youtub-icon.svg";
import arrowDown from "../img/arrowDown-icon.svg";

const CardInput = () => {
  return (
    <div className="bg-[#FAFAFA] rounded-lg p-4 mb-6 flex flex-col w-full">
      <div className="flex flex-row justify-between items-center w-full">
        <div className="flex flex-row justify-center items-center">
          <img src={bar} alt="bar" />
          <p className="font-bold text-[#737373] text-[16px]">
            Link <span>#1</span>
          </p>
        </div>
        <p className="text-[16px] font-normal text-[#737373]">Remove</p>
      </div>
      <div className="w-full mt-4">
        <Select.Root defaultValue="github">
          <Select.Trigger className="flex items-center justify-between px-4 py-4 border rounded-lg outline-none border-[#D9D9D9] w-full">
            <Select.Value className="w-full" placeholder="Select platform" />
            <Select.Icon>
              <img src={arrowDown} alt="arrow down" />
            </Select.Icon>
          </Select.Trigger>
          <Select.Content className="w-full">
            <Select.ScrollUpButton />
            <Select.Viewport className="p-2 bg-white border rounded-lg shadow-md w-full">
              <Select.Item
                value="github"
                className="flex items-center p-2 hover:bg-gray-100 cursor-pointer"
              >
                <Select.ItemIndicator className="flex items-center">
                  <img src={gitHub} alt="github" className="w-6 h-6 mr-2" />
                  <Select.ItemText>GitHub</Select.ItemText>
                </Select.ItemIndicator>
              </Select.Item>
              <Select.Item
                value="frontend Mentor"
                className="flex items-center p-2 hover:bg-gray-100 cursor-pointer"
              >
                <Select.ItemIndicator className="flex items-center">
                  <img src={mentor} alt="mentor" className="w-6 h-6 mr-2" />
                  <Select.ItemText>Frontend Mentor</Select.ItemText>
                </Select.ItemIndicator>
              </Select.Item>
              <Select.Item
                value="twitter"
                className="flex items-center p-2 hover:bg-gray-100 cursor-pointer"
              >
                <Select.ItemIndicator className="flex items-center">
                  <img src={twitter} alt="twitter" className="w-6 h-6 mr-2" />
                  <Select.ItemText>Twitter</Select.ItemText>
                </Select.ItemIndicator>
              </Select.Item>
              {/* <Select.Item value="LinkedIn" className="flex items-center p-2">
                <img src={linkedin} alt="linkedin" className="mr-3" /> LinkedIn
              </Select.Item>
              <Select.Item value="YouTube" className="flex items-center p-2">
                <img src={youtube} alt="youtube" className="mr-3" /> YouTube
              </Select.Item>
              <Select.Item value="Facebook" className="flex items-center p-2">
                <img src={facebook} alt="facebook" className="mr-3" /> Facebook
              </Select.Item>
              <Select.Item value="Twitch" className="flex items-center p-2">
                <img src={twitch} alt="twitch" className="mr-3" /> Twitch
              </Select.Item>
              <Select.Item value="Dev.to" className="flex items-center p-2">
                <img src={devto} alt="devto" className="mr-3" /> Dev.to
              </Select.Item>
              <Select.Item value="Codewars" className="flex items-center p-2">
                <img src={codewars} alt="codewear" className="mr-3" /> Codewars
              </Select.Item>
              <Select.Item
                value="FreeCodeCamp"
                className="flex items-center p-2"
              >
                <img src={fcc} alt="" className="mr-3" /> FreeCodeCamp
              </Select.Item>
              <Select.Item value="GitLab" className="flex items-center p-2">
                <img src={gitlab} alt="gitlab" className="mr-3" /> GitLab
              </Select.Item>
              <Select.Item value="Hashnode" className="flex items-center p-2">
                <img src={hashnode} alt="hashnode" className="mr-3" /> Hashnode
              </Select.Item>
              <Select.Item
                value="Stack Overflow"
                className="flex items-center p-2"
              >
                <img src={stack} alt="stack" className="mr-3" /> Stack Overflow
              </Select.Item> */}
            </Select.Viewport>
            <Select.ScrollDownButton />
          </Select.Content>
        </Select.Root>
      </div>
    </div>
  );
};

export default CardInput;
