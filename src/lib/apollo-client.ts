import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const httpLink = createHttpLink({
  uri: "http://localhost:4000/graphql",
});

const authLink = setContext((_, { headers }) => {
  // Get the authentication token from the auth-storage cookie
  const authStorage =
    typeof window !== "undefined"
      ? document.cookie
          .split("; ")
          .find((row) => row.startsWith("auth-storage="))
      : null;

  let token = null;
  if (authStorage) {
    try {
      const authData = JSON.parse(
        decodeURIComponent(authStorage.split("=")[1])
      );
      token = authData.state.token;
    } catch (e) {
      console.error("Error parsing auth storage:", e);
    }
  }

  // Return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: "cache-and-network",
    },
  },
});
