fetch('https://api.umd.io/v0/bus/routes')
  .then(response => response.json())
  .then(data => {
    // Process the data using array methods
    const processedData = data.map(item => {
      return {
        label: item.name,
        value: item.count
      };
    });
    
    // Render the chart using Charts.js
    const chartData = {
      labels: processedData.map(item => item.label),
      datasets: [
        {
          label: 'Data Set',
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1,
          data: processedData.map(item => item.value)
        }
      ]
    };

    const chartOptions = {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    };

    const chart = new Chart(document.getElementById('myChart'), {
      type: 'bar',
      data: chartData,
      options: chartOptions
    });
  })
  .catch(error => console.error(error));


