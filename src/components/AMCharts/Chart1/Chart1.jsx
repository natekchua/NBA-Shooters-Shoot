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
    fontSize: 25
  },
  legend: {
    display: true,
    position: 'right'
  },
  maintainAspectRatio: false
}

function Chart1 () {
  return (
    <div className='page-container chart-bg'>
      <div className='chart-container'>
        <Bar
          data={chartData}
          width={1600}
          height={800}
          options={chartOptions}
          style={{ color: '#fff' }}
        />
      </div>
    </div>
  );
}

export default Chart1;
