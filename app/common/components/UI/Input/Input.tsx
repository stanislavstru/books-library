import React from "react";
import type { FC } from "react";
import { classNames } from "@/common/utils/class-names";

type InputProps = {
  id: string;
  label?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  type?: string;
  name?: string;
  placeholder?: string;
  className?: string;
};

const Input: FC<InputProps> = ({
  id,
  label,
  value,
  onChange,
  error,
  type = "text",
  name,
  placeholder,
  className = "",
}) => {
  const inputName = name || id;

  return (
    <div className={classNames("flex flex-col gap-1", className)}>
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <input
        id={id}
        name={inputName}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`px-4 py-2 block w-full rounded border border-gray-300 focus:ring-blue-500 focus:border-blue-500 placeholder:text-gray-400 ${
          error ? "border-red-500" : ""
        }`}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
      />
      {error && (
        <p className="text-red-600 text-sm" id={`${id}-error`}>
          {error}
        </p>
      )}
    </div>
  );
};

export default Input;
