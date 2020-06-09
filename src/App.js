import React from 'react';
import Header from './Header.js';
import './App.css';
import AboutMe from './AboutMe';
import PostRegistration from './newPost';
import Home from './HomePage/Home';
import Signup from './Signup';
import Login from './Login';
import OnlyPostPage from './HomePage/OnlyPostPage';

import {
    BrowserRouter,
    Switch,
    Route} from 'react-router-dom';

export default class App extends React.Component{
    constructor(props) {
        super(props);
        this.state ={
            isLoggedIn: false,
            username: "",
        }
        this.handleLogin = this.handleLogin.bind(this);

    }

    handleLogin = (props)=>{
        alert("handlelogin was called!!")
        console.log("handlelogin was called!!")
        this.username = props.username;
        this.isLoggedIn = props.isLoggedIn;
    }

    render(){
        return(
            <BrowserRouter>
                <Header/>

                <Switch>
                    <Route path="/about" component={AboutMe}/>
                    <Route path='/post/:id' component={OnlyPostPage}/>
                    <Route path="/newPost" component={PostRegistration}/>

                    {/*<Route path="/Signup" component={Signup}/>*/}
                    <Route path="/Signup" render={(props)=> <Signup handleLogin={this.handleLogin} userLoggedIn={this.userLoggedIn} />}/>

                    <Route path="/login" component={Login}/>
                    <Route path="/" component={Home}/>
                </Switch>
            </BrowserRouter>
        )
    }
}