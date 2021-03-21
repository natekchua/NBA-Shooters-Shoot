import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Link } from 'react-scroll';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

import './chart.css';

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
    width: '100px',
    height: '50px'
  },
}));

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
  const classes = useStyles();

  let testSubset3, playerLabels3, chartData3;
  const xAxisLabels = ['FG Made', 'FG Attempted'];

  if (dataset) {
    // Efficient Shooting SFs from the Field
    testSubset3 = dataset.filter(p => p.Pos === 'SF' && p.FGPct >= 0.50 && p.FGA > 5);
    playerLabels3 = testSubset3.map(p => p.Player);

    chartData3 = {
      labels: xAxisLabels,
      datasets: testSubset3.map(fp => [fp.FG, fp.FGA]).map((stat, idx) => {
        return {
          label: playerLabels3[idx],
          // Random color generator: https://css-tricks.com/snippets/javascript/random-hex-color/
          backgroundColor: `#${Math.floor(Math.random()*16777214).toString(16)}`,
          data: stat
        }
      })
    };
  }

  console.log(chartData3)

  return (
    <div className='page-container chart-bg-odd' id='chart-3'>
      <div className='chart-container'>
        <Bar
          data={chartData3}
          width={1000}
          height={400}
          options={chartOptions}
        />
        <div className="horizontal-flex">
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quibusdam libero suscipit quod natus doloremque tenetur consectetur quia est perferendis! Quae nam molestias et distinctio maxime excepturi debitis, ipsa provident nostrum id cupiditate voluptatum accusantium nemo quaerat, in aperiam pariatur odio cumque, vitae similique impedit omnis. Beatae ducimus quae possimus! Inventore?
          </p>
          <Link
            activeClass='active'
            to='chart-2'
            spy={true}
            smooth={true}
            offset={0}
            duration={500}
          >
            <Button
              variant='contained'
              color='secondary'
              className={classes.button}
              startIcon={<ArrowUpwardIcon />}
            >
              Prev
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Chart3;
