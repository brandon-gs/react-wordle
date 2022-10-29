import { ReactComponent as Switch } from "@/assets/Switch.svg";
import { ReactComponent as SwitchDark } from "@/assets/SwitchDark.svg";
import { ReactComponent as SwitchBody } from "@/assets/SwitchBody.svg";
import { ReactComponent as SwitchBodyDark } from "@/assets/SwitchBodyDark.svg";
import { ThemeContext } from "@/context";
import { useContext, useRef } from "react";

const ThemeToggle = () => {
  const switchRef = useRef<HTMLDivElement>(null);
  const switchDarkRef = useRef<HTMLDivElement>(null);
  const { theme, setTheme } = useContext(ThemeContext);

  const handleSetDarkMode = () => {
    const animationEnd = () => {
      if (switchRef.current) {
        setTheme("dark");
        switchRef.current.classList.add("right-1/2");
        switchRef.current.removeEventListener("animationend", animationEnd);
      }
    };
    if (switchRef.current) {
      switchRef.current.classList.add("animate-toggle-to-left");
      switchRef.current.addEventListener("animationend", animationEnd);
    }
  };

  const handleSetLightMode = () => {
    const animationDarkModeEnd = () => {
      if (switchDarkRef.current) {
        setTheme("light");
        switchDarkRef.current.classList.add("left-1/2");
        switchDarkRef.current.removeEventListener("animationend", animationDarkModeEnd);
      }
    };
    if (switchDarkRef.current) {
      switchDarkRef.current.classList.add("animate-toggle-to-right");
      switchDarkRef.current.addEventListener("animationend", animationDarkModeEnd);
    }
  };

  const handleChangeTheme = () => {
    if (theme === "light") {
      handleSetDarkMode();
      return;
    }
    handleSetLightMode();
  };

  return (
    <div className="flex flex-col">
      <div className="relative h-9">
        <div className="relative cursor-pointer" onClick={handleChangeTheme}>
          {theme === "light" ? (
            <>
              <div className="absolute top-0 w-8 h-8 right-1" ref={switchRef}>
                <Switch className="absolute h-8 right-1" />
              </div>
              <SwitchBody className="w-20 h-8" />
            </>
          ) : (
            <>
              <div className="absolute top-0 w-8 h-8 left-1" ref={switchDarkRef}>
                <SwitchDark className="absolute w-8 left-1" style={{ top: -4 }} />
              </div>
              <SwitchBodyDark className="w-20 h-8" />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ThemeToggle;
