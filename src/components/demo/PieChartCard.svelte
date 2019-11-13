<script>
    import { onMount } from 'svelte';

    onMount(() => {

        //pie
        var ctxP = document.getElementById("pieChart").getContext('2d');
        var myPieChart = new Chart(ctxP, {
            type: 'pie',
            data: {
                labels: ["Red", "Green", "Yellow", "Grey", "Dark Grey"],
                datasets: [{
                    data: [300, 50, 100, 40, 120],
                    backgroundColor: ["#F7464A", "#46BFBD", "#FDB45C", "#949FB1", "#4D5360"],
                    hoverBackgroundColor: ["#FF5A5E", "#5AD3D1", "#FFC870", "#A8B3C5", "#616774"]
                }]
            },
            options: {
                responsive: true,
                legend: false
            }
        });
    });


</script>
<!--Card-->
<div class="card mb-4">

    <!-- Card header -->
    <div class="card-header text-center">
        Pie chart
    </div>

    <!--Card content-->
    <div class="card-body">

        <canvas id="pieChart"></canvas>

    </div>

</div>
<!--/.Card-->
