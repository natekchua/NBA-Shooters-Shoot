import { useState, useEffect } from 'react';
import Home from './components/Home/Home';
import ShotChart from './components/Chart/ShotChart';

import './App.css';

const csv = require('./nba2020-modified-v2.csv');
const papa = require('papaparse/papaparse.min.js');

function App () {
  const [dataset, setDataset] = useState(null);

  // use Papa parse to read the local dataset.
  useEffect(() => {
    papa.parse(csv.default, {
      header: true,
      download: true,
      skipEmptyLines: true,
      complete: setData
    });
  }, [])
  
  // Save the parsed dataset in state and pass it down to chart component.
  const setData = (result) => {
    setDataset(result.data);
  }

  return (
    <div className='App'>
      <Home />
      <ShotChart dataset={dataset} />
    </div>
  );
}

export default App;
