import { useContext, useMemo } from "react";
import { BooksContext } from "@/components/BooksProvider/BooksProvider";
import { generateFakeISBNCode } from "@/common/utils/id-generators";

export function useBookContext() {
  const context = useContext(BooksContext);

  if (!context) {
    throw new Error("useBookContext must be used within a BooksProvider");
  }

  const { state, dispatch } = context;

  return useMemo(
    () => ({
      books: state.books,
      favorite: state.favorite,
      backToInitialList: () => dispatch({ type: "INITIAL_LIST" }),
      addBook: (book) =>
        dispatch({
          type: "ADD_BOOK",
          payload: { ...book, ISBN: generateFakeISBNCode() },
        }),
      updateBook: (book) => dispatch({ type: "EDIT_BOOK", payload: book }),
      deleteBook: (isbn) => dispatch({ type: "DELETE_BOOK", payload: isbn }),
      setFavorite: (favorite) =>
        dispatch({ type: "SET_FAVORITE", payload: favorite }),
      deleteFavorite: (favorite) =>
        dispatch({ type: "DELETE_FAVORITE", payload: favorite }),
      cleanFavorites: () => dispatch({ type: "CLEAN_FAVORITES" }),
    }),
    [state, dispatch]
  );
}
