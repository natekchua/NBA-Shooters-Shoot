import React from 'react';
import { Link } from 'react-scroll'
import Button from '@material-ui/core/Button';

import './home.css';

function Home () {
  return (
    <header className='page-container home-bg' id='home'>
      <div className='home-intro-text'>
        <h2>Welcome to <span className='primary'>Shooters Shoot.</span></h2>
        <h4>An <span className='primary'>interactive data visualization</span> of 2020 NBA Shooting Statistics.</h4>
        <h6>Made with love by Nathan Chua</h6>
      </div>
      <div className='btn-container'>
        <Link
          activeClass='active'
          to='shot-chart'
          spy={true}
          smooth={true}
          offset={0}
          duration={500}
        >
          <Button variant='contained' color='secondary'>
            Explore
          </Button>
        </Link>
      </div>
    </header>
  );
}

export default Home;
