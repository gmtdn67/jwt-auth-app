import React, { FC, HTMLAttributes, ReactNode } from 'react';
import cls from './Card.module.css'

interface CardProps extends HTMLAttributes<HTMLDivElement>{
    children?: ReactNode;
}

const Card: FC<CardProps> = ({children}) => {

    return (
        <div className={cls.card}>
            {children}
        </div>
    );
};

export default Card;