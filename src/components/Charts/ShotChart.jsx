import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Link } from 'react-scroll';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Slider from '@material-ui/core/Slider';
import Tooltip from '@material-ui/core/Tooltip';

import './chart.css';

const barChartColors = require('./barChartColors.js');

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
    width: '100px',
    height: '50px'
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 180,
  }
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

function ValueLabelComponent(props) {
  const { children, open, value } = props;
  return (
    <Tooltip open={open} enterTouchDelay={0} placement='top' title={value}>
      {children}
    </Tooltip>
  );
}

function ShotChart (props) {
  const { dataset } = props;
  const classes = useStyles();
  const [position, setPosition] = useState('Point Guard');
  const [category, setCategory] = useState('Field Goals');
  const [sortBy, setSortBy] = useState('Percentage');
  const [sortOrder, setSortOrder] = useState('None');
  const [numPlayers, setNumPlayers] = useState(5);

  let testSubset3, playerLabels3, chartData3, chartData3b;
  const xAxisLabels = ['FG Made', 'FG Attempted'];

  if (dataset) {
    // Efficient Shooting SFs from the Field
    testSubset3 = dataset.filter(p => p.Pos === 'SF' && p.FGPct >= 0.50 && p.FGA > 5);
    playerLabels3 = testSubset3.map(p => p.Player);

    chartData3 = {
      labels: xAxisLabels,
      datasets: testSubset3.map(fp => [fp.FG, fp.FGA]).map((stat, idx) => {
        const color = barChartColors.colorArr[idx];
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
    <div className='position-container chart-bg-odd' id='shot-chart'>
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
          <div className='horizontal-flex filter-container'>
            <h4>Filters:</h4>
            <FormControl variant='filled' className={classes.formControl}>
              <InputLabel htmlFor='filled-position-native-simple'>Position</InputLabel>
              <Select
                native
                value={position}
                onChange={e => setPosition(e.target.value)}
                label='Position'
                inputProps={{
                  name: 'position',
                  id: 'outlined-position-native-simple',
                }}
              >
                <option aria-label='None' value='' />
                <option value={'Point Guard'}>Point Guard</option>
                <option value={'Shooting Guard'}>Shooting Guard</option>
                <option value={'Small Forward'}>Small Forward</option>
                <option value={'Power Forward'}>Power Forward</option>
                <option value={'Center'}>Center</option>
              </Select>
            </FormControl>
            <FormControl variant='filled' className={classes.formControl}>
              <InputLabel htmlFor='filled-position-native-simple'>Statistic Category</InputLabel>
              <Select
                native
                value={category}
                onChange={e => setCategory(e.target.value)}
                label='Category'
                inputProps={{
                  name: 'Category',
                  id: 'outlined-position-native-simple',
                }}
              >
                <option aria-label='None' value='' />
                <option value={'Field Goals'}>Field Goals</option>
                <option value={'Three Pointers'}>Three Pointers</option>
                <option value={'Free Throws'}>Free Throws</option>
              </Select>
            </FormControl>
            <FormControl variant='filled' className={classes.formControl}>
              <InputLabel htmlFor='filled-position-native-simple'>Sort By</InputLabel>
              <Select
                native
                value={sortBy}
                onChange={e => setSortBy(e.target.value)}
                label='Sorting'
                inputProps={{
                  name: 'Sorting',
                  id: 'outlined-position-native-simple',
                }}
              >
                <option aria-label='None' value='' />
                <option value={'Percentage'}>Percentage</option>
                <option value={'Makes'}>Makes</option>
                <option value={'Attempts'}>Attempts</option>
              </Select>
            </FormControl>
            <FormControl variant='filled' className={classes.formControl}>
              <InputLabel htmlFor='filled-position-native-simple'>Sort Order</InputLabel>
              <Select
                native
                value={sortOrder}
                onChange={e => setSortOrder(e.target.value)}
                label='Sorting'
                inputProps={{
                  name: 'Sorting',
                  id: 'outlined-position-native-simple',
                }}
              >
                <option aria-label='None' value='' />
                <option value={'None'}>None</option>
                <option value={'Ascending'}>Ascending</option>
                <option value={'Descending'}>Descending</option>
              </Select>
            </FormControl>
            <h5 className='filter-item'># of Players</h5>
            <Slider
              ValueLabelComponent={ValueLabelComponent}
              aria-label='# of Players'
              defaultValue={5}
              min={5}
              max={15}
              onChange={e => setNumPlayers(e.target.value)}
            />
          </div>
        </div>
        <div>
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

export default ShotChart;
