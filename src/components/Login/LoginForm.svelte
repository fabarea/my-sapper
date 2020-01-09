<script>
  import axios from "axios";
  import { getContext } from "svelte";
  import { stores } from "@sapper/app";
  import { _ } from "svelte-i18n";
  import Cookies from "js-cookie";
  import { userStore } from "../../stores";

  // Get page from the store. It should be called with $page
  const { page } = stores();

  // Retrieve the context
  const context = getContext("context")

  export let loginError = 0;
  export let username = "";
  export let password = "";

  /**
   * Authenticate a user against Strapi API.
   */
  async function handleAuthenticate() {
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
          Cookies.set("user", user, { expires: 1, sameSite: true});
          Cookies.set("jwt", jwtToken, { expires: 1, sameSite: true}); // secure: true
        }
      })
      .catch(error => {
        // Handle error.
        if (error && error.response && error.response.status === 400) {
          console.log("An error occurred: wrong credentials");
        } else {
          console.log("An error occurred:", error);
        }
      });
  }
</script>

<h1>{$_('login.labels.loginHeader')}</h1>

<form on:submit|preventDefault={handleAuthenticate}>

  <div class="row text-left">

    <!--Grid column-->
    <div class="col-md-6">

      <!--Email validation-->
      <div class="md-form">
        <i class="fas fa-user-tie prefix" />
        <input
          type="text"
          bind:value={username}
          id="username"
          class="form-control validate" />
        <label for="username">{$_('login.actions.typeUsername')}</label>
      </div>

    </div>
    <!--Grid column-->

    <!--Grid column-->
    <div class="col-md-6">

      <!--Password validation-->
      <div class="md-form">
        <i class="fas fa-lock prefix" />
        <input
          type="password"
          id="password"
          bind:value={password}
          class="form-control validate" />
        <label for="password">{$_('login.actions.typePassword')}</label>
      </div>

    </div>
    <!--Grid column-->
  </div>

  {#if loginError === 400}
    <div class="alert alert-danger" role="alert">
      {$_('login.messages.errors.badCredentials')}
    </div>
  {/if}

  <div>
    <button type="submit" class="btn btn-primary">
      {$_('login.actions.authenticate')}
    </button>
  </div>

</form>

<h2 class="mt-4">Pas encore de compte?</h2>
Voici une bonne occasion de créer un nouveau compte sur notre plateforme. Un
compte vous permets de saisir des données et d'accéder à votre bilan CO2.
<a href={`${$page.path}?action=register`} class="btn btn-default">
  {$_('login.actions.showRegisterForm')}
</a>
