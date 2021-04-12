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

const chartAttributes = require('./chartAtrributes.js');

const { options, optionsPCT, colorArr } = chartAttributes;

// Material UI styling.
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

// Tooltip helper for Max Players slider.
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
  const [position, setPosition] = useState('PG');
  const [category, setCategory] = useState('FG');
  const [sortBy, setSortBy] = useState('Percentage');
  const [sortOrder, setSortOrder] = useState('Ascending');
  const [ranking, setRanking] = useState('Best');
  const [numPlayers, setNumPlayers] = useState(5);

  const xAxisLabels = [`${category} Made`, `${category} Attempted`];

  // Function to handle Sort By and Sort Order functions.
  const applySortingFilter = (subset) => {
    if (category === 'FG') {
      if (sortOrder === 'Ascending') {
        if (sortBy === 'Percentage') {
          subset.sort((a, b) => a.FGPct - b.FGPct);
          subset.sort((a, b) => a.FGPct - b.FGPct);
        } else if (sortBy === 'Makes') {
          subset.sort((a, b) => a.FG - b.FG);
          subset.sort((a, b) => a.FG - b.FG);
        } else {
          subset.sort((a, b) => a.FGA - b.FGA);
          subset.sort((a, b) => a.FGA - b.FGA);
        }
      } else if (sortOrder === 'Descending') {
        if (sortBy === 'Percentage') {
          subset.sort((a, b) => b.FGPct - a.FGPct);
          subset.sort((a, b) => b.FGPct - a.FGPct);
        } else if (sortBy === 'Makes') {
          subset.sort((a, b) => b.FG - a.FG);
          subset.sort((a, b) =>  b.FG - a.FG);
        } else {
          subset.sort((a, b) => b.FGA - a.FGA);
          subset.sort((a, b) => b.FGA - a.FGA);
        }
      }
    } else if (category === '3P') {
      if (sortOrder === 'Ascending') {
        if (sortBy === 'Percentage') {
          subset.sort((a, b) => a.ThreePPct - b.ThreePPct);
          subset.sort((a, b) => a.ThreePPct - b.ThreePPct);
        } else if (sortBy === 'Makes') {
          subset.sort((a, b) => a.ThreeP - b.ThreeP);
          subset.sort((a, b) => a.ThreeP - b.ThreeP);
        } else {
          subset.sort((a, b) => a.ThreePA - b.ThreePA);
          subset.sort((a, b) => a.ThreePA - b.ThreePA);
        }
      } else if (sortOrder === 'Descending') {
        if (sortBy === 'Percentage') {
          subset.sort((a, b) => b.ThreePPct - a.ThreePPct);
          subset.sort((a, b) => b.ThreePPct - a.ThreePPct);
        } else if (sortBy === 'Makes') {
          subset.sort((a, b) => b.ThreeP - a.ThreeP);
          subset.sort((a, b) =>  b.ThreeP - a.ThreeP);
        } else {
          subset.sort((a, b) => b.ThreePA - a.ThreePA);
          subset.sort((a, b) => b.ThreePA - a.ThreePA);
        }
      }
    } else {
      if (sortOrder === 'Ascending') {
        if (sortBy === 'Percentage') {
          subset.sort((a, b) => a.FTPct - b.FTPct);
          subset.sort((a, b) => a.FTPct - b.FTPct);
        } else if (sortBy === 'Makes') {
          subset.sort((a, b) => a.FT - b.FT);
          subset.sort((a, b) => a.FT - b.FT);
        } else {
          subset.sort((a, b) => a.FTA - b.FTA);
          subset.sort((a, b) => a.FTA - b.FTA);
        }
      } else if (sortOrder === 'Descending') {
        if (sortBy === 'Percentage') {
          subset.sort((a, b) => b.FTPct - a.FTPct);
          subset.sort((a, b) => b.FTPct - a.FTPct);
        } else if (sortBy === 'Makes') {
          subset.sort((a, b) => b.FT - a.FT);
          subset.sort((a, b) =>  b.FT - a.FT);
        } else {
          subset.sort((a, b) => b.FTA - a.FTA);
          subset.sort((a, b) => b.FTA - a.FTA);
        }
      }
    }
    return subset;
  }

  let subset, chartData, chartDataPCT;

  if (dataset) {
    // Position Filter
    subset = dataset.filter(p => p.Pos === position);

    // Sorting Filters
    subset = applySortingFilter(subset);
  
    // Max # of Players Filter
    if (ranking === 'Best') {
      if (sortOrder === 'Ascending') {
        subset = subset.slice(subset.length - numPlayers, subset.length);
      } else {
        subset = subset.slice(0, numPlayers);
      }
    } else {
      if (sortOrder === 'Ascending') {
        subset = subset.slice(0, numPlayers);
      } else {
        subset = subset.slice(subset.length - numPlayers, subset.length);
      }
    }

    const playerLabels = subset.map(p => p.Player);
    
    // Statistic Category Filters 
    let makesAttemptsSubset = subset.map(fp => [fp.FG, fp.FGA]);
    let percentageSubset = subset.map(fp => [fp.FGPct]);

    if (category === '3P') {
      makesAttemptsSubset = subset.map(fp => [fp.ThreeP, fp.ThreePA]);
      percentageSubset = subset.map(fp => [fp.ThreePPct]);
    } else if (category === 'FT') {
      makesAttemptsSubset = subset.map(fp => [fp.FT, fp.FTA]);
      percentageSubset = subset.map(fp => [fp.FTPct]);
    }

    // Makes / Attempts Chart
    chartData = {
      labels: xAxisLabels,
      datasets: makesAttemptsSubset.map((stat, idx) => {
        const color = colorArr[idx];
        return {
          label: playerLabels[idx],
          backgroundColor: color,
          hoverBackgroundColor: color,
          borderWidth: 1,
          hoverBorderColor: '#ffffff',
          data: stat
        }
      })
    };

    // Percentage Chart
    chartDataPCT = {
      labels: [`${category} %`],
      datasets: percentageSubset.map((stat, idx) => {
        return {
          label: playerLabels[idx],
          backgroundColor: chartData.datasets[idx].backgroundColor,
          hoverBackgroundColor: chartData.datasets[idx].hoverBackgroundColor,
          borderWidth: 1,
          hoverBorderColor: '#ffffff',
          data: stat
        }
      })
    };
  }

  // Update Chart titles upon changing position filter.
  options.title.text = `Shooting Frequency for ${position}s in the 2020 NBA Season`;
  optionsPCT.title.text = `Shooting Efficiency (%) for these ${position}s`;

  return (
    <div className='position-container chart-bg-odd' id='shot-chart'>
      <div className='chart-container'>
        <div className='horizontal-flex'>
          <div style={{ flex: 0.6 }}>
            <Bar
              data={chartData}
              width={600}
              height={400}
              options={options}
            />
          </div>
          <div style={{ flex: 0.4 }}>
            <Bar
              data={chartDataPCT}
              width={400}
              height={400}
              options={optionsPCT}
            />
          </div>      
        </div>
        <div className='horizontal-flex'>
          <div className='horizontal-flex filter-container'>
            <div className='horizontal-flex' style={{ flex: 0.6 }}>
              <h4>Filters:</h4>
              <FormControl variant='filled' className={classes.formControl}>
                <InputLabel color='secondary' htmlFor='filled-position-native-simple'>Position</InputLabel>
                <Select
                  native
                  value={position}
                  onChange={e => setPosition(e.target.value)}
                  label='Position'
                  inputProps={{
                    name: 'position',
                    id: 'outlined-position-native-simple',
                  }}
                  color='secondary'
                >
                  <option value={'PG'}>Point Guard</option>
                  <option value={'SG'}>Shooting Guard</option>
                  <option value={'SF'}>Small Forward</option>
                  <option value={'PF'}>Power Forward</option>
                  <option value={'C'}>Center</option>
                </Select>
              </FormControl>
              <FormControl variant='filled' className={classes.formControl}>
                <InputLabel color='secondary' htmlFor='filled-position-native-simple'>Statistic Category</InputLabel>
                <Select
                  native
                  value={category}
                  onChange={e => setCategory(e.target.value)}
                  label='Category'
                  inputProps={{
                    name: 'Category',
                    id: 'outlined-position-native-simple',
                  }}
                  color='secondary'
                >
                  <option value={'FG'}>Field Goals</option>
                  <option value={'3P'}>Three Pointers</option>
                  <option value={'FT'}>Free Throws</option>
                </Select>
              </FormControl>
              <FormControl variant='filled' className={classes.formControl}>
                <InputLabel color='secondary' htmlFor='filled-position-native-simple'>Sort By</InputLabel>
                <Select
                  native
                  value={sortBy}
                  onChange={e => setSortBy(e.target.value)}
                  label='Sort By'
                  inputProps={{
                    name: 'Sort By',
                    id: 'outlined-position-native-simple',
                  }}
                  color='secondary'
                >
                  <option value={'Percentage'}>Percentage</option>
                  <option value={'Makes'}>Makes</option>
                  <option value={'Attempts'}>Attempts</option>
                </Select>
              </FormControl>
              <FormControl variant='filled' className={classes.formControl}>
                <InputLabel color='secondary' htmlFor='filled-position-native-simple'>Sort Order</InputLabel>
                <Select
                  native
                  value={sortOrder}
                  onChange={e => setSortOrder(e.target.value)}
                  label='Sort Order'
                  inputProps={{
                    name: 'Sort Order',
                    id: 'outlined-position-native-simple',
                  }}
                  color='secondary'
                >
                  <option value={'Ascending'}>Ascending</option>
                  <option value={'Descending'}>Descending</option>
                </Select>
              </FormControl>
              <FormControl variant='filled' className={classes.formControl}>
                <InputLabel color='secondary' htmlFor='filled-position-native-simple'>Player Ranking</InputLabel>
                <Select
                  native
                  value={ranking}
                  onChange={e => setRanking(e.target.value)}
                  label='Ranking'
                  inputProps={{
                    name: 'Ranking',
                    id: 'outlined-position-native-simple',
                  }}
                  color='secondary'
                >
                  <option value={'Best'}>Best</option>
                  <option value={'Worst'}>Worst</option>
                </Select>
              </FormControl>
            </div>
            <div className='horizontal-flex' style={{ flex: 0.4 }}>
              <h5 className='filter-item'>Max # of Players</h5>
              <Slider
                ValueLabelComponent={ValueLabelComponent}
                aria-label='Max # of Players'
                defaultValue={5}
                min={5}
                max={15}
                onChangeCommitted={(e, v) => setNumPlayers(v)}
                color='secondary'
              />
            </div>
          </div>
        </div>
        <div className='horizontal-flex'>
          <p>
            This data visualization allows you to play around with 2020 NBA Player Shooting Statistics supplied by <a href='https://www.basketball-reference.com/leagues/NBA_2020_totals.html' target='_blank' rel='noreferrer'>basketballreference.com</a>.
            You can filter by position, statistic category, type (Makes, Attempts, Percentage), and ranking. Player count is limited to a range of 5-15 for readability purposes.
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
        </div>
      </div>
    </div>
  );
}

export default ShotChart;
