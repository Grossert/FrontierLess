import { useState, useEffect } from "react";
import StarTrue from "./components/StarTrue";
import StarFalse from "./components/StarFalse";

interface Props {
    disabled?: boolean;
    grade?: number;
    onChange?: (newGrade: number) => void;
}

export default function StarAvaliation({ disabled = false, grade = 1, onChange }: Props) {
    const [hoveredStars, setHoveredStars] = useState(0);
    const [selectedStars, setSelectedStars] = useState(grade);

    useEffect(() => {
        setSelectedStars(grade);
    }, [grade]);

    const handleMouseEnter = (index: number) => {
        if (!disabled) {
            setHoveredStars(index + 1);
        }
    };

    const handleMouseLeave = () => {
        if (!disabled) {
            setHoveredStars(0);
        }
    };

    const handleClick = (index: number) => {
        if (!disabled) {
            const starsValue = index + 1;
            setSelectedStars(starsValue);

            if (onChange) {
                onChange(starsValue);
            }
        }
    };

    return (
        <div className="flex items-center">
            {Array.from({ length: 5 }, (_, i) => (
                <div
                    key={i}
                    onMouseEnter={() => handleMouseEnter(i)}
                    onMouseLeave={handleMouseLeave}
                    onClick={() => handleClick(i)}
                    className={disabled ? "cursor-default" : "cursor-pointer"}
                >
                    {i < (hoveredStars || selectedStars) ? <StarTrue /> : <StarFalse />}
                </div>
            ))}
        </div>
    );
}
