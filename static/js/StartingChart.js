window.startingChart=function startingChart(){
    new Chart(document.getElementById("myChart"), {
    type: 'bar',
    data: {
      labels: ["Temp1", "Temp2", "Temp3", "Temp4", "Temp5"],
      datasets: [
        {
          label: "Enter a search query above to get live data from sites",
          backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850"],
          data: [2478,5267,734,784,433]
        }
      ]
    },
    options: {
        animations: {
            backgroundColor: {
              type:'color',
              duration: 2000,
              easing: 'linear',
              from: 'rgba(241, 169, 209,0.8)',
              to: 'rgba(250, 186, 77, 0.5)',
              loop: true,
              easing:'linear'
            }
            },
      legend: { display: false },
      title: {
        display: true,
        text: 'Predicted world population (millions) in 2050'
      }
    }
});
document.getElementById('myChart').setAttribute('class','canvasD')
}