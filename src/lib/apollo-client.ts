import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { isTokenValid } from "@/utils/jwt";

const httpLink = createHttpLink({
  uri: "http://localhost:4000/graphql",
});

const authLink = setContext((_, { headers }) => {
  // Get the JWT token from the auth-token cookie
  let token = null;
  
  if (typeof window !== "undefined") {
    const authTokenCookie = document.cookie
      .split("; ")
      .find((row) => row.startsWith("auth-token="));
    
    if (authTokenCookie) {
      token = decodeURIComponent(authTokenCookie.split("=")[1]);
      
      // Validate the token before using it
      // if (!isTokenValid(token)) {
      //   console.warn("Invalid or expired JWT token, removing from cookie");
      //   // Remove the invalid token
      //   document.cookie = "auth-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      //   token = null;
      // }
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
