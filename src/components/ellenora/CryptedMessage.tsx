import React, { useState } from "react";
import type { ChangeEvent } from "react";

interface CryptedMessegeProps {
    message: string;
    crytedMessage: string;
    hint: string;
    onComplete?: () => void;
}

const CryptedMessege: React.FC<CryptedMessegeProps> = ({ message = "", crytedMessage = "", hint = "", onComplete }) => {
    const [isSolved, setIsSolved] = useState(false);
    const [msg, setMassage] = useState(message);
    const [cMsg, setCMsg] = useState(crytedMessage);
    const [answer, setAnswer] = useState<string>("");
    const [tip, setHint] = useState(hint);

    const checkTest = () => {
        if (answer.toLowerCase() == msg.toLowerCase() && isSolved != true) {
            setIsSolved(true);
        }
    }

    const changeValue = (e: ChangeEvent<HTMLInputElement>) => {
        setAnswer(e.target.value);
    }

    return (
        <div className="relative text-center min-h-[350px]">
            <i className="group absolute top-0 -right-6 nf nf-md-alert_circle">
                <p className="hidden group-hover:block absolute top-5 right-0 min-w-[150px] bg-white text-black p-2 rounded-md shadow-md">{ tip }</p>
            </i>
            <p className="text-3xl text-zinc-300 pb-4">"{ cMsg }"</p>
            <input className="text-black w-[350px] rounded-md px-4 py-2 mb-2 text-center outline-none" type="text" value={answer} onChange={changeValue} />
            <button className="block mx-auto rounded-md bg-green-700 px-4 py-2 hover:bg-green-600" onClick={checkTest} >Check!</button>
            { isSolved && <button onClick={onComplete} className="block mx-auto rounded-md bg-blue-700 px-4 py-1 mt-2 hover:bg-blue-600">Next</button> }
        </div>
    )
}

export default CryptedMessege;