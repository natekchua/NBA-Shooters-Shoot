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
    display: false
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

  let testSubset3, playerLabels3, chartData3, chartData3b;
  const xAxisLabels = ['FG Made', 'FG Attempted'];

  if (dataset) {
    // Efficient Shooting SFs from the Field
    testSubset3 = dataset.filter(p => p.Pos === 'SF' && p.FGPct >= 0.50 && p.FGA > 5);
    playerLabels3 = testSubset3.map(p => p.Player);

    chartData3 = {
      labels: xAxisLabels,
      datasets: testSubset3.map(fp => [fp.FG, fp.FGA]).map((stat, idx) => {
        // Random color generator: https://css-tricks.com/snippets/javascript/random-hex-color/
        const color = `#${Math.floor(Math.random()*16777215).toString(16)}`;
        return {
          label: playerLabels3[idx],
          backgroundColor: color,
          hoverBackgroundColor: color,
          borderWidth: 1,
          hoverBorderColor: '#ffffff',
          data: stat
        }
      })
    };

    chartData3b = {
      labels: ['FG%'],
      datasets: testSubset3.map(fp => [fp.FGPct]).map((stat, idx) => {
        return {
          label: playerLabels3[idx],
          backgroundColor: chartData3.datasets[idx].backgroundColor,
          hoverBackgroundColor: chartData3.datasets[idx].hoverBackgroundColor,
          borderWidth: 1,
          hoverBorderColor: '#ffffff',
          data: stat
        }
      })
    };
  }

  return (
    <div className='page-container chart-bg-odd' id='chart-3'>
      <div className='chart-container'>
        <div className='horizontal-flex'>
          <div style={{ flex: 0.6 }}>
            <Bar
              data={chartData3}
              width={600}
              height={400}
              options={chartOptions}
            />
          </div>
          <div style={{ flex: 0.4 }}>
            <Bar
              data={chartData3b}
              width={400}
              height={400}
              options={{
                title: {
                  display: true,
                  text: 'Field Goal % of these Small Forwards',
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
              }}
            />
          </div>
          
        </div>
        <div className='horizontal-flex'>
          <p>
            This variation uses a sample subset that is represented through a vertically grouped bar chart.
            The x-axis separates each group by shooting rows "FG Made", "FG Attempted", and "FG%" where "FG" means "Field Goal".
            Similar to the first variation, The color coded legend on the right hand side allows users to visually determine distinct players and their percentages.
            The main difference between this variation and the first one, is that the percentage column is isolated onto it's own chart and scale. I think 
            this variation makes more since for the given dataset since field goals will have a higher value of makes and attempts in comparison to 3-pointers and free throws.
            By isolating field goal percentage, it is easier to visually interpret these percentage values.
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
        </div>
      </div>
    </div>
  );
}

export default Chart3;
