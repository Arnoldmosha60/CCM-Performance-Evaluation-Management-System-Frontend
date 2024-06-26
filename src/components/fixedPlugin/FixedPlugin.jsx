// Chakra Imports
// Custom Icons
import React from "react";
import { RiMoonFill, RiSunFill } from "react-icons/ri";

export default function FixedPlugin(props) {
  const { ...rest } = props;
  const [darkmode, setDarkmode] = React.useState(
    document.body.classList.contains("dark")
  );

  return (
    <button
      className="border-px fixed bottom-[30px] right-[35px] !z-[99] flex h-[60px] w-[60px] items-center justify-center rounded-full border-[#6a53ff] p-0"
      style={{ background: 'linear-gradient(to bottom, yellow, green)' }}
      onClick={() => {
        if (darkmode) {
          document.body.classList.remove("dark");
          setDarkmode(false);
        } else {
          document.body.classList.add("dark");
          setDarkmode(true);
        }
      }}
      {...rest}
    >
      <div className="cursor-pointer">
        {darkmode ? (
          <RiSunFill className="h-4 w-4 text-gray-800" />  // Adjust icon color for visibility
        ) : (
          <RiMoonFill className="h-4 w-4 text-gray-800" />  // Adjust icon color for visibility
        )}
      </div>
    </button>
  );
}
