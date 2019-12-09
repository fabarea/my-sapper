<script>
  import { _ } from "svelte-i18n";
  import Cookies from "js-cookie";
  import { getContext } from "svelte";
  import { userStore } from "../../stores";

  // Initialize the store variable
  // $: ({user} = $userStore);
  $: user = $userStore;

  // Segment is retrieved from the context
  const context = getContext("context");
  let { jwtToken } = context;

  /**
   * Logout the user
   */
  function logout() {
    userStore.set(null)
    jwtToken = null;
    Cookies.set("user", null);
    Cookies.set("jwt", null);
  }
</script>

{#if user}
  <div>
    <button type="button" class="btn btn-light" on:click={logout}>
      {$_('login.actions.logout')}
    </button>
  </div>
{/if}
