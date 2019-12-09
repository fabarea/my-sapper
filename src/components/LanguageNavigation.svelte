<script>
  import { _, locale, locales } from "svelte-i18n";
  export let segment;
</script>

<!-- Right position -->
<ul class="navbar-nav nav-flex-icons">

  {#each $locales as item}
    <li class="nav-item">
      <a
        class="nav-link waves-effect"
        class:selected={$locale.includes(item)}
        href={`${segment}#!${item}`}
        on:click={() => ($locale = item)}>
        {$_(`languages.${item}`)}
      </a>
    </li>
  {/each}

  <!--    <li class="nav-item">-->
  <!--        <a href="https://github.com/mdbootstrap/bootstrap-material-design"-->
  <!--           class="nav-link border border-light rounded waves-effect"-->
  <!--           >-->
  <!--            <i class="fab fa-github mr-2"></i>MDB GitHub-->
  <!--        </a>-->
  <!--    </li>-->
</ul>
