import React, { useState } from "react";

export interface Answer {
    text: string;
    isCorrect: boolean;
}

interface TriviaProps {
    question: string;
    answers: Answer[];
    onComplete?: () => void;
}

const Trivia: React.FC<TriviaProps> = ({ question = "", answers, onComplete }) => {
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
            { solved && <button className="bg-blue-600 mt-4 px-6 py-1 rounded-md hover:bg-blue-500" onClick={onComplete}>Next Question</button> }
        </div>
    );
}

export default Trivia;