<script>
  import Nav from "../components/Nav.svelte";
  import Logo from "../components/Logo.svelte";
  import LanguageNavigation from "../components/LanguageNavigation.svelte";
  import Breadcrumb from "../components/Breadcrumb.svelte";
  import Footer from "../components/Footer.svelte";
  import { setContext } from "svelte";

  setContext("context", {
    apiUrl: "https://api.plateformeco2.ch", // http://localhost:1337
  });

  export let segment;
</script>

<!--Double navigation-->
<header>
  <!-- Sidebar navigation -->
  <div id="slide-out" class="side-nav fixed white overflow-auto">

    <Logo />

    <div class="list-group list-group-flush">
      <Nav {segment} />
    </div>

  </div>
  <!--/. Sidebar navigation -->

  <!-- Navbar -->
  <nav class="navbar fixed-top navbar-toggleable-md navbar-expand-lg scrolling-navbar double-nav white">
    <!-- SideNav slide-out button -->
    <div class="float-left">
      <a href="/" data-activates="slide-out" class="button-collapse black-text">
        <i class="fas fa-bars"></i>
      </a>
    </div>

    <!-- Brand -->
    <a class="navbar-brand waves-effect pl-2" href="/" style="font-size: 1.25rem;">
      <strong class="blue-text">Climate Services</strong>
    </a>

    <!-- Links -->
    <div class="ml-auto">
      <LanguageNavigation {segment} />
    </div>

  </nav>
  <!-- /.Navbar -->
</header>

<!--Main layout-->
<main class="pt-5 mx-lg-5">
  <div class="container-fluid mt-5">

    <!-- Heading -->
    <div class="card mb-4">

      <!--Card content-->
      <div class="card-body d-sm-flex justify-content-between">
        <Breadcrumb {segment} />
      </div>
      <!-- Material unchecked -->
      <slot />
    </div>
    <!-- Heading -->

  </div>
</main>
<!--Main layout-->

<!--Footer-->
<footer class="page-footer text-center font-small primary-color-dark darken-2 mt-4
  wow fadeIn">
  <!-- <SocialMediaCard/>-->
  <Footer />
</footer>
<!--/.Footer-->
