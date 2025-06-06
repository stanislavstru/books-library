import { useState } from "react";
import { initialOffcanvasBook } from "../BookOffcanvas/BookOffcanvas";
import BookOffcanvas from "../BookOffcanvas/BookOffcanvas";
import { useBookContext } from "@/common/hooks/useBookContext";
import Table from "@/UI/Table";
import { TrashIcon } from "@/common/images/TrashIcon";
import { PencilIcon } from "@/common/images/PencilIcon";
import { classNames } from "@/common/utils/class-names";
import type { ColumnsTableType } from "../UI/Table/Table";
import FavoriteBooksOffcanvas from "../FavoriteBooksOffcanvas";

function Library() {
  const [offcanvasBook, setOffcanvasBook] = useState(initialOffcanvasBook);
  const [offcanvasFavBooksShow, setOffcanvasFavBooksShow] = useState(false);
  const {
    books,
    favorite,
    deleteBook,
    setFavorite,
    deleteFavorite,
    backToInitialList,
    cleanFavorites,
  } = useBookContext();

  const columns: ColumnsTableType<Book> = [
    {
      key: "favorite",
      label: "Favorite",
      row: (item) => {
        const active = favorite.includes(item.ISBN);

        return (
          <span
            className={classNames(
              "inline-block px-2 py-1 rounded cursor-pointer",
              active ? "bg-yellow-200" : "bg-gray-200"
            )}
            onClick={() =>
              active ? deleteFavorite(item.ISBN) : setFavorite(item.ISBN)
            }
          >
            {active ? "⭐" : "☆"}
          </span>
        );
      },
    },
    { key: "Title", label: "Title", searchable: true, sortable: true },
    { key: "author", label: "Author", searchable: true },
    { key: "Year", label: "Year", sortable: true },
    { key: "subgenre", label: "Subgenre", filterType: "select" },
    { key: "ISBN", label: "ISBN" },
    { key: "ratings", label: "Ratings", filterType: "range" },
    {
      key: "actions",
      label: "Actions",
      row: (item) => (
        <div className="flex items-center gap-2">
          <PencilIcon
            className="w-5 h-5 cursor-pointer"
            onClick={() => {
              setOffcanvasBook({
                show: true,
                bookISBN: item.ISBN,
              });
            }}
          />
          <TrashIcon
            className="w-5 h-5 cursor-pointer"
            onClick={() => {
              deleteBook(item.ISBN);
            }}
          />
        </div>
      ),
    },
  ];

  return (
    <main className="flex items-center justify-center h-screen">
      <div className="min-w-[700px]">
        <div className="flex mb-4">
          <div
            className="cursor-pointer text-gray-500 text-sm hover:bg-gray-100 p-2 rounded transition-all"
            onClick={() => setOffcanvasBook({ show: true, bookISBN: null })}
          >
            📖 Add Book
          </div>
          <div
            className="cursor-pointer text-gray-500 text-sm hover:bg-gray-100 p-2 rounded transition-all"
            onClick={backToInitialList}
          >
            🔄 Start list
          </div>
          <div
            className="cursor-pointer text-gray-500 text-sm hover:bg-gray-100 p-2 rounded transition-all"
            onClick={() => setOffcanvasFavBooksShow(true)}
          >
            ⭐ Favorite Books
          </div>
          <div
            className="cursor-pointer text-gray-500 text-sm hover:bg-gray-100 p-2 rounded transition-all"
            onClick={cleanFavorites}
          >
            ☆ Clear favorites
          </div>
        </div>
        <div className="flex justify-between items-center mb-4">
          <h1>Welcome to the virtual library</h1>
        </div>

        <div>
          👋 A book library application with features for searching, adding,
          deleting, and organizing books by categories.
        </div>

        <Table className="mt-5" data={books} columns={columns} />

        <BookOffcanvas
          offcanvasBook={offcanvasBook}
          setOffcanvasBook={setOffcanvasBook}
        />

        <FavoriteBooksOffcanvas
          show={offcanvasFavBooksShow}
          onClose={() => {
            console.log("close");
            setOffcanvasFavBooksShow(false);
          }}
        />
      </div>
    </main>
  );
}

export default Library;
