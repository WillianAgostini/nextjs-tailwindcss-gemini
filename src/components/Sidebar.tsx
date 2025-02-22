import {
  AiOutlinePlus
} from "react-icons/ai";
import { BiLinkExternal } from "react-icons/bi";
import { FaGithub } from "react-icons/fa";
import { FiMessageSquare } from "react-icons/fi";

const Sidebar = (props: any) => {
  const { I18nDictionary, apiKey, handleApiKey } = props;
  const i18n: I18nDictionary = I18nDictionary;

  const handleInputChange = (event: any) => {
    handleApiKey(event.target.value)
  };

  return (
    <div className="scrollbar-trigger flex h-full w-full flex-1 items-start border-white/20">
      <nav className="flex h-full flex-1 flex-col space-y-1 p-2">
        {/* <a className="flex py-3 px-3 items-center gap-3 rounded-md hover:bg-gray-500/10 transition-colors duration-200 text-white cursor-pointer text-sm mb-1 flex-shrink-0 border border-white/20">
          <AiOutlinePlus className="h-4 w-4" />
          {i18n.NEW_CHAT}
        </a> */}
        <div className="flex-col flex-1 overflow-y-auto border-b border-white/20">
          <div className="flex flex-col gap-2 pb-2 text-gray-100 text-sm">
            {/* <a className="flex py-3 px-3 items-center gap-3 relative rounded-md hover:bg-[#386FA4] cursor-pointer break-all hover:pr-4 group">
              <FiMessageSquare className="h-4 w-4" />
              <div className="flex-1 text-ellipsis max-h-5 overflow-hidden break-all relative">
                {i18n.NEW_CONVERSATION}
                <div className="absolute inset-y-0 right-0 w-8 z-10"></div>
              </div>
            </a> */}
          </div>
        </div>
        {/* <a className="flex py-3 px-3 items-center gap-3 rounded-md hover:bg-gray-500/10 transition-colors duration-200 text-white cursor-pointer text-sm">
          <AiOutlineMessage className="h-4 w-4" />
          Clear conversations
        </a>
        <a className="flex py-3 px-3 items-center gap-3 rounded-md hover:bg-gray-500/10 transition-colors duration-200 text-white cursor-pointer text-sm">
          <AiOutlineUser className="h-4 w-4" />
          My plan
        </a>
        <a className="flex py-3 px-3 items-center gap-3 rounded-md hover:bg-gray-500/10 transition-colors duration-200 text-white cursor-pointer text-sm">
          <AiOutlineSetting className="h-4 w-4" />
          Settings
        </a> */}
        <a
          href="https://makersuite.google.com/app/apikey"
          target="_blank"
          className="flex py-3 px-3 items-center gap-3 rounded-md hover:bg-gray-500/10 transition-colors duration-200 text-white cursor-pointer text-sm"
        >
          <BiLinkExternal className="h-4 w-4" />
          {i18n.GET_API_KEY}
        </a>
        <input value={apiKey} type="password" onChange={handleInputChange} placeholder="Gemini API key" className="flex py-3 px-3 items-center gap-3 rounded-md duration-200 text-black cursor-pointer text-sm">
        </input>
        {/* <a className="flex py-3 px-3 items-center gap-3 rounded-md hover:bg-gray-500/10 transition-colors duration-200 text-white cursor-pointer text-sm">
          <MdLogout className="h-4 w-4" />
          Log out
        </a> */}
        <a
          href="https://github.com/WillianAgostini/chatbot-gemini"
          target="_blank"
          className="flex py-3 px-3 items-center gap-3 rounded-md hover:bg-gray-500/10 transition-colors duration-200 text-white cursor-pointer text-sm"
        >
          <FaGithub className="h-4 w-4" />
          {i18n.START_ME_GITHUB}
        </a>
      </nav>
    </div>
  );
};

export default Sidebar;
