<script>
    import axios from 'axios';
    import Cookies from "js-cookie";
    import {onMount} from 'svelte';
    import ApolloClient from 'apollo-boost';
    import gql from 'graphql-tag';


    // Request API.
    // Add your own code here to customize or restrict how the public can register new users.
    // axios
    //         .post('http://localhost:1337/auth/local/register', {
    //             username: 'Strapi user',
    //             email: 'user@strapi.io',
    //             password: 'strapiPassword',
    //         })
    //         .then(response => {
    //             // Handle success.
    //             console.log('Well done!');
    //             console.log('User profile', response.data.user);
    //             console.log('User token', response.data.jwt);
    //         })
    //         .catch(error => {
    //             // Handle error.
    //             console.log('An error occurred:', error);
    //         });
    // Request API.

    function handleAuthenticate() {
        axios
                .post('http://localhost:1337/auth/local', {
                    identifier: 'user@strapi.io',
                    password: 'strapiPassword',
                })
                .then(response => {

                    user = response.data.user
                    jwtToken = response.data.jwt

                    Cookies.set("user", user);
                    Cookies.set("jwt", jwtToken);
                })
                .catch(error => {
                    // Handle error.
                    console.log('An error occurred:', error);
                });
    }

    function fetchOrders() {
        axios
                .get('http://localhost:1337/orders', {
                    headers: {
                        Authorization: "Bearer " + jwtToken
                    }
                })
                .then(response => {
                    orders = response.data
                })
                .catch(error => {
                    // Handle error.
                    console.log('An error occurred:', error);
                });
    }

    export let orders = [];
    export let user = null;
    export let jwtToken = '';

    if (Cookies.get('user') && Cookies.get('jwt')) {
        user = Cookies.get('user')
        jwtToken = Cookies.get('jwt')
    }

    // graphql
    const GETTODO = gql`
    {
      orders {
        id,
        firstName
      }
    }
  `;

    onMount(() => {

        const URL = 'http://localhost:1337/graphql';

        const client = new ApolloClient({
            uri: URL,

            request: operation => {
                operation.setContext({
                    headers: {
                        "Authorization": "Bearer " + Cookies.get('jwt')
                    },
                });
            },
            onError: ({ networkError, graphQLErrors }) => {
                console.log("graphQLErrors", graphQLErrors);
                console.log("networkError", networkError);
            }
        });

        client.query({
            query: GETTODO
        }).then(response => {
            orders = response.data.orders;
        });
    });

    function fetchGraphqlOrders() {
        console.log(123)
    }

</script>

<svelte:head>
    <title>Energy Module</title>
</svelte:head>

<!--Grid row-->
<div class="row wow fadeIn">

    <!--Grid column-->
    <div class="col-md-6 mb-4">

        <!--Card-->
        <div class="card">

            <!-- Card header -->
            <div class="card-header"></div>

            <!--Card content-->
            <div class="card-body">
                Work in progress again again...

                {#if user}
                    I am in... {user.email}


                    <div>
                        <button on:click={fetchGraphqlOrders}>Fetch order via GraphQL</button>
                    </div>
                    <div>
                        <button on:click={fetchOrders}>Fetch order via REST</button>
                    </div>

                    <ul>
                        {#each orders as order}
                            <li>{order.firstName}</li>
                        {/each}
                    </ul>

                {:else}

                    <button on:click={handleAuthenticate}>Log me!</button>

                {/if}
            </div>

        </div>
        <!--/.Card-->

    </div>
    <!--Grid column-->

</div>
<!--Grid row-->
