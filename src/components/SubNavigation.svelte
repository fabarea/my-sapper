<script>
  export let segment;
</script>

<!-- Left -->
<ul class="navbar-nav mr-auto">
  <li class="nav-item active">
    <a class="nav-link waves-effect" href="/co2-footprint/">
      CO2 Footprint
      {#if segment === undefined}
        <span class="sr-only">(current)</span>
      {/if}
    </a>
  </li>
  <li class="nav-item">
    <a class="nav-link waves-effect" href="/references/">References</a>
  </li>
  <li class="nav-item">
    <a class="nav-link waves-effect" href="/about/">About</a>
  </li>
</ul>
