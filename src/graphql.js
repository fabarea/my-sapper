import ApolloClient from "apollo-boost";
import { setClient } from 'svelte-apollo';
import { getContext } from "svelte";
import Cookies from "js-cookie";

export const initializedClient = function() {
  if (typeof window !== "undefined" &&  Cookies.get("jwt")) {

    // Fetch the context
    const context = getContext('context');

    // Initialize the client
    const client = new ApolloClient({
      uri: `${context.apiUrl}/graphql`,

      request: operation => {
        operation.setContext({
          headers: {
            Authorization: "Bearer " + Cookies.get("jwt")
          }
        });
      },
      onError: ({ networkError, graphQLErrors }) => {
        console.log("graphQLErrors", graphQLErrors);
        console.log("networkError", networkError);
      }
    });

    setClient(client)
  }
};
