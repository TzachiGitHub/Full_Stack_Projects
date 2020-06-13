import React from 'react';
import Header from './Header.js';
import './App.css';
import AboutMe from './AboutMe';
import PostRegistration from './newPost';
import Home from './HomePage/Home';
import Signup from './Signup';
import Login from './Login';
import Logout from './Logout';
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

    handleLogin = (loginData)=>{
        console.log(loginData.username + " handlelogin was called!! = " +  loginData.isLoggedIn)
        this.setState({
            username: loginData.username,
            isLoggedIn: loginData.isLoggedIn
        })
        this.render()
    }

    render(){
        // console.log("from App.js: this.state.isLoggenIn == " + this.state.isLoggedIn)
        var {isLoggedIn} = this.state;
        return(
            <BrowserRouter>
                {/*{console.log("@@@   from App.js: this.state.isLoggenIn == " + this.state.isLoggedIn)}*/}
                <Header loggedIn={isLoggedIn}/>
                {console.log("@@@   from App.js: this.state.isLoggenIn == " + this.state.isLoggedIn)}


                <Switch>
                    <Route path="/about" component={AboutMe}/>
                    <Route path='/post/:id' component={OnlyPostPage}/>
                    <Route path="/newPost" component={PostRegistration}/>

                    <Route path="/Signup" render={(props) => <Signup {...props} handleLogin={this.handleLogin}/>}/>
                    <Route path="/login" component={(props) => <Login {...props} handleLogin={this.handleLogin}/>}/>
                    <Route path="/logout" component={(props) => <Logout {...props} handleLogin={this.handleLogin}/>}/>
                    <Route path="/" component={Home}/>
                </Switch>
            </BrowserRouter>
        )
    }
}