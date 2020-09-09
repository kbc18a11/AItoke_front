import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Index from './pages/appPages/Index';
import Talking from './pages/appPages/Talking';
import Register from './pages/appPages/Register';
import Login from './pages/appPages/Login';
import NavberState from './flux/user/userViwe/NavberState';
import userUpdate from './pages/appPages/userUpdate';
import Logout from './pages/appPages/Logout';
import CreateAiModel from './pages/appPages/CreateAiModel';
import UserCreatedAimodels from './pages/appPages/UserCreatedAimodels';
import AimodelInfo from './pages/appPages/AimodelInfo';
import FavoriteAiModel from './pages/appPages/FavoriteAiModel';
import SearchAimodel from './pages/appPages/SearchAimodel';
import MyAimodels from './pages/appPages/MyAimodels';
import UpdateAimodel from './pages/appPages/UpdateAimodel';

function App() {
  return (
    <div className="App">
      <Router>
        <NavberState />
        <Switch>
          <Route path="/aimode/:id/taking" component={Talking} />
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
          <Route path="/userupdate" component={userUpdate} />
          <Route path="/logout" component={Logout} />
          <Route path="/aimodel/create" component={CreateAiModel} />
          <Route path="/aimodel/update/:id" component={UpdateAimodel} />
          <Route path="/aimodel/serch/:serchWord" component={SearchAimodel} />
          <Route path="/aimode/:id" component={AimodelInfo} />
          <Route path="/favorite/aimode" component={FavoriteAiModel} />
          <Route path="/user/my/aimodel" component={MyAimodels} />
          <Route path="/userl/:id/aimode" component={UserCreatedAimodels} />
          <Route path="/" component={Index} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
