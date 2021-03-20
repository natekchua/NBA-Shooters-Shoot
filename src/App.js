import { useState, useEffect } from 'react';
import Home from './components/Home/Home';
import Chart1 from './components/AMCharts/Chart1/Chart1';

import './App.css';

const csv = require('./nba2020-modified-v2.csv');
const papa = require('papaparse/papaparse.min.js');

function App () {
  const [dataset, setDataset] = useState(null);
  
  useEffect(() => {
    papa.parse(csv.default, {
      header: true,
      download: true,
      skipEmptyLines: true,
      complete: setData
    });
  }, [])
  
  const setData = (result) => {
    setDataset(result.data);
  }

  return (
    <div className='App'>
      <Home />
      <Chart1 dataset={dataset} />
    </div>
  );
}

export default App;
