import './App.css'
import './fonts/NiceSugar.ttf'
import './fonts/MightyKingdom.ttf'
import './fonts/Smilecake.otf'
import { Home, Form, Detail, LandingPage } from './views'
import { Route, useLocation } from 'react-router-dom';

function App() {
  const location = useLocation();

  return (
    <div className='App'>
      <Route exact path='/' component={LandingPage} />
      <Route exact path='/home' component={Home} />
      <Route exact path='/create' component={Form} />
      <Route exact path='/home/:id' component={Detail} />
    </div>
  );
}

export default App;
