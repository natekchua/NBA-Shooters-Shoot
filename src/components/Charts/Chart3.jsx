import React from 'react';
import { Bar } from 'react-chartjs-2';

import './chart.css';

const chartOptions = {
  title: {
    display: true,
    text: 'Efficient Shooting Small Forwards from the Field in the 2020 NBA Season',
    fontSize: 25,
    fontColor: 'white',

  },
  legend: {
    display: true,
    position: 'right',
    labels: {
      fontColor: 'white'
     }
  },
  maintainAspectRatio: false,
  scales: {
    yAxes: [{
      ticks: {
        fontColor: 'white'
    },
    }],
    xAxes: [{
      ticks: {
        fontColor: 'white'
      },
    }]
  } 
}

function Chart3 (props) {
  const { dataset } = props;
  let testSubset3, playerLabels3, chartData3;
  const xAxisLabels = ['FG Made', 'FG Attempted', 'FG%'];

  if (dataset) {
    // Efficient Shooting SFs from the Field
    testSubset3 = dataset.filter(p => p.Pos === 'SF' && p.FGPct >= 0.50 && p.FGA > 5);
    playerLabels3 = testSubset3.map(p => p.Player);

    chartData3 = {
      labels: xAxisLabels,
      datasets: testSubset3.map(fp => [fp.FG, fp.FGA, fp.FGPct]).map((stat, idx) => {
        return {
          label: playerLabels3[idx],
          // Random color generator: https://css-tricks.com/snippets/javascript/random-hex-color/
          backgroundColor: `#${Math.floor(Math.random()*16777215).toString(16)}`,
          data: stat
        }
      })
    };
  }

  console.log(chartData3)

  return (
    <div className='page-container chart-bg'>
      <div className='chart-container'>
        <Bar
          data={chartData3}
          width={1600}
          height={800}
          options={chartOptions}
        />
      </div>
    </div>
  );
}

export default Chart3;
