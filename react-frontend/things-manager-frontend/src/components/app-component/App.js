import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import './App.css';
import MainPage from '../pages/main-page-component/MainPage'

const App = () =>
  <div className="App">
    <Router>
      <Switch>
          <Route exact path="/" component={MainPage} />
          <Route path="/about" children={()=><h2>About</h2>} />
          <Route path="/contact" children={()=><h2>Contact</h2>} />
      </Switch>
    </Router>
  </div>

export default App;
