import App from "./App";
import { setContext } from "apollo-link-context";
import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
  split,
} from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";
import { WebSocketLink } from "@apollo/client/link/ws";
// import { PersistGate } from 'redux-persist/integration/react';
// import { persistor } from "./redux/store";

const httpLink = createHttpLink({
  uri: "http://localhost:4000/graphql",
});

const webSocketLink = new WebSocketLink({
  uri: "ws://localhost:4000/graphql",
  options: {
    reconnect: true,
    connectionParams: {
      authHeader: localStorage.getItem("jwtToken"),
    },
  },
});

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  webSocketLink,
  httpLink
);

const authLink = setContext(() => {
  const token = localStorage.getItem("jwtToken");
  return {
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(splitLink),
  cache: new InMemoryCache(),
});

const Provider = () => (
  <ApolloProvider client={client}>
      <App />
  </ApolloProvider>
);
export default Provider;
