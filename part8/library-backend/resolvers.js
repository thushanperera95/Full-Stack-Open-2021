require("dotenv").config();

const { PubSub } = require("graphql-subscriptions");
const { UserInputError, AuthenticationError } = require("apollo-server");
const jwt = require("jsonwebtoken");
const Book = require("./models/book");
const Author = require("./models/author");
const User = require("./models/user");

const pubsub = new PubSub();

const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      const query = {};

      if (args.genre) {
        query.genres = { $in: [args.genre] };
      }

      if (args.author) {
        const author = await Author.findOne({ name: args.author });
        query.author = author?._id;
      }

      return await Book.find(query).populate("author");
    },
    allAuthors: async () => Author.find({}),
    me: (root, args, context) => {
      return context.currentUser;
    },
  },
  Author: {
    bookCount: async (root) => {
      const books = await Book.find({ author: root._id });
      return books.length;
    },
  },
  Mutation: {
    addBook: async (root, args, { currentUser }) => {
      if (!currentUser) {
        throw new AuthenticationError("not authorized");
      }

      try {
        let authorId;
        let createdAuthor;
        const author = await Author.findOne({ name: args.author });
        if (author) {
          authorId = author._id;
        } else {
          const newAuthor = new Author({ name: args.author });
          await newAuthor.save();
          authorId = newAuthor._id;
          createdAuthor = newAuthor;
        }

        const book = new Book({ ...args, author: authorId });
        await book.save();

        var enrichedBook = await book.populate("author");

        await pubsub.publish("BOOK_ADDED", { bookAdded: enrichedBook });

        if (createdAuthor) {
          await pubsub.publish("AUTHOR_ADDED", { authorAdded: createdAuthor });
        }

        return enrichedBook;
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      }
    },
    editAuthor: async (root, args, { currentUser }) => {
      const author = await Author.findOne({ name: args.name });

      if (!currentUser) {
        throw new AuthenticationError("not authorized");
      }

      if (author) {
        author.born = args.setBornTo;
        try {
          await author.save();
        } catch (error) {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          });
        }
      }

      return author;
    },
    createUser: async (root, args) => {
      const user = new User({
        username: args.username,
        favouriteGenre: args.favouriteGenre,
      });

      try {
        await user.save();
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      }
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username });

      if (!user || args.password != "secret") {
        throw new UserInputError("wrong credentials");
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      };

      return { value: jwt.sign(userForToken, process.env.JWT_SECRET_KEY) };
    },
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(["BOOK_ADDED"]),
    },
    authorAdded: {
      subscribe: () => pubsub.asyncIterator(["AUTHOR_ADDED"]),
    },
  },
};

module.exports = resolvers;
