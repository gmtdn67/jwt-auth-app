import React, { FC, ReactNode } from "react";
import cls from "./Text.module.css";

interface TextProps {
  title?: string;
  text?: string;
}

const Text: FC<TextProps> = ({ title, text }) => {
  return (
    <div className={cls.container}>
      {title && <p className={cls.title}>{title}</p>}
      {text && <p className={cls.text}>{text}</p>}
    </div>
  );
};

export default Text;
