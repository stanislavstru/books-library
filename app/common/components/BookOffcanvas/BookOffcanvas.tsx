import OffCanvas from "@/UI/Offcanvas";
import BookForm from "../BookForm";
import type { FC } from "react";

export type OffcanvasBookType = {
  show: boolean;
  bookISBN: Book["ISBN"] | null;
};

export const initialOffcanvasBook: OffcanvasBookType = {
  show: false,
  bookISBN: null,
};

type OffcanvasBookProps = {
  offcanvasBook: typeof initialOffcanvasBook;
  setOffcanvasBook: (value: typeof initialOffcanvasBook) => void;
};

const BookOffcanvas: FC<OffcanvasBookProps> = ({
  offcanvasBook,
  setOffcanvasBook,
}) => {
  return (
    <OffCanvas
      title={offcanvasBook.bookISBN ? "Edit a book" : "Add a new book"}
      isOpen={offcanvasBook.show}
      onClose={() => setOffcanvasBook(initialOffcanvasBook)}
    >
      <BookForm
        bookISBN={offcanvasBook.bookISBN}
        className="mt-4"
        submitCallback={() => setOffcanvasBook(initialOffcanvasBook)}
      />
    </OffCanvas>
  );
};

export default BookOffcanvas;
