import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { Container } from 'react-bootstrap';

import './App.css';
import MainPage from '../pages/main-page-component/MainPage';
import ThingsListPage from '../pages/things-list-page-component/ThingsListPage';
import ThingPage from '../pages/thing-page-component/ThingPage';
import BuildingsListPage from '../pages/buildings-list-page-component/BuildingsListPage';
import RoomsListPage from '../pages/rooms-list-page-component/RoomsListPage';
import SpacesListPage from '../pages/spaces-list-page-component/SpacesListPage';
import BuildingPage from '../pages/building-page-component/BuildingPage';
import RoomPage from '../pages/room-page-component/RoomPage';
import SpacePage from '../pages/space-page-component/SpacePage';
import Header from '../page-components/header/Header';

const App = () =>
  <div className="App">
    <Router>
      <Container fluid={true} className="main-container">
        <Header />
        <Container className="content-container">
          <Switch>
              <Route exact path="/" component={MainPage} />
              <Route path="/thing/:id" component={ThingPage} />
              <Route path="/building/:id" component={BuildingPage} />
              <Route path="/space/:id" component={SpacePage} />
              <Route path="/room/:id" component={RoomPage} />
              <Route path="/things" component={ThingsListPage} />
              <Route path="/buildings" component={BuildingsListPage} />
              <Route path="/spaces" component={SpacesListPage} />
              <Route path="/rooms" component={RoomsListPage} />
          </Switch>
        </Container>
      </Container>
    </Router>
  </div>

export default App;
