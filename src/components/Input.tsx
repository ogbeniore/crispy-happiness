import React, { ChangeEvent, KeyboardEvent } from "react";


interface InputProps {
    onKeyDown: (e: KeyboardEvent<HTMLInputElement>) => void;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const CustomInput = ({ onKeyDown, onChange}: InputProps) => {
    return (
        <input
            className="project-phase__input"
            type="text"
            onChange={onChange}
            onKeyDown={onKeyDown} />
    )
}

export default CustomInput;