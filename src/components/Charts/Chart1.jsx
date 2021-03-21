import React from 'react';
import { Link } from 'react-scroll'
import { Bar } from 'react-chartjs-2';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
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
  const classes = useStyles();

  let testSubset1, playerLabels1, chartData1;
  const xAxisLabels = ['3P Made', '3P Attempted', '3P%'];

  if (dataset) {
    // Efficient 3 Point Shooting SGs
    testSubset1 = dataset.filter(p => p.Pos === 'SG' && p.ThreePPct >= 0.40 && p.ThreePA > 3);
    playerLabels1 = testSubset1.map(p => p.Player);

    chartData1 = {
      labels: xAxisLabels,
      datasets: testSubset1.map(fp => [fp.ThreeP, fp.ThreePA, fp.ThreePPct]).map((stat, idx) => {
        // Random color generator: https://css-tricks.com/snippets/javascript/random-hex-color/
        const color = `#${Math.floor(Math.random()*16777215).toString(16)}`;
        return {
          label: playerLabels1[idx],
          backgroundColor: color,
          hoverBackgroundColor: color,
          borderWidth: 1,
          hoverBorderColor: '#ffffff',
          data: stat
        }
      })
    };
  }

  return (
    <div className='page-container chart-bg-odd' id='chart-1'>
      <div className='chart-container'>
        <Bar
          data={chartData1}
          width={1000}
          height={400}
          options={chartOptions}
        />
        <div className='horizontal-flex'>
          <p>
            This variation uses a sample subset that is represented through a vertically grouped bar chart.
            The x-axis seperates each group by shooting columns "3P Made", "3P Attempted", and "3P%" where "3P" means "Three Point".
            The color coded legend on the right hand side allows users to visually determine distinct players and their percentages.
            I think this variation of my sketch works well as we can easily compare each player of this specific shooting category
            by simply doing column comparison. The on hover effect to see the exact values also helps with getting a grasp on the statistics.
          </p>
          <Link
            activeClass='active'
            to='home'
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
              Home
            </Button>
          </Link>
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
              startIcon={<ArrowDownwardIcon />}
            >
              Next
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Chart1;
