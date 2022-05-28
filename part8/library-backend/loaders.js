const Book = require("./models/book");

const batchBooks = async (authorIds) => {
  const books = await Book.find({
    author: {
      $in: authorIds,
    },
  });

  const result = authorIds.map(
    (authorId) => books.filter((book) => book.author.equals(authorId)).length
  );

  return result;
};

module.exports = batchBooks;
