import React from 'react';
import { Bar } from 'react-chartjs-2';

import './chart.css';

const chartOptions = {
  title: {
    display: true,
    text: 'Efficient 3 Point Shooting Guards in the 2020 NBA Season',
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

function Chart1 (props) {
  const { dataset } = props;
  let testSubset1, playerLabels1, chartData1;
  const xAxisLabels = ['3P Made', '3P Attempted', '3P%'];

  if (dataset) {
    // Efficient 3 Point Shooting SGs
    testSubset1 = dataset.filter(p => p.Pos === 'SG' && p.ThreePPct >= 0.40 && p.ThreePA > 3);
    playerLabels1 = testSubset1.map(p => p.Player);

    chartData1 = {
      labels: xAxisLabels,
      datasets: testSubset1.map(fp => [fp.ThreeP, fp.ThreePA, fp.ThreePPct]).map((stat, idx) => {
        return {
          label: playerLabels1[idx],
          // Random color generator: https://css-tricks.com/snippets/javascript/random-hex-color/
          backgroundColor: `#${Math.floor(Math.random()*16777215).toString(16)}`,
          data: stat
        }
      })
    };
  }

  console.log(chartData1)

  return (
    <div className='page-container chart-bg'>
      <div className='chart-container'>
        <Bar
          data={chartData1}
          width={1600}
          height={800}
          options={chartOptions}
        />
      </div>
    </div>
  );
}

export default Chart1;
