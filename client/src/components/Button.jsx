import React from "react";
import clsx from 'clsx';

const Button = ({ className, icon, label, type, onClick = () => {}}) => {
    return (
        <button
        type={type || "button"}
        className={clsx('px-3 py-2 outline-none', className)}
        onClick={onClick}
        >
            <span>{label}</span>
            {icon && icon}
        </button>
    );
};

export default Button;