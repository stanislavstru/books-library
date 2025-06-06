import OffCanvas from "@/UI/Offcanvas";
import { useMemo, type FC } from "react";
import Table from "@/UI/Table";
import type { ColumnsTableType } from "../UI/Table/Table";
import { useBookContext } from "@/common/hooks/useBookContext";

type FavoriteBooksOffcanvasProps = {
  show: boolean;
  onClose: () => void;
};

const FavoriteBooksOffcanvas: FC<FavoriteBooksOffcanvasProps> = ({
  show,
  onClose,
}) => {
  const { books, favorite } = useBookContext();

  const columns: ColumnsTableType<Book> = [
    { key: "Title", label: "Title" },
    { key: "author", label: "Author" },
    { key: "Year", label: "Year" },
  ];

  const preparedBooks = useMemo(() => {
    return books
      .filter((book) => favorite.includes(book.ISBN))
      .map((book) => ({
        ...book,
        favorite: true,
      }));
  }, [books, favorite]);

  return (
    <OffCanvas title="Favorite Books" isOpen={show} onClose={onClose}>
      <Table className="mt-5" data={preparedBooks} columns={columns} />
    </OffCanvas>
  );
};

export default FavoriteBooksOffcanvas;
