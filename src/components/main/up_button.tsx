import { forwardRef } from "react";

const UpButton = forwardRef<HTMLButtonElement>((_, ref) => {
  const scroll = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      onClick={scroll}
      aria-label="Volver arriba"
      title="Volver arriba"
      className="absolute left-0 top-0 w-11 h-11 flex items-center justify-center bg-zinc-200 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-100 border border-zinc-300 dark:border-zinc-700 shadow-md hover:bg-zinc-100 dark:hover:bg-zinc-700 active:scale-95 transition-all duration-200 ease-[cubic-bezier(0.23,1,0.32,1)]"
      style={{
        zIndex: -1,
      }}
      ref={ref}
    >
      <i className="nf nf-fa-angles_up text-lg"></i>
    </button>
  );
});

export default UpButton;
