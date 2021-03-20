import './App.css';
import Button from '@material-ui/core/Button';

function App() {
  return (
    <div className='App'>
      <header className='App-header'>
        <div className='App-intro-text'>
          <h2>Welcome to <span className='primary'>Shooters Shoot.</span></h2>
          <h3>An interactive data visualization for 2020 NBA Shooting Statistics.</h3>
          <Button variant='contained' color='primary'>
            GO
          </Button>
        </div>
      </header>
    </div>
  );
}

export default App;
