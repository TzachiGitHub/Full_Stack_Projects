import React from 'react';
import Header from './header.js';
import Aside from './aside.js';
import Section from './section.js';
import AboutMe from './AboutMe';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

function App() {
  return (
    <div>
      <Header/>
      {/*<AboutMe/>*/}
    </div>
  );
}

export default App;