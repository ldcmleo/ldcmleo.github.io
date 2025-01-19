import React, { useState } from "react";
import CryptedMessage from "./CryptedMessage";
import Continue from "./Continue";
import Trivia, { type Answer } from "./Trivia";
import Container from "./Container";
import Indicator from "./Indicator";
import Laberinto from "./Laberinto";

const firstAnswers: Answer[] = [
    { text: "August", isCorrect: false },
    { text: "October", isCorrect: true },
    { text: "September", isCorrect: false }
];

const secondAnswers: Answer[] = [
    { text: "Mi amor", isCorrect: false },
    { text: "Bubika", isCorrect: true },
    { text: "Preciosa", isCorrect: false }
];

const thirdAnswers: Answer[] = [
    { text: "Harto", isCorrect: true },
    { text: "A little", isCorrect: false },
    { text: "Mucho", isCorrect: false }
];

const cryptedMessages = [
    <CryptedMessage 
        key={"cm1"} 
        message="I love you more every day" 
        crytedMessage="I elvo uoy erom yveer yad" 
        hint="Each word has its letters scrambled." />,
    <CryptedMessage 
        key={"cm2"} 
        message="you are amazing" 
        crytedMessage="25-15-21 1-18-5 1-13-1-26-9-14-7" 
        hint="Each number corresponds to the position of a letter in the alphabet." />,
    <CryptedMessage 
        key={"cm3"} 
        message="You are my sunshine" 
        crytedMessage="Brx duh pb vxqvkqhv" 
        hint="Shift each letter three steps forward." />,
    <Continue 
        key={"c1"} 
        message="Congratulations! You finished the first Puzzle!!" />
];

const trivias = [
    <Trivia key={"t1"} question="In what month did we start dating?" answers={firstAnswers} />,
    <Trivia key={"t2"} question="What is my favorite nickname to call you?" answers={secondAnswers} />,
    <Trivia key={"t3"} question="How much I love you? <3" answers={thirdAnswers} />,
    <Continue key={"c2"} message="Congratulations! You finished the second Puzzle!!" />
];

const laberintos = [
    <Laberinto />,
    <Continue key={"c3"} message="Congratulations! You finished the third Puzzle!!" />
];

const containers = [
    <Container key={"container-1"} elements={cryptedMessages} />,
    <Container key={"container-2"} elements={trivias} />,
    <Container key={"container-3"} elements={laberintos} />
];

const Puzzles: React.FC<{}> = ({}) => {
    const [solve, setSolve] = useState(false);

    const onFinish = () => {
        setSolve(true);
    };

    return (
        <div>
            {solve ? 
            <div>
                <p className="text-2xl text-center uppercase">Congratulations!!, you solved all the tests, as a reward I will give you a password to claim your prize</p>
                <p className="text-xl text-center pt-2">Password: <span className="text-gray-400">fresh-strawberry</span></p>
            </div> 
            : 
            <Container elements={containers} indicator={<Indicator />} onComplete={onFinish} />}
        </div>
    );
};

export default Puzzles;