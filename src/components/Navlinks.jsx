import logo from "../../public/assets/logo.png";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebase";
import {
  RiArrowDownSFill,
  RiBardLine,
  RiChatAiLine,
  RiFile4Line,
  RiFolderUserLine,
  RiNotificationLine,
  RiShutDownLine,
} from "react-icons/ri";

const Navlinks = () => {
  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="sticky lg:static top-0 h-[7vh] lg:h-screen w-full lg:w-28 bg-linear-to-b from-orange-500 to-orange-600 shadow-xl flex lg:flex-col items-center">

      {/* Logo */}
      <div className="w-full flex items-center justify-center p-5">
        <div className="p-3.5 rounded-xl bg-white shadow-md flex items-center justify-center">
          <img
            src={logo}
            className="w-10 h-10 object-contain"
            alt="Logo"
          />
        </div>
      </div>

      {/* Icons */}
      <ul className="flex lg:flex-col flex-row items-center gap-6 mt-4 px-2">
        <li>
          <button className="group text-[22px] lg:text-[26px] p-3 rounded-xl text-white bg-white/15 shadow-md hover:shadow-xl hover:-translate-y-0.5 hover:bg-white/25 transition-all">
            <RiChatAiLine className="group-hover:scale-110 transition-transform" />
          </button>
        </li>
        <li>
          <button className="group text-[22px] lg:text-[26px] p-3 rounded-xl text-white bg-white/15 shadow-md hover:shadow-xl hover:-translate-y-0.5 hover:bg-white/25 transition-all">
            <RiFolderUserLine className="group-hover:scale-110 transition-transform" />
          </button>
        </li>
        <li>
          <button className="group text-[22px] lg:text-[26px] p-3 rounded-xl text-white bg-white/15 shadow-md hover:shadow-xl hover:-translate-y-0.5 hover:bg-white/25 transition-all">
            <RiNotificationLine className="group-hover:scale-110 transition-transform" />
          </button>
        </li>
        <li>
          <button className="group text-[22px] lg:text-[26px] p-3 rounded-xl text-white bg-white/15 shadow-md hover:shadow-xl hover:-translate-y-0.5 hover:bg-white/25 transition-all">
            <RiFile4Line className="group-hover:scale-110 transition-transform" />
          </button>
        </li>
        <li>
          <button className="group text-[22px] lg:text-[26px] p-3 rounded-xl text-white bg-white/15 shadow-md hover:shadow-xl hover:-translate-y-0.5 hover:bg-white/25 transition-all">
            <RiBardLine className="group-hover:scale-110 transition-transform" />
          </button>
        </li>
        <li>
          <button
            onClick={handleLogout}
            className="group text-[22px] lg:text-[26px] p-3 rounded-xl text-white bg-red-500/80 shadow-md hover:shadow-xl hover:-translate-y-0.5 hover:bg-red-600 transition-all"
          >
            <RiShutDownLine className="group-hover:scale-110 transition-transform" />
          </button>
        </li>
      </ul>

      {/* Mobile toggle */}
      <button className="block lg:hidden mt-auto mb-3 text-[22px] p-3 rounded-xl text-white bg-white/15 hover:bg-white/25 transition-all shadow-md">
        <RiArrowDownSFill />
      </button>
    </section>
  );
};

export default Navlinks;
