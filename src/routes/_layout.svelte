<script>
  import Nav from "../components/Nav.svelte";
  import Logo from "../components/Logo.svelte";
  import SubNavigation from "../components/SubNavigation.svelte";
  import LanguageNavigation from "../components/LanguageNavigation.svelte";
  import Breadcrumb from "../components/Breadcrumb.svelte";
  import Footer from "../components/Footer.svelte";

  export let segment;
</script>

<div class="container-for-admin">
  <!--Main Navigation-->
  <header>

    <!-- Navbar -->
    <nav
      class="navbar fixed-top navbar-expand-lg navbar-light white
      scrolling-navbar">
      <div class="container-fluid">

        <!-- Brand -->
        <a class="navbar-brand waves-effect" href="/">
          <strong class="blue-text">Climate Services</strong>
        </a>

        <!-- Collapse -->
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation">
          <span class="navbar-toggler-icon" />
        </button>

        <!-- Links -->
        <div class="collapse navbar-collapse" id="navbarSupportedContent">

          <SubNavigation {segment} />

          <LanguageNavigation {segment} />

        </div>

      </div>
    </nav>
    <!-- Navbar -->

    <!-- Sidebar -->
    <div class="sidebar-fixed position-fixed">

      <Logo />

      <div class="list-group list-group-flush">
        <Nav {segment} />
      </div>

    </div>
    <!-- Sidebar -->

  </header>
  <!--Main Navigation-->

  <!--Main layout-->
  <main class="pt-5 mx-lg-5">
    <div class="container-fluid mt-5">

      <!-- Heading -->
      <div class="card mb-4 wow fadeIn">

        <!--Card content-->
        <div class="card-body d-sm-flex justify-content-between">
          <Breadcrumb />
        </div>

        <slot />
      </div>
      <!-- Heading -->

    </div>
  </main>
  <!--Main layout-->

  <!--Footer-->
  <footer
    class="page-footer text-center font-small primary-color-dark darken-2 mt-4
    wow fadeIn">
    <!-- <SocialMediaCard/>-->
    <Footer />
  </footer>
  <!--/.Footer-->
</div>
