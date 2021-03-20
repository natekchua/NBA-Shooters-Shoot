import React from 'react';
import Button from '@material-ui/core/Button';
import './home.css';

function Home () {
  return (
    <header className='home-header'>
      <div className='home-intro-text'>
        <h2>Welcome to <span className='primary'>Shooters Shoot.</span></h2>
        <h3>An interactive data visualization for 2020 NBA Shooting Statistics.</h3>
        <Button variant='contained' color='primary'>
          GO
        </Button>
      </div>
  </header>
  );
}

export default Home;
