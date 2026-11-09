import { useEffect, useRef, useState } from "react";
import ThemeButton from "./theme_button";
import UpButton from "./up_button";
import TranslateButton, { type TranslateButtonHandle } from "./translate";

export default function NavMenu({
  actualpathEn,
  actualpathEs,
}: {
  actualpathEn: string;
  actualpathEs: string;
}) {
  const [open, setOpen] = useState(false);
  const themeButtonRef = useRef<HTMLButtonElement>(null);
  const upButtonRef = useRef<HTMLButtonElement>(null);
  const translateButtonRef = useRef<TranslateButtonHandle>(null);

  useEffect(() => {
    if (open) {
      if (themeButtonRef.current) {
        themeButtonRef.current.style.transform = "translateY(-50px)";
        themeButtonRef.current.style.opacity = "1";
        themeButtonRef.current.style.pointerEvents = "auto";
      }
      if (upButtonRef.current) {
        upButtonRef.current.style.transform = "translateX(-50px)";
        upButtonRef.current.style.opacity = "1";
        upButtonRef.current.style.pointerEvents = "auto";
      }
      if (translateButtonRef.current) {
        translateButtonRef.current.doShow();
      }
    } else {
      if (themeButtonRef.current) {
        themeButtonRef.current.style.transform = "translateY(0)";
        themeButtonRef.current.style.opacity = "0";
        themeButtonRef.current.style.pointerEvents = "none";
      }
      if (upButtonRef.current) {
        upButtonRef.current.style.transform = "translateX(0)";
        upButtonRef.current.style.opacity = "0";
        upButtonRef.current.style.pointerEvents = "none";
      }
      if (translateButtonRef.current) {
        translateButtonRef.current.doHide();
      }
    }
  }, [open]);

  return (
    <nav className="fixed right-4 bottom-4 z-50" aria-label="Menú flotante rápido">
      <div className="relative">
        <button
          className="w-11 h-11 flex items-center justify-center bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 border border-zinc-700 dark:border-zinc-300 shadow-lg hover:opacity-90 active:scale-95 transition-all duration-200 ease-[cubic-bezier(0.23,1,0.32,1)]"
          onClick={() => setOpen(!open)}
          aria-label={open ? "Cerrar menú de opciones" : "Abrir menú de opciones"}
          aria-expanded={open}
        >
          <i className={`text-lg transition-transform duration-200 ${open ? "nf nf-fa-close rotate-90" : "nf nf-md-menu"}`}></i>
        </button>
        <ThemeButton ref={themeButtonRef} />
        <UpButton ref={upButtonRef} />
        <TranslateButton
          ref={translateButtonRef}
          urlEs={actualpathEs}
          urlEn={actualpathEn}
        />
      </div>
    </nav>
  );
}
