import { classNames } from "@/common/utils/class-names";
import type { FC } from "react";

type Option = {
  label: string;
  value: string;
};

type BaseSelectProps = {
  id: string;
  label?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  error?: string;
  name?: string;
  placeholder?: string;
};

type RegularSelectProps = BaseSelectProps & {
  type?: "regular";
  options: Option[];
  minYear?: never;
};

type YearSelectProps = BaseSelectProps & {
  type: "year";
  options?: never;
  minYear?: number;
};

type SelectProps = RegularSelectProps | YearSelectProps;

const Select: FC<SelectProps> = ({
  id,
  label,
  value,
  onChange,
  options,
  error,
  name,
  placeholder,
  type = "regular",
  minYear = 1800,
}) => {
  const selectName = name || id;

  return (
    <div>
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}

      <div className="relative">
        <select
          id={id}
          name={selectName}
          value={value}
          onChange={onChange}
          className={classNames(
            "appearance-none mt-1 px-4 py-2 block w-full rounded border border-gray-300 focus:ring-blue-500 focus:border-blue-500",
            error && "border-red-500",
            value === "" ? "text-gray-400" : "text-black"
          )}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}

          {type === "year"
            ? [...Array(new Date().getFullYear() - minYear + 1)]
                .map((_, i) => {
                  const y = minYear + i;
                  return (
                    <option key={y} value={y}>
                      {y}
                    </option>
                  );
                })
                .reverse()
            : options?.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
        </select>

        <div
          className={
            "pointer-events-none absolute top-3 right-3 transform transition-transform duration-300"
          }
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20px"
            height="20px"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M12.7071 14.7071C12.3166 15.0976 11.6834 15.0976 11.2929 14.7071L6.29289 9.70711C5.90237 9.31658 5.90237 8.68342 6.29289 8.29289C6.68342 7.90237 7.31658 7.90237 7.70711 8.29289L12 12.5858L16.2929 8.29289C16.6834 7.90237 17.3166 7.90237 17.7071 8.29289C18.0976 8.68342 18.0976 9.31658 17.7071 9.70711L12.7071 14.7071Z"
              fill="#000000"
            />
          </svg>
        </div>
      </div>

      {error && (
        <p className="text-red-600 text-sm mt-1" id={`${id}-error`}>
          {error}
        </p>
      )}
    </div>
  );
};

export default Select;
