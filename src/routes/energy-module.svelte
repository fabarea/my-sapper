<script>
  import axios from "axios";
  import Cookies from "js-cookie";
  import { onMount } from "svelte";
  import ApolloClient from "apollo-boost";
  import gql from "graphql-tag";
  import { _ } from "svelte-i18n";
  import { stores } from "@sapper/app";
  import { getContext } from "svelte";
  import { userStore } from "../stores";
  import LoginForm from "../components/Login/LoginForm.svelte";
  import RegisterForm from "../components/Login/RegisterForm.svelte";
  import LogoutForm from "../components/Login/LogoutForm.svelte";

  // Get page from the store. It should be called with $page
  const { page } = stores();
  $: user = $userStore;

  // Retrieve the context
  const context = getContext("context");
  let { jwtToken } = context;

  // Local reactive props
  export let orders = [];

  /**
   *
   */
  function fetchOrders() {
    axios
      .get(`${context.apiUrl}/orders`, {
        headers: {
          Authorization: "Bearer " + jwtToken
        }
      })
      .then(response => {
        orders = response.data;
      })
      .catch(error => {
        // Handle error.
        console.log("An error occurred:", error);
      });
  }

  // graphql
  const GETTODO = gql`
    {
      orders {
        id
        firstName
      }
    }
  `;

  onMount(() => {
    // Prevent a visual bug with WOW
    document.querySelector('.wow').style.visibility = 'visible';

    const URL = `${context.apiUrl}/graphql`;

    const client = new ApolloClient({
      uri: URL,

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
  });

  function fetchGraphqlOrders() {
    client
      .query({
        query: GETTODO
      })
      .then(response => {
        orders = response.data.orders;
      });
  }
</script>

<svelte:head>
  <title>Plateforme CO2 - Energy Module</title>
</svelte:head>

<!--Grid row-->
<div class="row wow fadeIn" style="visibility:hidden">

  <!--Grid column-->
  <div class="col-md-6">

    <!--Card-->
    <div class="card">

      <!-- Card header -->
      <div class="card-header" />

      <!--Card content-->
      <div class="card-body">
        {#if user}
          Welcome "{user.email}" with role "{user.role.name}"
          <div>
            <button on:click={fetchGraphqlOrders}>
              Fetch order via GraphQL
            </button>
          </div>
          <div>
            <button on:click={fetchOrders}>Fetch order via REST</button>
          </div>

          <ul>
            {#each orders as order}
              <li>{order.firstName}</li>
            {/each}
          </ul>
        {:else if $page.query.action === 'register'}
          <RegisterForm />
        {:else}
          <LoginForm />
        {/if}

        <LogoutForm />
      </div>

    </div>
    <!--/.Card-->

  </div>
  <!--Grid column-->

</div>
<!--Grid row-->
