<script>
  import { onMount } from "svelte";
  import { getClient} from 'svelte-apollo';
  import { _ } from "svelte-i18n";
  import { stores } from "@sapper/app";
  import { userStore } from "../stores";
  import LoginForm from "../components/Login/LoginForm.svelte";
  import RegisterForm from "../components/Login/RegisterForm.svelte";
  import LogoutForm from "../components/Login/LogoutForm.svelte";
  import {GET_ORGANIZATIONS} from "../queries/organization";

  // Get page from the store. It should be called with $page
  const { page } = stores();

  // Define a reactive "user"
  $: user = $userStore;

  // 2. Get the Apollo client from context
  const client = getClient();

  // Local reactive props
  let organizations = [];

  /**
   *
   */
  function fetchGraphqlOrders() {
    client
      .query({
        query: GET_ORGANIZATIONS
      })
      .then(response => {
        organizations = response.data.organizations;
      });
  }

  // lifecycle: onMount
  onMount(() => {
    // Prevent a visual bug with WOW
    document.querySelector('.wow').style.visibility = 'visible';
  });
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
              Fetch organization via GraphQL
            </button>
          </div>

          <ul>
            {#each organizations as organization}
              <li>{organization.name}</li>
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
