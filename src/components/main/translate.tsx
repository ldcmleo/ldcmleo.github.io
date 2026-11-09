import {
  forwardRef,
  useImperativeHandle,
  useState,
} from "react";

type Props = {
  urlEs: string;
  urlEn: string;
} & React.ComponentPropsWithoutRef<"div">;

export type TranslateButtonHandle = {
  doShow: () => void;
  doHide: () => void;
};

const TranslateButton = forwardRef<TranslateButtonHandle, Props>(
  (props, ref) => {
    const [open, setOpen] = useState(false);
    const [visible, setVisible] = useState(false);
    const { urlEs, urlEn, ...rest } = props;

    useImperativeHandle(ref, () => ({
      doShow: () => {
        setVisible(true);
      },
      doHide: () => {
        setVisible(false);
        setOpen(false);
      },
    }));

    return (
      <div
        className={`absolute left-0 top-0 transition-transform duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] ${
          visible ? "-translate-y-[100px] pointer-events-auto opacity-100" : "translate-y-0 pointer-events-none opacity-0"
        }`}
        style={{
          zIndex: -2,
        }}
        {...rest}
      >
        <div className="relative">
          <button
            onClick={() => setOpen(!open)}
            aria-label="Cambiar idioma de la página"
            title="Cambiar idioma"
            aria-expanded={open}
            className="w-11 h-11 flex items-center justify-center bg-zinc-200 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-100 border border-zinc-300 dark:border-zinc-700 shadow-md hover:bg-zinc-100 dark:hover:bg-zinc-700 active:scale-95 transition-all duration-200 ease-[cubic-bezier(0.23,1,0.32,1)]"
          >
            <i className="nf nf-md-translate text-lg"></i>
          </button>
          <a
            href={urlEs}
            aria-label="Cambiar a Español"
            className={`absolute top-0 w-11 h-11 flex items-center justify-center font-bold text-xs bg-zinc-200 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-100 border border-zinc-300 dark:border-zinc-700 shadow-md hover:bg-zinc-100 dark:hover:bg-zinc-700 active:scale-95 transition-all duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] ${
              open ? "-translate-x-[50px] opacity-100 pointer-events-auto" : "translate-x-0 opacity-0 pointer-events-none"
            }`}
            style={{
              zIndex: -3,
            }}
          >
            ES
          </a>
          <a
            href={urlEn}
            aria-label="Switch to English"
            className={`absolute top-0 w-11 h-11 flex items-center justify-center font-bold text-xs bg-zinc-200 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-100 border border-zinc-300 dark:border-zinc-700 shadow-md hover:bg-zinc-100 dark:hover:bg-zinc-700 active:scale-95 transition-all duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] ${
              open ? "-translate-x-[100px] opacity-100 pointer-events-auto" : "translate-x-0 opacity-0 pointer-events-none"
            }`}
            style={{
              zIndex: -3,
            }}
          >
            EN
          </a>
        </div>
      </div>
    );
  },
);

export default TranslateButton;
