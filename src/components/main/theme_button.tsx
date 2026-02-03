import { forwardRef, useEffect, useState } from "react";

const ThemeButton = forwardRef<HTMLButtonElement>((_, ref) => {
  const [dark, setDark] = useState(false);
  const [mode, setMode] = useState("");

  useEffect(() => {
    getAppearance();
  }, []);

  const getAppearance = () => {
    if (localStorage.theme === "dark") {
      setMode("dark");
      setDark(true);
      document.documentElement.classList.add("dark");
    } else if (localStorage.theme === "light") {
      setMode("light");
      setDark(false);
      document.documentElement.classList.remove("dark");
    } else {
      if (
        !("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
      ) {
        setDark(true);
        document.documentElement.classList.add("dark");
      } else {
        setDark(false);
        document.documentElement.classList.remove("dark");
      }

      setMode("default");
    }
  };

  const setTheme = () => {
    if (mode === "light") {
      localStorage.theme = "dark";
    } else if (mode === "dark") {
      localStorage.removeItem("theme");
    } else {
      localStorage.theme = "light";
    }

    getAppearance();
  };

  const getThemeIcon = (): string => {
    switch (mode) {
      case "dark":
        return "nf nf-oct-moon";
      case "light":
        return "nf nf-md-white_balance_sunny";
      default:
        return "nf nf-fa-gear";
    }
  };

  return (
    <button
      onClick={setTheme}
      className="absolute bg-zinc-300 dark:bg-zinc-600 px-3 py-2 rounded-sm left-0 transition-all ease-in"
      style={{
        zIndex: -1,
      }}
      ref={ref}
    >
      <i className={getThemeIcon()}></i>
    </button>
  );
});

export default ThemeButton;
