import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";

type Props = {
    urlEs: string;
    urlEn: string;
} & React.ComponentPropsWithoutRef<'div'>;

export type TranslateButtonHandle = {
    doShow: () => void;
    doHide: () => void;
};

const TranslateButton = forwardRef<TranslateButtonHandle, Props>(( props, ref ) => {
    const [ open, setOpen ] = useState(false);
    const { urlEs, urlEn, ...rest } = props;
    const mainRef = useRef<HTMLDivElement>(null);
    const esBtnRef = useRef<HTMLButtonElement>(null);
    const enBtnRef = useRef<HTMLButtonElement>(null);

    useImperativeHandle(ref, () => ({
        doShow: () => {
            if (mainRef.current) {
                mainRef.current.style.top = "-90px";
            }
        },
        doHide: () => {
            if (mainRef.current) {
                mainRef.current.style.top = "0px";
                setOpen(false);
            }
        }
    }));

    useEffect(() => {
        if (open) {
            if (esBtnRef.current) {
                esBtnRef.current.style.left = "-45px";
            }

            if (enBtnRef.current) {
                enBtnRef.current.style.left = "-90px";
            }
        } else {
            if (esBtnRef.current) {
                esBtnRef.current.style.left = "0px";
            }

            if (enBtnRef.current) {
                enBtnRef.current.style.left = "0px";
            }
        }
    }, [open]);

    return (
        <div 
            ref={mainRef}
            className="absolute left-0 transition-all ease-in"
            style={{
                zIndex: -2
            }}
            {...rest}
        >
            <div className="relative">
                <button
                    onClick={() => setOpen(!open)}
                    className="bg-zinc-300 dark:bg-zinc-600 shadow-lg px-3 py-2 rounded-sm"
                >
                    <i className="nf nf-md-translate"></i>
                </button>
                <button 
                    ref={esBtnRef}
                    onClick={() => window.location.href = urlEs}
                    className="absolute top-0 w-[40px] h-[40px] text-center share leading-[40px] rounded-sm shadow-lg bg-zinc-300 dark:bg-zinc-600 transition-all ease-in"
                    style={{
                        zIndex: -3
                    }}
                >ES</button>
                <button 
                    ref={enBtnRef}
                    onClick={() => window.location.href = urlEn}
                    className="absolute top-0 w-[40px] h-[40px] text-center share leading-[40px] rounded-sm shadow-lg bg-zinc-300 dark:bg-zinc-600 transition-all ease-in"
                    style={{
                        zIndex: -3
                    }}
                >EN</button>
            </div>
        </div>
    )
});

export default TranslateButton;