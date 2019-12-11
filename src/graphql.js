import ApolloClient from "apollo-boost";
import { setClient } from 'svelte-apollo';

export const initializedClient = function(context) {
  if (context.jwtToken) {

    // Initialize the client
    const client = new ApolloClient({
      uri: `${context.apiUrl}/graphql`,

      request: operation => {
        operation.setContext({
          headers: {
            Authorization: "Bearer " + context.jwtToken
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
