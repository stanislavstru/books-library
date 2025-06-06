import { useState, useEffect, useRef } from "react";
import Select from "@/UI/Select";
import StarRatingInput from "../../StarRatingInput";
import { FilterIcon } from "@/common/images/FilterIcon";
import type { FilterType } from "../Table";

export type FiltersTableProps = {
  structure: {
    [key: string]: {
      label: string;
      type: FilterType;
      options?: { value: string; label: string }[];
    };
  };
  onFilter: (fitersObject: {
    [key: string]: {
      type: FilterType;
      value: string;
    };
  }) => void;
};

export const FiltersTable = ({ structure, onFilter }: FiltersTableProps) => {
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<{
    [key: string]: {
      type: FilterType;
      value: string;
    };
  }>({});
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowFilters(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative">
      <div
        className="border border-gray-300 hover:bg-gray-300 transition-all cursor-pointer rounded px-2 py-2 text-sm flex items-center justify-between"
        onClick={() => setShowFilters((prev) => !prev)}
      >
        <FilterIcon className="w-5 h-5" />
      </div>

      {showFilters && (
        <div
          ref={dropdownRef}
          className="absolute top-0 right-0 z-10 bg-white shadow-lg rounded p-4 min-w-[250px]"
        >
          <div className="flex flex-col gap-5">
            {Object.entries(structure).map(([key, filter]) => {
              if (filter.type === "select") {
                return (
                  <div key={key} className="flex flex-col gap-2">
                    <label className="text-sm">{filter.label}</label>
                    <Select
                      id={`filter-${key}`}
                      options={filter.options || []}
                      onChange={(e) =>
                        setFilters((prev) => ({
                          ...prev,
                          [key]: {
                            type: filter.type,
                            value: e.target.value,
                          },
                        }))
                      }
                      value={filters[key]?.value || ""}
                    />
                  </div>
                );
              }

              if (filter.type === "range") {
                const max = filter.options
                  ? Math.max(
                      ...filter.options.map((opt) => parseFloat(opt.value))
                    )
                  : 5;
                const min = filter.options
                  ? Math.min(
                      ...filter.options.map((opt) => parseFloat(opt.value))
                    )
                  : 0;

                return (
                  <div key={key} className="flex flex-col gap-2">
                    <label className="text-sm">Minimum {filter.label}</label>
                    <StarRatingInput
                      onChange={(value) =>
                        setFilters((prev) => ({
                          ...prev,
                          [key]: {
                            type: filter.type,
                            value: String(value),
                          },
                        }))
                      }
                      max={max}
                      min={min}
                      step={0.1}
                      value={parseFloat(filters[key]?.value || "0") || 0}
                    />
                  </div>
                );
              }
              return null;
            })}
          </div>
          <div className="mt-5 flex justify-between items-center gap-2">
            <button
              type="button"
              className="w-full text-center text-sm border border-blue-600 bg-blue-600 text-white py-2 px-2 rounded hover:bg-blue-700 transition"
              onClick={() => {
                onFilter(filters);
                setShowFilters(false);
              }}
            >
              Apply
            </button>
            <button
              type="button"
              className="w-full text-sm border text-center border-blue-600 text-blue-600 py-2 px-2 rounded hover:bg-blue-700 hover:text-white transition"
              onClick={() => {
                setFilters({});
                onFilter({});
                setShowFilters(false);
              }}
            >
              Reset filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
