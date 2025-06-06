import { classNames } from "@/common/utils/class-names";

type StarRatingInputProps = {
  label?: string;
  value?: number;
  onChange: (value: number) => void;
  error?: string;
  min?: number;
  max?: number;
  step?: number;
};

const StarRatingInput = ({
  label,
  value = 0,
  onChange,
  error,
  min = 0,
  max = 5,
  step = 0.2,
}: StarRatingInputProps) => {
  return (
    <div className="flex flex-col gap-2 w-full">
      <label
        className={classNames(
          "flex text-sm font-medium text-gray-700",
          label ? "justify-between" : "justify-end"
        )}
      >
        {label && <span>{label}</span>}
        <div className="flex gap-2 items-center">
          <small>{value}</small> ⭐
        </div>
      </label>

      <div className="flex items-center gap-2">
        {min && <small>{min}</small>}
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange?.(parseFloat(e.target.value))}
          className="w-full cursor-pointer accent-blue-600"
        />
        {max && <small>{max}</small>}
      </div>

      {error && <p className="text-red-600 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default StarRatingInput;
