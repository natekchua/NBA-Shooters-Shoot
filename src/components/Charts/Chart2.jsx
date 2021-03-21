import React from 'react';
import { Bar } from 'react-chartjs-2';

import './chart.css';

const chartOptions = {
  title: {
    display: true,
    text: 'Efficient Free Throw Shooting Centers in the 2020 NBA Season',
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

function Chart2 (props) {
  const { dataset } = props;
  let testSubset2, playerLabels2, chartData2;
  const xAxisLabels = ['FT Made', 'FT Attempted', 'FT%'];

  if (dataset) {  
    // Efficient FT Shooting Bigs
    testSubset2 = dataset.filter(p => p.Pos === 'C' && p.FTPct >= 0.80);
    playerLabels2 = testSubset2.map(p => p.Player);

    chartData2 = {
      labels: xAxisLabels,
      datasets: testSubset2.map(fp => [fp.FT, fp.FTA, fp.FTPct]).map((stat, idx) => {
        return {
          label: playerLabels2[idx],
          // Random color generator: https://css-tricks.com/snippets/javascript/random-hex-color/
          backgroundColor: `#${Math.floor(Math.random()*16777215).toString(16)}`,
          data: stat
        }
      })
    };
  }

  console.log(chartData2)

  return (
    <div className='page-container chart-bg'>
      <div className='chart-container'>
        <Bar
          data={chartData2}
          width={1600}
          height={800}
          options={chartOptions}
        />
      </div>
    </div>
  );
}

export default Chart2;
