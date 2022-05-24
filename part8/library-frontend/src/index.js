import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

const httpLink = new HttpLink({
  uri: "http://localhost:4000",
  headers: {
    Authorization: `Bearer ${localStorage.getItem("library-user-token")}`,
  },
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: httpLink,
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("root")
);
