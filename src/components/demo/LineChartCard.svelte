<script>
  import { onMount } from "svelte";

  onMount(() => {
    //line
    var ctxL = document.getElementById("lineChart").getContext("2d");
    var myLineChart = new Chart(ctxL, {
      type: "line",
      data: {
        labels: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July"
        ],
        datasets: [
          {
            label: "My First dataset",
            backgroundColor: ["rgba(105, 0, 132, .2)"],
            borderColor: ["rgba(200, 99, 132, .7)"],
            borderWidth: 2,
            data: [65, 59, 80, 81, 56, 55, 40]
          },
          {
            label: "My Second dataset",
            backgroundColor: ["rgba(0, 137, 132, .2)"],
            borderColor: ["rgba(0, 10, 130, .7)"],
            data: [28, 48, 40, 19, 86, 27, 90]
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
  <div class="card-header">Line chart</div>

  <!--Card content-->
  <div class="card-body">
    <canvas id="lineChart" />
  </div>

</div>
<!--/.Card-->
