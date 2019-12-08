import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { Container } from 'react-bootstrap';

import './App.css';
import MainPage from '../pages/main-page-component/MainPage';
import Header from '../page-components/header/Header';

const App = () =>
  <div className="App">
    <Router>
      <Container fluid={true} className="main-container">
        <Header />
        <Container className="content-container">
          <Switch>
              <Route exact path="/" component={MainPage} />
              <Route path="/about" children={()=><h2>About</h2>} />
              <Route path="/contact" children={()=><h2>Contact</h2>} />
          </Switch>
        </Container>
      </Container>
    </Router>
  </div>

export default App;
