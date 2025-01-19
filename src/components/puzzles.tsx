import React, { useEffect, useState } from "react";
import type { ChangeEvent } from "react";

const testAnswers: Array<Answer> = [
    { text: "yes", isCorrect: true },
    { text: "no", isCorrect: false },
]

interface CryptedMessegeProps {
    message: string;
    crytedMessage: string;
    hint: string;
    onSendNext: () => void;
}

interface CryptedMessegeContainerProps {
    initialStage: number;
    maxStage: number;
    onSendNext: () => void;
}

interface Answer {
    text: string;
    isCorrect: boolean;
}

interface TriviaProps {
    question: string;
    answers: Answer[];
    onSendNext: () => void;
}

const Trivia: React.FC<TriviaProps> = ({ question = "", answers, onSendNext }) => {
    const [solved, setSolved] = useState(false);

    const selectAnswer = (e: React.MouseEvent<HTMLElement>, answer: Answer) => {
        if (answer.isCorrect) {
            setSolved(true);
            e.currentTarget.classList.add("bg-green-600");
            e.currentTarget.classList.remove("hover:bg-gray-400");
        } else {
            e.currentTarget.classList.add("bg-red-600");
            e.currentTarget.classList.remove("hover:bg-gray-400");
        }
    };

    return (
        <div className="text-center">
            <h1 className="text-xl">Answer the following question</h1>
            <p className="text-2xl italic pt-3">{question}</p>
            <div className="flex justify-center gap-4 pt-4">
                {answers.map((answer) => (
                    <button onClick={(e) => selectAnswer(e, answer)} key={answer.text} className="bg-gray-600 px-6 py-1 rounded-md uppercase hover:bg-gray-400">{answer.text}</button>
                ))}
            </div>
            { solved && <button className="bg-blue-600 mt-4 px-6 py-1 rounded-md hover:bg-blue-500" onClick={onSendNext}>Next Question</button> }
        </div>
    );
}

const TriviaContainer: React.FC<{ initialStage: number, maxStage: number, onSendNext: () => void }> = ({ initialStage = 1, maxStage = 4, onSendNext }) => {
    const [stage, setStage] = useState<number>(initialStage);

    useEffect(() => {
        console.log(`Stage change to: ${stage}`);
    }, [stage]);

    const handleNext = () => {
        setStage((prevStage) => (prevStage < maxStage ? prevStage + 1 : prevStage));
    };

    const renderContent = () => {
        switch (stage) {
            case 1:
                return <Trivia question="the question is this one?" answers={testAnswers} onSendNext={handleNext} />
            case 2:
                return <Trivia question="the question is this one? 2" answers={testAnswers} onSendNext={handleNext} />
            case 3:
                return <Trivia question="the question is this one? 3" answers={testAnswers} onSendNext={handleNext} />
            case 4:
                return (
                    <div className="text-center">
                        <p className="text-xl pt-4 pb-8">Congratulations! You finished the second Puzzle!!</p>
                        <button onClick={onSendNext} className="px-2 py-1 bg-green-700 rounded-md">Press here to the next puzzle</button>
                    </div>
                )
            default:
                return <p>uknown stage</p>
        }
    };

    return (
        <div>
            {renderContent()}
        </div>
    )
}

const CryptedMessege: React.FC<CryptedMessegeProps> = ({ message = "", crytedMessage = "", hint = "", onSendNext }) => {
    const [isSolved, setIsSolved] = useState(false);
    const [msg, setMassage] = useState(message);
    const [cMsg, setCMsg] = useState(crytedMessage);
    const [answer, setAnswer] = useState<string>("");
    const [tip, setHint] = useState(hint);

    const checkTest = () => {
        if (answer == msg && isSolved != true) {
            setIsSolved(true);
        }
    }

    const changeValue = (e: ChangeEvent<HTMLInputElement>) => {
        setAnswer(e.target.value);
    }

    return (
        <div className="relative text-center min-h-[350px]">
            <i className="group absolute top-0 right-0 nf nf-md-alert_circle">
                <p className="hidden group-hover:block absolute top-5 right-0 min-w-[150px] bg-white text-black p-2 rounded-md shadow-md">{ tip }</p>
            </i>
            <p className="text-3xl text-zinc-300 pb-4">"{ cMsg }"</p>
            <input className="text-black w-[350px] rounded-md px-4 py-2 mb-2 text-center outline-none" type="text" value={answer} onChange={changeValue} />
            <button className="block mx-auto rounded-md bg-green-700 px-4 py-2 hover:bg-green-600" onClick={checkTest} >Check!</button>
            { isSolved && <button onClick={onSendNext} className="block mx-auto rounded-md bg-blue-700 px-4 py-1 mt-2 hover:bg-blue-600">Next</button> }
        </div>
    )
}

