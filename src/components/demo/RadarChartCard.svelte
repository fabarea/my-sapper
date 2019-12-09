<script>
  import { onMount } from "svelte";

  onMount(() => {
    //radar
    var ctxR = document.getElementById("radarChart").getContext("2d");
    var myRadarChart = new Chart(ctxR, {
      type: "radar",
      data: {
        labels: [
          "Eating",
          "Drinking",
          "Sleeping",
          "Designing",
          "Coding",
          "Cycling",
          "Running"
        ],
        datasets: [
          {
            label: "My First dataset",
            data: [65, 59, 90, 81, 56, 55, 40],
            backgroundColor: ["rgba(105, 0, 132, .2)"],
            borderColor: ["rgba(200, 99, 132, .7)"],
            borderWidth: 2
          },
          {
            label: "My Second dataset",
            data: [28, 48, 40, 19, 96, 27, 100],
            backgroundColor: ["rgba(0, 250, 220, .2)"],
            borderColor: ["rgba(0, 213, 132, .7)"],
            borderWidth: 2
          }
        ]
      },
      options: {
        responsive: true
      }
    });
  });
</script>

<!--Card-->
<div class="card">

  <!-- Card header -->
  <div class="card-header">Radar Chart</div>

  <!--Card content-->
  <div class="card-body">

    <canvas id="radarChart" />

  </div>

</div>
<!--/.Card-->
