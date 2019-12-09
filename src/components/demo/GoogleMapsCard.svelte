<script>
  import { onMount } from "svelte";

  onMount(() => {
    // Regular map
    function regular_map() {
      var var_location = new google.maps.LatLng(40.725118, -73.997699);

      var var_mapoptions = {
        center: var_location,
        zoom: 14
      };

      var var_map = new google.maps.Map(
        document.getElementById("map-container"),
        var_mapoptions
      );

      var var_marker = new google.maps.Marker({
        position: var_location,
        map: var_map,
        title: "New York"
      });
    }

    // Initialize maps
    // google.maps.event.addDomListener(window, 'load', regular_map);
  });
</script>

<!--Card-->
<div class="card">

  <!-- Card header -->
  <div class="card-header">Google map</div>

  <!--Card content-->
  <div class="card-body">

    <!--Google map-->
    <div id="map-container" class="map-container" style="height: 500px">
      <iframe
        src="https://maps.google.com/maps?q=manhatan&t=&z=13&ie=UTF8&iwloc=&output=embed"
        title="Google Maps"
        frameborder="0"
        style="border:0"
        allowfullscreen />
    </div>

  </div>

</div>
<!--/.Card-->
