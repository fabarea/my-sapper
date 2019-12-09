<script>
  export let status;
  export let error;

  const dev = process.env.NODE_ENV === "development";
</script>

<style>
  h1,
  p {
    margin: 0 auto;
  }

  h1 {
    font-size: 2.8em;
    font-weight: 700;
    margin: 0 0 0.5em 0;
  }

  p {
    margin: 1em auto;
  }

  @media (min-width: 480px) {
    h1 {
      font-size: 4em;
    }
  }
</style>

<svelte:head>
  <title>{status}</title>
</svelte:head>

<!--Grid row-->
<div class="row wow fadeIn">

  <!--Grid column-->
  <div class="col-md-12 mb-4">

    <!-- Card header -->
    <div class="card-header">
      <strong>Erreur {status}</strong>
    </div>

    <!--Card content-->
    <div class="card-body">

      {#if status === 404}Page non trouvée{/if}

      {#if dev && error.stack}
        <pre>{error.stack}</pre>
      {/if}

    </div>

  </div>
  <!--Grid column-->

</div>
<!--Grid row-->
