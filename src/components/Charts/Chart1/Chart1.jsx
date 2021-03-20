import React from 'react';
import { Bar } from 'react-chartjs-2';

import './chart.css';

const chartData = {
  labels: ["Chocolate", "Vanilla", "Strawberry"],
  datasets: [{
    label: "Blue",
    backgroundColor: "blue",
    data: [3, 7, 4]
  }, {
    label: "Red",
    backgroundColor: "red",
    data: [4, 3, 5]
  }, {
    label: "Green",
    backgroundColor: "green",
    data: [7, 2, 6]
  }]
}

const chartOptions = {
  title: {
    display: true,
    text: 'Shooters in the NBA',
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
  let testSubset1, testSubset2, testSubset3, playerLabels1, playerLabels2, playerLabels3, chartData1;
  const xAxisLabels = ['3P Made', '3P Attempted', '3P%'];

  if (dataset) {
    // Efficient 3 Point Shooting SGs
    testSubset1 = dataset.filter(p => p.Pos === 'SG' && p.ThreePPct >= 0.40 && p.ThreePA > 3);
    playerLabels1 = testSubset1.map(p => p.Player);
  
    // Efficient FT Shooting Bigs
    testSubset2 = dataset.filter(p => p.Pos === 'C' && p.FTPct >= 0.80);
    playerLabels2 = testSubset2.map(p => p.Player);
  
    // Efficient Shooting SFs from the Field
    testSubset3 = dataset.filter(p => p.Pos === 'SF' && p.FGPct >= 0.50 && p.FGA > 5);
    playerLabels3 = testSubset3.map(p => p.Player);

    chartData1 = {
      labels: xAxisLabels,
      datasets: testSubset1.map(fp => [fp.ThreeP, fp.ThreePA, fp.ThreePPct]).map((stat, idx) => {
        return {
          label: playerLabels1[idx],
          backgroundColor: `#${Math.floor(Math.random()*16777215).toString(16)}`,
          data: stat
        }
      })
    };
  }

  console.log(chartData1)
  console.log(chartData)

  return (
    <div className='page-container chart-bg'>
      <div className='chart-container'>
        <Bar
          data={chartData1}
          width={1600}
          height={800}
          options={chartOptions}
          style={{ color: '#fff' }}
          defaultFontColor='#fff'
        />
      </div>
    </div>
  );
}

export default Chart1;
