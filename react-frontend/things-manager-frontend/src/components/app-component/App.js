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
import Header from '../page-components/header/Header';

const App = () =>
  <div className="App">
    <Router>
      <Container fluid={true} className="main-container">
        <Header />
        <Container className="content-container">
          <Switch>
              <Route exact path="/" component={MainPage} />
              <Route path="/things/:id" component={ThingPage} />
              <Route path="/test" component={ThingPage} />
              <Route path="/thingsList" component={ThingsListPage} />
          </Switch>
        </Container>
      </Container>
    </Router>
  </div>

export default App;
