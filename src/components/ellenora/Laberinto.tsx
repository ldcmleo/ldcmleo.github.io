import React, { useEffect, useState } from "react";

const Laberinto: React.FC<{ onComplete?: () => void }> = ({ onComplete }) => {
    const [fails, setFails] = useState(0);
    const [points, setPoints] = useState(0);
    const [isSolved, setIsSolved] = useState(false);

    const pieces = [
        1, 0, 0,
        1, 1, 0,
        0, 1, 0,
        0, 1, 0,
        0, 1, 1
    ];

    useEffect(() => {
        if (points >= 7) {
            setIsSolved(true);
        }
    }, [points])

    const checkPosition = (e: React.MouseEvent<HTMLElement>, value: number) => {
        if (value == 0) {
            setFails(fails + 1);
            e.currentTarget.classList.add("bg-red-600");
            e.currentTarget.classList.remove("bg-gray-300");
        } else {
            setPoints(points + 1);
            e.currentTarget.classList.add("bg-green-600");
            e.currentTarget.classList.remove("bg-gray-300");
        }
    };

    return (
        <div className="py-20">
            {isSolved ? 
                <div className="text-center">
                    <p className="text-gray-500 text-xl">Fails: {fails}</p>
                    <p className="text-3xl">You found the way to my heart!</p>
                    <button onClick={onComplete} className="block mx-auto rounded-md bg-blue-700 px-4 py-1 mt-2 hover:bg-blue-600">Next</button>
                </div> 
            : 
                <div className="grid grid-cols-3 gap-2">
                    <div className="col-span-3 text-2xl">Solve the following maze</div>
                    <div className="text-center"><i className="nf nf-md-arrow_down_thick text-blue-500"></i></div>
                    <div className="col-span-2"></div>
                    {pieces.map((value, index) => (
                        <button key={index} onClick={(e) => checkPosition(e, value)} className="bg-gray-300 h-20"></button>
                    ))}
                    <div className="col-span-2"></div>
                    <div className="text-center"><i className="nf nf-md-heart text-red-500"></i></div>
                </div>}
        </div>
    );
};

export default Laberinto;