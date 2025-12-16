import React, { ButtonHTMLAttributes, FC, ReactNode } from 'react';
import cls from './Button.module.css'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children?: ReactNode;
}

const Button: FC<ButtonProps> = ({ children, ...otherProps }) => {
    return (
        <button className={cls.button} {...otherProps}>
            {children}
        </button>
    );
};

export default Button;