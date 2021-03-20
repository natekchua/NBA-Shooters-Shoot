import React from 'react';
import Button from '@material-ui/core/Button';

import './home.css';

function Home () {
  return (
    <header className='page-container home-bg'>
      <div className='home-intro-text'>
        <h2>Welcome to <span className='primary'>Shooters Shoot.</span></h2>
        <h3>An interactive data visualization for 2020 NBA Shooting Statistics.</h3>
      </div>
      <div className='btn-container'>
        <Button variant='contained' color='primary'>
          Variation 1
        </Button>
        <Button variant='contained' color='primary'>
          Variation 2
        </Button>
        <Button variant='contained' color='primary'>
          Variation 3
        </Button>
      </div>
    </header>
  );
}

export default Home;
