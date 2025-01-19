import React, { useState } from "react";
import type { ReactElement } from "react";

interface ContainerProps {
    elements: React.ReactNode[];
    indicator?: React.ReactNode;
    onComplete?: () => void;
}

const Container: React.FC<ContainerProps> = ({ elements, indicator, onComplete }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const totalElements = elements.length;

    const goToNext = () => {
        if (currentIndex < totalElements - 1) {
            setCurrentIndex(currentIndex + 1);
        } else {
            if (onComplete) {
                onComplete();
            }
        }
    };
    
    return (
        <div>
            {indicator && React.cloneElement(indicator as ReactElement, { current: currentIndex, total: totalElements })}

            {React.cloneElement(elements[currentIndex] as ReactElement, { onComplete: goToNext })}
        </div>
    );
};

export default Container;