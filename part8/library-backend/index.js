require("dotenv").config();

const mongoose = require("mongoose");
const { ApolloServer } = require("apollo-server-express");
const { ApolloServerPluginDrainHttpServer } = require("apollo-server-core");
const { makeExecutableSchema } = require("@graphql-tools/schema");
const express = require("express");
const http = require("http");
const { execute, subscribe } = require("graphql");
const { SubscriptionServer } = require("subscriptions-transport-ws");

const jwt = require("jsonwebtoken");

const User = require("./models/user");

const typeDefs = require("./schema");
const resolvers = require("./resolvers");
const DataLoader = require("dataloader");
const batchBooks = require("./loaders");

const MONGO_DB_URI = process.env.MONGODB_URI;

console.log("connecting to", MONGO_DB_URI);

mongoose
  .connect(MONGO_DB_URI)
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connecting to MongoDB:", error.message);
  });

const start = async () => {
  const app = express();
  const httpServer = http.createServer(app);

  const schema = makeExecutableSchema({ typeDefs, resolvers });

  const subscriptionServer = SubscriptionServer.create(
    {
      schema,
      execute,
      subscribe,
    },
    {
      server: httpServer,
      path: "",
    }
  );

  const server = new ApolloServer({
    schema,
    context: async ({ req }) => {
      const auth = req ? req.headers.authorization : null;
      if (auth && auth.toLowerCase().startsWith("bearer ")) {
        const decodedToken = jwt.verify(
          auth.substring(7),
          process.env.JWT_SECRET_KEY
        );
        const currentUser = await User.findById(decodedToken.id);
        return {
          currentUser,
          dataloaders: {
            books: new DataLoader((keys) => batchBooks(keys)),
          },
        };
      }
    },
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      {
        async serverWillStart() {
          return {
            async drainServer() {
              subscriptionServer.close();
            },
          };
        },
      },
    ],
  });

  await server.start();

  server.applyMiddleware({
    app,
    path: "/",
  });

  const PORT = 4000;

  httpServer.listen(PORT, () => {
    console.log(
      `Server is now available at http://localhost:${PORT}${server.graphqlPath}`
    );
  });
};

start();
