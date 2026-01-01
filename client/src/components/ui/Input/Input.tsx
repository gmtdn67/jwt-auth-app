import React, { ChangeEvent, FC, InputHTMLAttributes, useState } from "react";
import cls from "./Input.module.css";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  type: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: FC<InputProps> = (props) => {
  const { onChange, type, value, placeholder, className, ...otherProps } = props;
  const inputClassName = className ? `${cls.input} ${className}` : cls.input;

  return (
    <input
      className={inputClassName}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      {...otherProps}
    />
  );
};

export default Input;
