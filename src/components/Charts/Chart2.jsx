import React from 'react';
import { Link } from 'react-scroll'
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import Button from '@material-ui/core/Button';
import { HorizontalBar } from 'react-chartjs-2';
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
        fontColor: 'white',
        beginAtZero: true,
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
  const classes = useStyles();

  let testSubset2, playerLabels2, chartData2;
  const xAxisLabels = ['FT Made', 'FT Attempted', 'FT%'];

  if (dataset) {  
    // Efficient FT Shooting Bigs
    testSubset2 = dataset.filter(p => p.Pos === 'C' && p.FTPct >= 0.85);
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
    <div className='page-container chart-bg-even' id='chart-2'>
      <div className='chart-container'>
        <HorizontalBar
          data={chartData2}
          width={1000}
          height={400}
          options={chartOptions}
        />
        <div className="horizontal-flex">
          <p>
            This variation uses a sample subset that is represented through a horizontally grouped bar chart.
            The x-axis seperates each group by shooting rows "FT Made", "FT Attempted", and "FT%" where "FT" means "Free Throw".
            Similar to the first variation, The color coded legend on the right hand side allows users to visually determine distinct players and their percentages.
            I think this variation of my sketch also works well as we can compare each player of this specific shooting category
            by simply doing row comparison. However, the on hover effect here is a little bit harder to use since the thickness of the rows are thinner than the previous columns.
          </p>
          <Link
            activeClass='active'
            to='chart-1'
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
          <Link
            activeClass='active'
            to='chart-3'
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

export default Chart2;
