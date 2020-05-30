import React from 'react';
import Header from './Header.js';
import './App.css';
import AboutMe from './AboutMe';
import PostRegistration from './newPost';
import Home from './HomePage/Home';
import OnlyPostPage from './HomePage/OnlyPostPage';
import {
    BrowserRouter,
    Switch,
    Route} from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Header/>

      <Switch>
          <Route path="/about" component={AboutMe}/>
          <Route path='/post/:number' component={OnlyPostPage}/>
          <Route path="/newPost" component={PostRegistration}/>
          <Route path="/" component={Home}/>
      </Switch>
    </BrowserRouter>
  );
}

export default App;