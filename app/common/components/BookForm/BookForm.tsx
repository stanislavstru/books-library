import React, { useEffect, useState } from "react";
import { validationSchema } from "./validation";
import { genres } from "@/common/config/initial-data";
import { classNames } from "@/common/utils/class-names";
import StarRatingInput from "@/UI/StarRatingInput";
import Input from "@/UI/Input";
import Select from "@/UI/Select";
import { useBookContext } from "@/common/hooks/useBookContext";
import type { OffcanvasBookType } from "../BookOffcanvas/BookOffcanvas";

const optionsSubgenre = genres.genres.reduce((acc, genre) => {
  if (genre.subgenres) {
    genre.subgenres.forEach((subgenre) => {
      acc.push({ label: subgenre.name, value: subgenre.name });
    });
  }
  return acc;
}, [] as { label: string; value: string }[]);

const initialFormData: Omit<Book, "ISBN"> = {
  Title: "",
  author: "",
  Year: "",
  subgenre: "",
  ratings: 0,
};

type BookFormProps = {
  bookISBN: OffcanvasBookType["bookISBN"];
  className?: string;
  submitCallback: () => void;
};

const BookForm: React.FC<BookFormProps> = ({
  bookISBN,
  className,
  submitCallback,
}) => {
  const { books, addBook, updateBook } = useBookContext();
  const [form, setForm] = useState<Omit<Book, "ISBN">>(initialFormData);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    const activeBook = books.find((book) => book.ISBN === bookISBN);

    setForm(
      activeBook
        ? {
            Title: activeBook?.Title || "",
            author: activeBook?.author || "",
            Year: activeBook?.Year || "",
            subgenre: activeBook?.subgenre || "",
            ratings: activeBook?.ratings || 0,
          }
        : initialFormData
    );
  }, [bookISBN]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    console.log(form);
    e.preventDefault();
    try {
      await validationSchema.validate(form, { abortEarly: false });
      setErrors({});

      if (bookISBN) {
        updateBook({ ...form, ISBN: bookISBN });
      } else {
        addBook({
          ...form,
        });
      }

      setForm(initialFormData);
      setErrors({});
      submitCallback();
    } catch (validationError: any) {
      const yupErrors: Record<string, string> = {};
      if (validationError.inner) {
        validationError.inner.forEach((err: any) => {
          if (err.path) yupErrors[err.path] = err.message;
        });
      }
      setErrors(yupErrors);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={classNames("space-y-6", className)}
      noValidate
    >
      <Input
        id="title"
        label="Title"
        value={form.Title}
        onChange={handleChange}
        error={errors.Title}
        name="Title"
        placeholder="Enter book title"
      />

      <Input
        id="author"
        label="Author"
        value={form.author}
        onChange={handleChange}
        error={errors.author}
        name="author"
        placeholder="Enter author name"
      />

      <Select
        id="year"
        label="Year"
        value={form.Year}
        onChange={handleChange}
        type="year"
        error={errors.Year}
        name="Year"
        placeholder="Select publication year"
      />

      <Select
        id="subgenre"
        label="Subgenre"
        value={form.subgenre}
        onChange={handleChange}
        options={optionsSubgenre}
        error={errors.subgenre}
        name="subgenre"
        placeholder="Select a subgenre"
      />

      <StarRatingInput
        label="Ratings"
        value={form.ratings}
        onChange={(value) => {
          setForm((prev) => ({ ...prev, ratings: value }));
          setErrors((prev) => ({ ...prev, ratings: "" }));
        }}
        error={errors.ratings}
      />

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
      >
        {bookISBN ? "Update Book" : "Create Book"}
      </button>
    </form>
  );
};

export default BookForm;
