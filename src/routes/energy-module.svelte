<script>
    import axios from 'axios';
    import Cookies from "js-cookie";
    import {onMount} from 'svelte';
    import ApolloClient from 'apollo-boost';
    import gql from 'graphql-tag';
    import config from '../config';
    import { _ } from 'svelte-i18n'


    // Request API.
    // Add your own code here to customize or restrict how the public can register new users.
    // axios
    //         .post('${config.apiUrl}/auth/local/register', {
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


    export let orders = [];
    export let user = null;
    export let jwtToken = '';
    export let loginError = 0;
    export let username = ''

    function handleAuthenticate() {
        loginError = 0
        axios
                .post(`${config.apiUrl}/auth/local`, {
                    identifier: 'user@strapi.io',
                    password: 'strapiPassword1',
                })
                .then(response => {

                    if (response.data.user) {
                        user = response.data.user
                        jwtToken = response.data.jwt

                        Cookies.set("user", user);
                        Cookies.set("jwt", jwtToken);
                    }
                })
                .catch(error => {
                    // Handle error.
                    loginError = error.response.status
                    console.log('An error occurred:', error);
                });
    }

    function fetchOrders() {
        axios
                .get(`${config.apiUrl}/orders`, {
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

    if (Cookies.get('user') && Cookies.get('jwt')) {
        user = JSON.parse(Cookies.get('user'))
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
        const URL = `${config.apiUrl}/graphql`;

        const client = new ApolloClient({
            uri: URL,

            request: operation => {
                operation.setContext({
                    headers: {
                        "Authorization": "Bearer " + Cookies.get('jwt')
                    },
                });
            },
            onError: ({networkError, graphQLErrors}) => {
                console.log("graphQLErrors", graphQLErrors);
                console.log("networkError", networkError);
            }
        });


    });

    function fetchGraphqlOrders() {
        client.query({
            query: GETTODO
        }).then(response => {
            orders = response.data.orders;
        });
    }

    /**
     * Logout the user
     */
    function logout() {
        user = jwtToken = null;
        Cookies.set('user', null)
        Cookies.set('jwt', null)
    }

</script>

<svelte:head>
    <title>Plateforme CO2 - Energy Module</title>
</svelte:head>

<!--Grid row-->
<div class="row wow fadeIn">

    <!--Grid column-->
    <div class="col-md-6 mb-4">

        <!--Card-->
        <div class="card">

            <!-- Card header -->
            <div class="card-header"></div>

            <h1>{$_('messages.success', { default: 'Great success!' })}</h1>

            <!--Card content-->
            <div class="card-body">
                Welcome stranger!
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
                    <form on:submit|preventDefault={handleAuthenticate}>


                        <div class="row text-left">

                            <!--Grid column-->
                            <div class="col-md-6 mb-4">

                                <!--Email validation-->
                                <div class="md-form">
                                    <i class="fas fa-envelope prefix"></i>
                                    <input type="text" bind:value="{username}" id="username" class="form-control validate">
                                    <label for="username" data-error="wrong" data-success="right" class="">Type your
                                        username</label>
                                </div>

                            </div>
                            <!--Grid column-->

                            <!--Grid column-->
                            <div class="col-md-6 mb-4">

                                <!--Password validation-->
                                <div class="md-form">
                                    <i class="fas fa-lock prefix"></i>
                                    <input type="password" id="form10" class="form-control validate">
                                    <label for="form10" data-error="wrong" data-success="right" class="">Type your
                                        password</label>
                                </div>

                            </div>
                            <!--Grid column-->

                        </div>

                        <button type="submit" class="btn btn-primary">Log me in</button>

                    </form>
                {/if}

                {#if loginError === 400}
                    <div class="alert alert-danger" role="alert">
                        Wrong password or username!
                    </div>
                {/if}

                {#if user}
                    <div>
                        <button type="button" class="btn btn-light" on:click={logout}>Logout</button>
                    </div>
                {/if}
            </div>

        </div>
        <!--/.Card-->

    </div>
    <!--Grid column-->

</div>
<!--Grid row-->
