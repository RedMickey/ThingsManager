import React from 'react';
import logo from './logo.svg';
import './App.css';
import MainPage from './pages/mainPage/MainPage';
import ThingsListPage from './pages/thingsListPage/ThingsListPage';
import ThingPage from './pages/thingPage/ThingPage';
import Container from 'react-bootstrap/Container';

function App() {
  return (
    <div className="App">
      {/*<MainPage></MainPage>*/}
      <ThingPage></ThingPage>
    </div>
  );
}

export default App;
