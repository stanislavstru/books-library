import type { BooksProviderStateType, BooksProviderActionType } from "./types";
import { initialBooksList } from "@/config/initial-data";

export function reducer(
  state: BooksProviderStateType,
  action: BooksProviderActionType
): BooksProviderStateType {
  switch (action.type) {
    case "INITIAL_LIST":
      return {
        ...state,
        books: initialBooksList,
        favorite: [],
      };

    case "SET_DATA":
      return { ...state, ...action.payload };

    case "ADD_BOOK": {
      const exists = state.books.find((b) => b.ISBN === action.payload.ISBN);
      const books = exists
        ? state.books.map((b) =>
            b.ISBN === action.payload.ISBN ? action.payload : b
          )
        : [...state.books, action.payload];
      return { ...state, books };
    }

    case "EDIT_BOOK":
      return {
        ...state,
        books: state.books.map((b) =>
          b.ISBN === action.payload?.ISBN ? action.payload : b
        ),
      };

    case "DELETE_BOOK":
      return {
        ...state,
        books: state.books.filter((b) => b.ISBN !== action.payload),
      };

    case "SET_FAVORITE":
      return {
        ...state,
        favorite: [...state.favorite, action.payload],
      };

    case "DELETE_FAVORITE":
      return {
        ...state,
        favorite: state.favorite.filter((isbn) => isbn !== action.payload),
      };

    case "CLEAN_FAVORITES":
      return {
        ...state,
        favorite: [],
      };

    default:
      return state;
  }
}