const CryptedMessegeContainer: React.FC<CryptedMessegeContainerProps> = ({initialStage = 1, maxStage = 4, onSendNext}) => {
    const [stage, setStage] = useState<number>(initialStage);

    useEffect(() => {
        console.log(`Stage changed to: ${stage}`);
    }, [stage]);

    const renderContent = () => {
        switch (stage) {
            case 1:
                return <CryptedMessege key={1} onSendNext={handleNext} message="I love you more every day" crytedMessage="I elvo uoy erom yveer yad" hint="Each word has its letters scrambled." />;
            case 2:
                return <CryptedMessege key={2} onSendNext={handleNext} message="you are amazing" crytedMessage="25-15-21 1-18-5 1-13-1-26-9-14-7" hint="Each number corresponds to the position of a letter in the alphabet." />;
            case 3:
                return <CryptedMessege key={3} onSendNext={handleNext} message="You are my sunshine" crytedMessage="Brx duh pb vxqvkqhv" hint="Shift each letter three steps forward." />;
            case 4:
                return (
                    <div className="text-center">
                        <p className="text-xl pt-4 pb-8">Congratulations! You finished the first Puzzle!!</p>
                        <button onClick={onSendNext} className="px-2 py-1 bg-green-700 rounded-md">Press here to the next puzzle</button>
                    </div>
                )
            default:
                return <p>Unknown stage</p>;
        }
    };

    const handleNext = () => {
        setStage((prevStage) => (prevStage < maxStage ? prevStage + 1 : prevStage));
    };

    return (
        <div>
            {stage <= maxStage - 1 && <p className="text-center text-xl">Solve the next crypted messages</p>}
            {stage <= maxStage - 1 && <p className="text-center text-zinc-600">Messege {stage} from {maxStage - 1}</p>}
            {renderContent()}
        </div>
    );
}

export default function PuzzlesContainer ({initialStage = 1, maxStage = 4}) {
    const [stage, setStage] = useState(initialStage);
    
    const nextButton = () => {
        if (stage < maxStage) {
            setStage(stage + 1);
        }
    };

    const renderStage = () => {
        switch(stage) {
            case 1:
                return (
                    <div className="pt-8">
                        <div className="flex gap-2 justify-center pb-8">
                            <div className="w-2 h-1 rounded-md bg-green-300"></div>
                            <div className="w-2 h-1 rounded-md bg-zinc-300"></div>
                            <div className="w-2 h-1 rounded-md bg-zinc-300"></div>
                        </div>
                        <CryptedMessegeContainer initialStage={1} maxStage={4} onSendNext={nextButton} />
                    </div>
                    );
            case 2:
                return (
                    <div className="pt-8">
                        <div className="flex gap-2 justify-center pb-8">
                            <div className="w-2 h-1 rounded-md bg-green-300"></div>
                            <div className="w-2 h-1 rounded-md bg-green-300"></div>
                            <div className="w-2 h-1 rounded-md bg-zinc-300"></div>
                        </div>
                        <TriviaContainer initialStage={1} maxStage={4} onSendNext={nextButton} />
                    </div>
                    );
            default:
                return (
                    <div className="flex gap-2 justify-center pb-8">
                        <div className="w-2 h-1 rounded-md bg-green-300"></div>
                        <div className="w-2 h-1 rounded-md bg-zinc-300"></div>
                        <div className="w-2 h-1 rounded-md bg-zinc-300"></div>
                    </div>);
        }
    }

    return renderStage();
}