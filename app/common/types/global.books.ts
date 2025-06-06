export {};

declare global {
  type Book = {
    Title: string;
    author: string;
    Year: string;
    subgenre: string;
    ISBN: string;
    ratings: number;
  };

  type BookStore = {
    allBooks: Book[];
    favoriteISBNs: string[];
  };

  type SubGenre = {
    name: string;
  };

  type Genre = {
    name: string;
    subgenres?: SubGenre[];
  };

  type ImgaeCustomType = {
    className?: string;
    style?: React.CSSProperties;
    onClick?: () => void;
  };
}
