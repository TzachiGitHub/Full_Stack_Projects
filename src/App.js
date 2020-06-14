import React from 'react';
import Header from './Header.js';
import './App.css';
import AboutMe from './AboutMe';
import PostRegistration from './newPost';
import Home from './HomePage/Home';
import Signup from './Signup';
import Login from './Login';
import OnlyPostPage from './HomePage/OnlyPostPage';
import axios from 'axios';
import 'react-router-dom';
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
            id: null
        }
        this.handleLogin = this.handleLogin.bind(this);
        this.getUserId = this.getUserId.bind(this);
        this.logOut = this.logOut.bind(this);
    }

    handleLogin = (loginData)=>{
        this.setState({
            username: loginData.username,
            isLoggedIn: loginData.isLoggedIn,
        })
        this.getUserId(loginData.username);
        this.render()
    }

    getUserId = (id)=>{
        //get the username's id
        const url = 'http://127.0.0.1:5000/getUserId/' + id;
        axios.get(url)
            .then((res)=> {
                if (res.status === 200) {
                    this.setState({
                        id: res.data.id
                    })
                }
            }).catch((err) => {
            console.log(err)
        })
    }

    logOut = ()=>{
        this.setState({
            id: null,
            isLoggedIn: false,
            username: ""
        })
        const url = 'http://127.0.0.1:5000/logout/' + this.state.id;
        axios.post(url)
            .then(res => {
                if (res.status === 200) {
                    // alert("Logout Successfully" + res.data)
                }
            }).catch(err => {
            console.log("Something went wrong with the logout, please try again")
        })
    }

    render(){
        var {isLoggedIn, username} = this.state;
        return(
            <BrowserRouter>
                <Header loggedIn={isLoggedIn} logOut={this.logOut} username={username}/>

                <Switch>
                    <Route path="/about" component={AboutMe}/>
                    <Route path='/post/:id' component={OnlyPostPage}/>
                    <Route path="/newPost" component={PostRegistration}/>
                    <Route path="/Signup" render={(props) => <Signup {...props} handleLogin={this.handleLogin}/>}/>
                    <Route path="/login" component={(props) => <Login {...props} handleLogin={this.handleLogin}/>}/>
                    <Route path="/logout" component={this.logout}/>
                    <Route path="/" component={Home}/>
                </Switch>
            </BrowserRouter>
        )
    }
}