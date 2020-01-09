<script>
  import {userStore} from "../stores";

  // default value
  let hidden = false;

  // If store changes, we must react... It will be called upon store change + initialization
  userStore.subscribe(user => {
    hidden = !(user && user.role.name === 'Admin')
  })
</script>

<style>
  .hidden {
    display: none
  }
</style>

<div class="list-group-item active">Data entry</div>

<a href="/footprint/"
   class="list-group-item list-group-item-action waves-effect">
  <i class="far fa-list-alt mr-3" />
  <strong>Footprint form</strong>
</a>

<a href="/energy-module/"
   class="list-group-item list-group-item-action waves-effect">
  <i class="fas fa-recycle mr-3" />
  <strong>Energy module</strong>
</a>

<a href="/access-rights/"
   class="list-group-item list-group-item-action waves-effect">
  <i class="fas fa-walking mr-3" />
  Manage access rights
</a>

<a href="/data-collection-tools/"
   class="list-group-item list-group-item-action waves-effect">
  <i class="fas fa-tools mr-3" />
  Data collection tools
</a>

<a href="/demo-api/"
   class="list-group-item list-group-item-action waves-effect">
  <i class="fas fa-tools mr-3" />
  <strong>API demo</strong>
</a>

<!-- Footprint Interpretation -->
<div class="list-group-item active mt-4">Footprint Interpretation</div>

<a href="/graphs-and-tables/"
   class="list-group-item list-group-item-action waves-effect">
  <i class="fas fa-chart-bar mr-3" />
  Graphs and tables
</a>
<a href="/simulations/"
   class="list-group-item list-group-item-action waves-effect">
  <i class="fas fa-project-diagram mr-3" />
  Simulations
</a>


<!-- Admin -->
<div class:hidden class="list-group-item active mt-4">Admin</div>

<a href="/indicator/"
   class:hidden
   class="list-group-item list-group-item-action waves-effect">
  <i class="fas fa-user-cog mr-3" />
  Indicator
</a>

<a href="/model/"
   class:hidden
   class="list-group-item list-group-item-action waves-effect">
  <i class="fas fa-user-cog mr-3" />
  Model
</a>
<a href="/user-administration/"
   class:hidden
   class="list-group-item list-group-item-action waves-effect">
  <i class="fas fa-user-cog mr-3" />
  <strong>User administration</strong>
</a>

<a href="/entreprises/"
   class:hidden
   class="list-group-item list-group-item-action waves-effect">
  <i class="fas fa-user-cog mr-3" />
  Entreprises
</a>

<a href="/scope/"
   class:hidden
   class="list-group-item list-group-item-action waves-effect">
  <i class="fas fa-user-cog mr-3" />
  Scope
</a>
<a href="/partners/"
   class:hidden
   class="list-group-item list-group-item-action waves-effect">
  <i class="fas fa-user-cog mr-3" />
  Partners
</a>
<!--<nav>-->
<!--	<ul>-->
<!--		<li><a class='{segment === undefined ? "selected" : ""}' href='.'>home
</a></li>-->
<!--		<li><a class='{segment === "items" ? "selected" : ""}' href='items'>Items
</a></li>-->
<!--		<li><a class='{segment === "about" ? "selected" : ""}' href='about'>about
</a></li>-->

<!--		&lt;!&ndash; for the blog link, we're using rel=prefetch so that Sapper prefetches-->
<!--		     the blog data when we hover over the link or tap it on a touchscreen &ndash;&gt;-->
<!--		<li><a rel=prefetch class='{segment === "blog" ? "selected" : ""}' href='blog'>blog
</a></li>-->
<!--	</ul>-->
<!--</nav>-->
