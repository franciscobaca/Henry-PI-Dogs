import './App.css'
import './fonts/NiceSugar.ttf'
import './fonts/MightyKingdom.ttf'
import './fonts/Smilecake.otf'
import './fonts/HeyPatrick.ttf'
import './fonts/Something.otf'
import { Home, Form, Detail, LandingPage } from './views'
import FormUpdate from './views/FormUpdate/FormUpdate'
import { Route } from 'react-router-dom';

function App() {
  return (
    <div className='App'>
      <Route exact path='/' component={LandingPage} />
      <Route exact path='/home' component={Home} />
      <Route exact path='/create' component={Form} />
      {/* <Route exact path='/update' component={FormUpdate} /> */}
      <Route exact path='/home/:id' component={Detail} />
    </div>
  );
}

export default App;
