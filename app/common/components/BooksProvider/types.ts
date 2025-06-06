export type BooksProviderStateType = {
  books: Book[];
  favorite: Book["ISBN"][];
};

export type BooksProviderActionType =
  | { type: "INITIAL_LIST" }
  | { type: "SET_DATA"; payload: BooksProviderStateType }
  | { type: "ADD_BOOK"; payload: Book }
  | { type: "DELETE_BOOK"; payload: string }
  | { type: "EDIT_BOOK"; payload: Book | null }
  | { type: "SET_FAVORITE"; payload: Book["ISBN"] }
  | { type: "DELETE_FAVORITE"; payload: Book["ISBN"] }
  | { type: "CLEAN_FAVORITES" };
