import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Login from './component/Login';
import Routing from './routing/Routing';

function App() {
  return (
    <Router>
       <Switch>
       <Route exact path='/' component={Login}/>
       <Route  component={Routing}/>
       </Switch>
    </Router>
  );
}

export default App;
