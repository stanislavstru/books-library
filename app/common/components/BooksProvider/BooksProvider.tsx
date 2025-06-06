import { createContext, useEffect, useReducer, useState } from "react";
import type { ReactNode } from "react";
import type { BooksProviderStateType, BooksProviderActionType } from "./types";
import { reducer } from "./reducer";
import { initialBooksList } from "@/config/initial-data";

const LOCAL_STORAGE_KEY = "book-store";

const initialState: BooksProviderStateType = {
  books: initialBooksList,
  favorite: [],
};

export const BooksContext = createContext<{
  state: BooksProviderStateType;
  dispatch: React.Dispatch<BooksProviderActionType>;
}>({} as any);

export function BooksProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (stored) {
      dispatch({ type: "SET_DATA", payload: JSON.parse(stored) });
    }
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state));
  }, [state.books, state.favorite]);

  if (!isHydrated) {
    return null;
  }

  return (
    <BooksContext.Provider value={{ state, dispatch }}>
      {children}
    </BooksContext.Provider>
  );
}
