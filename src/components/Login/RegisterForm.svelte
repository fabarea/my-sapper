<script>
  import axios from "axios";
  import {stores} from "@sapper/app";
  import {_} from "svelte-i18n";
  import Cookies from "js-cookie";
  import { getContext } from "svelte";

  // Get page from the store. It should be called with $page
  const {page} = stores();

  // Retrieve the context
  const context = getContext("context");

  export let loginError = 0;
  export let username = "";
  export let password = "";

  import {userStore} from "../../stores";

  $: user = $userStore;


  // Request API.
  // Add your own code here to customize or restrict how the public can register new users.
  // axios
  //         .post('${context.apiUrl}/auth/local/register', {
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

  /**
   * Authenticate a user against Strapi API.
   */
  async function handleCreateAccount() {
    // temporary
    const _username = username ? username : "user@strapi.io";
    const _password = password ? password : "strapiPassword";

    axios
    .post(`${context.apiUrl}/auth/local`, {
      identifier: _username,
      password: _password
    })
    .then(response => {
      if (response.data.user) {
        let user = response.data.user;
        let jwtToken = response.data.jwt;

        // Reactive store
        userStore.set(response.data.user);

        // Persist data in a cookie which is more secure than the localStorage
        Cookies.set("user", user);
        Cookies.set("jwt", jwtToken);
      }
    })
    .catch(error => {
      // Handle error.
      loginError = error.response.status;
      if (loginError === 400) {
        console.log("An error occurred: wrong credentials");
      } else {
        console.log("An error occurred:", error);
      }
    });
  }
</script>

<h1>{$_('login.labels.newAccountHeader')}</h1>

<form on:submit|preventDefault={handleCreateAccount}>

  <div class="md-form form-sm">
    <i class="fas prefix"></i>
    <input type="text" id="firstName" class="form-control">
    <label for="firstName">Prénom</label>
  </div>

  <div class="md-form form-sm">
    <i class="fas prefix"></i>
    <input type="text" id="lastName" class="form-control">
    <label for="lastName">Nom</label>
  </div>

  <div class="md-form form-sm">
    <i class="fas fa-envelope prefix"></i>
    <input type="text" id="email" class="form-control">
    <label for="email">Your email</label>
  </div>

  <div class="md-form form-sm">
    <i class="fas fa-lock prefix"></i>
    <input type="password" id="password" class="form-control">
    <label for="password">Your password</label>
  </div>

  <div class="md-form form-sm">
    <i class="fas fa-lock prefix"></i>
    <input type="password" id="passwordRepeated" class="form-control">
    <label for="passwordRepeated">Repeat password</label>
  </div>

  <div class="text-center form-sm mt-2">
    <button type="submit" class="btn btn-primary">
      {$_('login.actions.createAccount')} <i class="fas fa-sign-in-alt ml-1"></i>
    </button>
  </div>

  {#if loginError === 400}
    <div class="alert alert-danger" role="alert">
      {$_('login.messages.errors.badCredentials')}
    </div>
  {/if}


  Vous allez recevoir un courriel avec un lien de validation.

</form>


<h2 class="mt-4">Déjà un compte?</h2>

<div>
  <a href={`${$page.path}`} class="btn btn-default">
    {$_('login.actions.showLoginForm')}
  </a>
</div>

