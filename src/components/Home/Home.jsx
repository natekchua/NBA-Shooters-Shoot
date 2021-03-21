import React from 'react';
import { Link } from 'react-scroll'
import Button from '@material-ui/core/Button';

import './home.css';

function Home () {
  return (
    <header className='page-container home-bg' id='home'>
      <div className='home-intro-text'>
        <h2>Welcome to <span className='primary'>Shooters Shoot.</span></h2>
        <h3>An interactive data visualization for 2020 NBA Shooting Statistics.</h3>
      </div>
      <div className='btn-container'>
        <Link
          activeClass='active'
          to='chart-1'
          spy={true}
          smooth={true}
          offset={0}
          duration={500}
        >
          <Button variant='contained' color='primary'> 
            Variation 1
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
          <Button variant='contained' color='primary'>
            Variation 2
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
          <Button variant='contained' color='primary'>
            Variation 3
          </Button>
        </Link>
      </div>
    </header>
  );
}

export default Home;
