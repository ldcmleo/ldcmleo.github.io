import { forwardRef, useEffect, useState } from "react";

const ThemeButton = forwardRef<HTMLButtonElement>((_, ref) => {
  const [mode, setMode] = useState<"dark" | "light" | "default">("default");

  useEffect(() => {
    getAppearance();
  }, []);

  const getAppearance = () => {
    if (localStorage.theme === "dark") {
      setMode("dark");
      document.documentElement.classList.add("dark");
    } else if (localStorage.theme === "light") {
      setMode("light");
      document.documentElement.classList.remove("dark");
    } else {
      if (
        !("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
      ) {
        document.documentElement.classList.add("dark");
      } else {
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

  const getAriaLabel = (): string => {
    switch (mode) {
      case "dark":
        return "Cambiar a modo automático / sistema";
      case "light":
        return "Cambiar a modo oscuro";
      default:
        return "Cambiar a modo claro";
    }
  };

  return (
    <button
      onClick={setTheme}
      aria-label={getAriaLabel()}
      title={getAriaLabel()}
      className="absolute left-0 top-0 w-11 h-11 flex items-center justify-center bg-zinc-200 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-100 border border-zinc-300 dark:border-zinc-700 shadow-md hover:bg-zinc-100 dark:hover:bg-zinc-700 active:scale-95 transition-all duration-200 ease-[cubic-bezier(0.23,1,0.32,1)]"
      style={{
        zIndex: -1,
      }}
      ref={ref}
    >
      <i className={`${getThemeIcon()} text-lg`}></i>
    </button>
  );
});

export default ThemeButton;
