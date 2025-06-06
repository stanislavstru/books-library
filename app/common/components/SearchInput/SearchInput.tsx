import { useState, useRef } from "react";
import Input from "@/UI/Input";

const SearchInput = ({ onSearch }: { onSearch: (value: string) => void }) => {
  const [value, setValue] = useState("");
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const hasInteractedRef = useRef(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setValue(inputValue);
    hasInteractedRef.current = true;

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      if (hasInteractedRef.current) {
        onSearch(inputValue);
      }
    }, 400);
  };

  const handleClear = () => {
    setValue("");
    onSearch("");
  };

  return (
    <div className="w-full relative">
      <Input
        type="text"
        id="search"
        placeholder="Search by title, author, or ISBN"
        className="w-full text-sm"
        value={value}
        onChange={handleChange}
      />
      {value.length > 0 && (
        <div
          className="absolute cursor-pointer border w-5 h-5 my-auto flex items-center justify-center top-0 bottom-0 right-4 rounded-full"
          onClick={handleClear}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4 text-gray-500"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M5.29289 5.29289C5.68342 4.90237 6.31658 4.90237 6.70711 5.29289L12 10.5858L17.2929 5.29289C17.6834 4.90237 18.3166 4.90237 18.7071 5.29289C19.0976 5.68342 19.0976 6.31658 18.7071 6.70711L13.4142 12L18.7071 17.2929C19.0976 17.6834 19.0976 18.3166 18.7071 18.7071C18.3166 19.0976 17.6834 19.0976 17.2929 18.7071L12 13.4142L6.70711 18.7071C6.31658 19.0976 5.68342 19.0976 5.29289 18.7071C4.90237 18.3166 4.90237 17.6834 5.29289 17.2929L10.5858 12L5.29289 6.70711C4.90237 6.31658 4.90237 5.68342 5.29289 5.29289Z"
              fill="#0F1729"
            />
          </svg>
        </div>
      )}
    </div>
  );
};

export default SearchInput;
