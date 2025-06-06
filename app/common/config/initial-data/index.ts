export const initialBooksList: Book[] = [
  {
    Title: "The art of War",
    author: "Sun Tzu",
    Year: "2012",
    subgenre: "History",
    ISBN: "A3-RT-21-A",
    ratings: 4.8,
  },
  {
    Title: "Clean Code",
    author: "Robert Martin",
    Year: "2007",
    subgenre: "Technology",
    ISBN: "SDF43-138",
    ratings: 4.2,
  },
  {
    Title: "Code Complete",
    author: "Steve McConnell",
    Year: "1993",
    subgenre: "Technology",
    ISBN: "0735619670",
    ratings: 4.3,
  },
];

export const genres: { genres: Genre[] } = {
  genres: [
    {
      name: "Fiction",
      subgenres: [
        { name: "Fantasy" },
        { name: "Science Fiction" },
        { name: "Action & Adventure" },
        { name: "Mystery" },
        { name: "Romance" },
        { name: "Horror" },
        { name: "Historical Fiction" },
      ],
    },
    {
      name: "Non-Fiction",
      subgenres: [
        { name: "Memoir" },
        { name: "Autobiography" },
        { name: "Biography" },
        { name: "History" },
        { name: "Business & Money" },
        { name: "Technology" },
        { name: "Religion & Spirituality" },
      ],
    },
  ],
};
