/* eslint-disable */

import { HiX } from "react-icons/hi";
import Links from "./components/Links";
import routes from "routes.js";
import logo from 'assets/img/auth/ccm_Logo.png';

const Sidebar = ({ open, onClose }) => {
  // Filter out the some route
  const filteredRoutes = routes.filter(route => (
    route.path !== "view_objectives/:representativeId/" &&
    route.path !== "view_targets/:objectiveId/" &&
    route.path !== "view_indicators/:targetId/" &&
    route.path !== "view_activities/:indicatorId/"
  ));

  return (
    <div
      className={`sm:none duration-175 linear fixed !z-50 flex min-h-full flex-col pb-10 shadow-2xl shadow-white/5 transition-all dark:text-white md:!z-50 lg:!z-50 xl:!z-0 ${
        open ? "translate-x-0" : "-translate-x-96"
      }`}
      style={{
        backgroundColor: "green"
      }}
    >
      <span
        className="absolute top-4 right-4 block cursor-pointer xl:hidden"
        onClick={onClose}
      >
        <HiX />
      </span>

      <div className="mx-[35px] mt-[40px] flex items-center">
        <img src={logo} alt="Logo" className="h-20 w-20 mr-1" />
        <div className="p-1 shadow-lg rounded bg-white dark:bg-navy-700 dark:text-white">
          <div className="font-poppins text-[26px] font-bold uppercase text-navy-700 dark:text-white">
            CCM - <span className="font-medium">PEMS</span>
          </div>
        </div>
      </div>
      <div className="mt-[58px] mb-7 h-px bg-gray-300 dark:bg-white/30" />
      {/* Nav item */}

      <ul className="mb-auto pt-1">
        <Links routes={filteredRoutes} />
      </ul>

      {/* Nav item end */}
    </div>
  );
};

export default Sidebar;
