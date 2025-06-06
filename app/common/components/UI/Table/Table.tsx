import { classNames } from "@/common/utils/class-names";
import { useMemo, useState, type ReactNode } from "react";
import {
  FiltersTable,
  type FiltersTableProps,
} from "./components/FiltersTable";
import SearchInput from "../../SearchInput";

type ColumnTableType<T> = {
  key: string;
  label: string;
  sortable?: boolean;
  searchable?: boolean;
  filterType?: FilterType;
  row?: (item: T) => ReactNode;
};

export type FilterType = "select" | "range";

export type ColumnsTableType<T> = ColumnTableType<T>[];

export type TableProps<T> = {
  data: T[];
  columns: ColumnsTableType<T>;
  className?: string;
};

const Table = <T,>({ data, columns, className = "" }: TableProps<T>) => {
  const [settings] = useState(() => ({
    isActiveSearch: columns.some((column) => column.searchable),
    isActiveFilter: columns.some((column) => column?.filterType),
  }));

  const [filteredSortedBooks, setFilteredSortedBooks] = useState<{
    search: string;
    filter: {
      [key: string]: {
        type: FilterType;
        value: string | number;
      };
    };
    sortField: string;
    sortOrder: "asc" | "desc" | "";
  }>({
    search: "",
    filter: {},
    sortField: "",
    sortOrder: "",
  });

  const preparedData = useMemo(() => {
    let newData = [...data];

    if (filteredSortedBooks.sortField && filteredSortedBooks.sortOrder) {
      newData.sort((a, b) => {
        const fieldA = a[filteredSortedBooks.sortField];
        const fieldB = b[filteredSortedBooks.sortField];

        if (fieldA < fieldB)
          return filteredSortedBooks.sortOrder === "asc" ? -1 : 1;
        if (fieldA > fieldB)
          return filteredSortedBooks.sortOrder === "asc" ? 1 : -1;
        return 0;
      });
    }

    if (filteredSortedBooks.search !== "") {
      const searchLower = filteredSortedBooks.search.toLowerCase();
      const activeFields = columns
        .filter((column) => column.searchable)
        .map((column) => column.key);

      newData = newData.filter((item) =>
        activeFields.some((field) =>
          String(item[field]).toLowerCase().includes(searchLower)
        )
      );
    }

    if (Object.keys(filteredSortedBooks.filter).length > 0) {
      Object.entries(filteredSortedBooks.filter).forEach(([key, filter]) => {
        newData = newData.filter((item) => {
          const value = item[key];

          if (filter.type === "select") {
            return String(value) === String(filter.value);
          } else if (filter.type === "range") {
            return parseFloat(value) >= parseFloat(filter.value as string);
          }
          return true;
        });
      });
    }

    return newData;
  }, [data, filteredSortedBooks]);

  const filtersStructure = useMemo(() => {
    return columns.reduce((acc, column) => {
      if (column.filterType) {
        const options = data
          .map((item) => item[column.key])
          .filter((value, index, self) => self.indexOf(value) === index)
          .map((value) => ({ value: String(value), label: String(value) }));

        acc[column.key] = {
          label: column.label,
          type: column.filterType,
          options,
        };
      }
      return acc;
    }, {} as FiltersTableProps["structure"]);
  }, [columns, data]);

  return (
    <div className={classNames(className)}>
      <div className="flex justify-between items-center gap-2">
        {settings.isActiveSearch && (
          <SearchInput
            onSearch={(value) => {
              setFilteredSortedBooks((prev) => ({
                ...prev,
                search: value,
              }));
            }}
          />
        )}
        {settings.isActiveFilter && (
          <FiltersTable
            structure={filtersStructure}
            onFilter={(filterConfig) =>
              setFilteredSortedBooks((prev) => ({
                ...prev,
                filter: filterConfig,
              }))
            }
          />
        )}
      </div>

      <table className="min-w-full mt-5 overflow-x-auto">
        <thead className="bg-gray-100">
          <tr className="text-left text-sm border-gray-100">
            {columns.map((column) => {
              const activeSort = !!column.sortable && preparedData.length > 1;
              const isActive = filteredSortedBooks.sortField === column.key;
              const currentOrder = filteredSortedBooks.sortOrder;

              return (
                <th
                  key={column.key}
                  className={classNames(
                    "uppercase px-2 py-1",
                    activeSort && "cursor-pointer"
                  )}
                  onClick={() =>
                    activeSort &&
                    setFilteredSortedBooks((prev) => {
                      let newSortField = column.key;
                      let newSortOrder: "asc" | "desc" | "" = "asc";

                      if (prev.sortField === column.key) {
                        if (prev.sortOrder === "asc") newSortOrder = "desc";
                        else if (prev.sortOrder === "desc") {
                          newSortField = "";
                          newSortOrder = "";
                        }
                      }

                      return {
                        ...prev,
                        sortField: newSortField,
                        sortOrder: newSortOrder,
                      };
                    })
                  }
                >
                  {column.label}
                  {isActive && currentOrder !== "" && (
                    <span className="ml-1">
                      {currentOrder === "asc" ? "↑" : "↓"}
                    </span>
                  )}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {preparedData.map((item, index) => (
            <tr key={index} className="border-b border-gray-200">
              {columns.map((column) => (
                <td key={column.key} className="px-2 py-1">
                  {column.row ? column.row(item) : item[column.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default Table;
