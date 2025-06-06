import type { Route } from "./+types/home";
import Library from "../common/components/Library";
import { BooksProvider } from "@/common/components/BooksProvider/BooksProvider";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Virtual Library" },
    {
      name: "description",
      content:
        "A book library application with features for searching, adding, deleting, and organizing books by categories.",
    },
  ];
}

export default function Home() {
  return (
    <BooksProvider>
      <Library />
    </BooksProvider>
  );
}
