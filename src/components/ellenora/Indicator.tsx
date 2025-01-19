import React from "react";

interface IndicatorProps {
    current?: number;
    total?: number;
}

const Indicator: React.FC<IndicatorProps> = ({ current = -1, total = -1 }) => {
    const indicators = Array.from({ length: total }, (_, index) => index);

    return (
        <div className="flex gap-2 justify-center pb-8">
            { indicators.map((_, index) => (
                <div 
                    key={index}
                    className={`w-2 h-1 rounded-md ${index <= current ? "bg-green-300" : "bg-zinc-300"}`}>
                </div>
            )) }
        </div>
    );
};

export default Indicator;