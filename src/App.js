import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Wada from './pages/development/Wada';
import Murase from './pages/development/Murase';
import Tsutsui from './pages/development/Tsutsui';
import Nakagoshi from './pages/development/Nakagoshi';

function App() {
  return (
    <div className="App">
      <div>
        <Router>
          <Switch>
            <Route path="/wada" component={Wada} />
            <Route path="/murase" component={Murase} />
            <Route path="/tsutsui" component={Tsutsui} />
            <Route path="/nakagoshi" component={Nakagoshi} />
          </Switch>
        </Router>
      </div>
    </div>
  );
}

export default App;
