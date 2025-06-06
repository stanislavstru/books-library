import * as Yup from "yup";

export const validationSchema = Yup.object({
  Title: Yup.string()
    .max(128, "Book title must be at most 128 characters")
    .required("Book title is required"),
  author: Yup.string()
    .max(64, "Author must be at most 64 characters")
    .required("Author is required"),
  Year: Yup.string().required("Year is required"),
  subgenre: Yup.string().required("Subgenre is required"),
  ratings: Yup.number()
    .min(0.1, "Rating must be at least 0")
    .required("Rating is required"),
});
