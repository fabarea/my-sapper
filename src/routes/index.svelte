<script>
  // Demo components
  import ModalCard from "../components/demo/ModalCard.svelte";
  import TableCard from "../components/demo/TableCard.svelte";
  import GoogleMapsCard from "../components/demo/GoogleMapsCard.svelte";
  import PieChartCard from "../components/demo/PieChartCard.svelte";
  import LineChartCard from "../components/demo/LineChartCard.svelte";
  import BadgeCard from "../components/demo/BadgeCard.svelte";
  import RadarChartCard from "../components/demo/RadarChartCard.svelte";
  import BarChartCard from "../components/demo/BarChartCard.svelte";
  import HorizontalBarChartCard from "../components/demo/HorizontalBarChartCard.svelte";
  import DoughnutChartCard from "../components/demo/DoughnutChartCard.svelte";
</script>

<svelte:head>
  <title>Plateforme CO2</title>
</svelte:head>

<!--Grid row-->
<div class="row wow fadeIn">

  <!--Grid column-->
  <div class="col-md-9 mb-4">
    <BarChartCard />
  </div>
  <!--Grid column-->

  <!--Grid column-->
  <div class="col-md-3 mb-4">

    <PieChartCard />
    <BadgeCard />

  </div>
  <!--Grid column-->

</div>
<!--Grid row-->

<!--Grid row-->
<div class="row wow fadeIn">

  <!--Grid column-->
  <div class="col-md-6 mb-4">
    <TableCard color={'blue-grey'} />
  </div>
  <!--Grid column-->

  <!--Grid column-->
  <div class="col-md-6 mb-4">
    <TableCard color={'blue'} />
  </div>
  <!--Grid column-->

</div>
<!--Grid row-->

<!--Grid row-->
<div class="row wow fadeIn">

  <!--Grid column-->
  <div class="col-lg-6 col-md-6 mb-4">
    <LineChartCard />
  </div>
  <!--Grid column-->

  <!--Grid column-->
  <div class="col-lg-6 col-md-6 mb-4">
    <RadarChartCard />
  </div>
  <!--Grid column-->

  <!--Grid column-->
  <div class="col-lg-6 col-md-6 mb-4">

    <DoughnutChartCard />

  </div>
  <!--Grid column-->

  <!--Grid column-->
  <div class="col-lg-6 col-md-6 mb-4">

    <HorizontalBarChartCard />
  </div>
  <!--Grid column-->
</div>
<!--Grid row-->

<!--Grid row-->
<div class="row wow fadeIn">

  <!--Grid column-->
  <div class="col-md-6 mb-4">
    <GoogleMapsCard />
  </div>
  <!--Grid column-->

  <!--Grid column-->
  <div class="col-md-6 mb-4">
    <ModalCard />
  </div>
  <!--Grid column-->
</div>
<!--Grid row-->
