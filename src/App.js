import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Index from './pages/appPages/Index';
import Wada from './pages/development/Wada';
import Murase from './pages/development/Murase';
import Tsutsui from './pages/development/Tsutsui';
import Nakagoshi from './pages/development/Nakagoshi';
import Talking from './pages/appPages/Talking';
import Register from './pages/appPages/Register';
import Login from './pages/appPages/Login';
import NavberState from './flux/user/userViwe/NavberState';
import userUpdate from './pages/appPages/userUpdate';
import Logout from './pages/appPages/Logout';
import CreateAiModel from './pages/appPages/CreateAiModel';
import UserCreatedAimodels from './pages/appPages/UserCreatedAimodels';
import AimodelInfo from './pages/appPages/AimodelInfo';

function App() {
  return (
    <div className="App">
      <NavberState />
      <div>
        <Router>
          <Switch>
            <Route path="/wada" component={Wada} />
            <Route path="/murase" component={Murase} />
            <Route path="/tsutsui" component={Tsutsui} />
            <Route path="/nakagoshi" component={Nakagoshi} />
            <Route path="/aimode/:id/taking" component={Talking} />
            <Route path="/register" component={Register} />
            <Route path="/login" component={Login} />
            <Route path="/userupdate" component={userUpdate} />
            <Route path="/logout" component={Logout} />
            <Route path="/aimodel/create" component={CreateAiModel} />
            <Route path="/aimode/:id" component={AimodelInfo} />
            <Route path="/userl/:id/aimode" component={UserCreatedAimodels} />
            <Route path="/" component={Index} />
          </Switch>
        </Router>
      </div>
    </div>
  );
}

export default App;
