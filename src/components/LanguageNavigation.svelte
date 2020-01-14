<script>
  import { _, locale, locales } from "svelte-i18n";
  import Cookies from "js-cookie";

  export let segment;
</script>

<!-- Right position -->
<ul class="navbar-nav nav-flex-icons">

  <li>
    <a id="navbar-static-signin"
       href="/"
       class="btn btn-info btn-sm align-self-center ml-2 auth-modal-toggle waves-effect waves-light"
       data-auth-modal-tab="sign-in">Sign In</a>
    <a id="navbar-static-login"
       href="/"
       class="btn btn-sm waves-effect waves-light auth-modal-toggle black-text"
       data-auth-modal-tab="sign-up">Sign up</a>
  </li>
  <!-- Dropdown -->
  <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle"
           href="/"
           id="navbarDropdownMenuLink"
           data-toggle="dropdown"
           aria-haspopup="true"
           aria-expanded="false">
          <img alt="user avatar"
               src="https://secure.gravatar.com/avatar/5952270d22f0364d0a8dc70a98b268ef?s=24&amp;d=mm&amp;r=g"
               srcset="https://secure.gravatar.com/avatar/5952270d22f0364d0a8dc70a98b268ef?s=48&amp;d=mm&amp;r=g 2x"
               class="avatar avatar-24 photo rounded-circle z-depth-0" height="24" width="24">
        </a>
        <div class="dropdown-menu dropdown-primary" aria-labelledby="navbarDropdownMenuLink">
          <a class="dropdown-item" href="/">Profile</a>
          <a class="dropdown-item" href="/">Logout</a>
        </div>
      </li>

  {#each $locales as item}
    <li class="nav-item">
      <a
        class="nav-link waves-effect black-text"
        class:selected={$locale.includes(item)}
        href={`${segment}#language=${item}`}
        on:click={() => {
          $locale = item;
          Cookies.set('language', item, { expires: 1, sameSite: true});
        }}>
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
