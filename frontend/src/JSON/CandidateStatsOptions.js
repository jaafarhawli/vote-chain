export const candidateStatsOptions = {
    scales: {
        y: {
          grid: {
            display: false
          },
        },
        x: {
          grid: {
            display: false
          },
        },
      },       
      elements: {
        bar: {
          borderWidth: 2,
        },
      },
      plugins: {
        legend: {
          position: 'right',
        },
        title: {
          display: true,
          text: 'Top Candidates',
        },
      }
}