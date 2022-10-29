import { ReactComponent as InfoIcon } from "@/assets/Info.svg";
import { ReactComponent as ChartIcon } from "@/assets/Chart.svg";
import { ModalsContext } from "@/context";
import { useContext } from "react";
import ThemeToggle from "../ThemeToggle/ThemeToggle";

const Header = () => {
  const { openModalByKey } = useContext(ModalsContext);

  return (
    <header className="navbar flex justify-between items-center mt-10 pl-6 pr-4 bg-lightHeaderBg dark:bg-darkHeaderBg w-full max-w-header h-header">
      <InfoIcon
        className="text-lightIcons dark:text-darkIcons cursor-pointer w-7"
        onClick={() => openModalByKey("showHowToPlay")}
      />
      <h1 className="uppercase text-lightHeaderTitle dark:text-darkHeaderTitle text-4xl font-semibold text-center">
        Wordle
      </h1>
      <div className="flex items-center">
        <ChartIcon
          className="text-lightIcons stroke-white dark:text-light dark:stroke-dark cursor-pointer"
          onClick={() => openModalByKey("showStats")}
        />
        <ThemeToggle />
      </div>
    </header>
  );
};

export default Header;
