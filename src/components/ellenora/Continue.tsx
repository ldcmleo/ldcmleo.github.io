import React from "react";

const Continue: React.FC<{ message: string, onComplete?: () => void }> = ({ message, onComplete }) => {
    return (
        <div className="text-center">
            <p className="text-xl pt-4 pb-8">{message}</p>
            <button onClick={onComplete} className="px-2 py-1 bg-green-700 rounded-md">Continue</button>
        </div>
    );
};

export default Continue;