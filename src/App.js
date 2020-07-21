import React from 'react';
import Header from './Header.js';
import './App.css';
import AboutMe from './AboutMe';
import NewPost from './newPost';
import Home from './HomePage/Home';
import Signup from './Signup';
import EditPost from './EditPost';
import Login from './Login';
import OnlyPostPage from './HomePage/OnlyPostPage';
import axios from 'axios';
import 'react-router-dom';
import {Redirect} from 'react-router-dom';
import Cookie from 'js-cookie'

import {
    BrowserRouter,
    Switch,
    Route} from 'react-router-dom';

export default class App extends React.Component{
    constructor(props) {
        super(props);
        this.state ={   
            isLoggedIn: Cookie.get('username') != null,
            username: Cookie.get('username') || "",
            loggedInUserId: Cookie.get('loggedInUserId') || null,
            currentPost: null
        }
        console.log()
        this.handleLogin = this.handleLogin.bind(this);
        this.logOut = this.logOut.bind(this);
    }

    handleLogin = (loginData)=>{
        this.setState({
            username: loginData.username,
            isLoggedIn: loginData.isLoggedIn,
            loggedInUserId: loginData.loggedInUserId,
        })
        Cookie.set("loggedInUserId", this.state.loggedInUserId)
        Cookie.set("username", this.state.username)
    }

    setCurrentPost = (post)=>{
        this.setState({
            currentPost: post
        })
    }

    logOut = ()=>{
        const {loggedInUserId} = this.state
        // const deployUrl = '/randomText/logout/' + loggedInUserId;
        const localUrl = 'http://127.0.0.1:5000/randomText/logout/' + loggedInUserId;
        const validationData = {
            username: this.state.username,
            loggedInUserId: loggedInUserId
        }
        axios.post(localUrl,validationData)
            .then(res => {
                if (res.status === 200) {
                    this.setState({
                        loggedInUserId: null,
                        isLoggedIn: false,
                        username: ""
                    })
                    Cookie.remove("username")
                    Cookie.remove("loggedInUserId")
                    alert("Logout Successfully!")
                }

            }).catch(err => {
                console.log(err)
                console.log("Something went wrong with the logout, please try again")
        })
    }

    render(){
        var {loggedInUserId, isLoggedIn, username, currentPost} = this.state;
        return(
            <BrowserRouter>
                <Header loggedInUserId={loggedInUserId} isloggedIn={isLoggedIn} logOut={this.logOut} username={username}/>
                <Switch>
                    <Route path="/about" component={AboutMe}/>
                    <Route path='/post' component={(props)=><OnlyPostPage {...props} currentPost={currentPost} loggedInUserId={loggedInUserId} isLoggedIn={isLoggedIn}/>}/>
                    <Route path="/Signup" render={(props) => <Signup {...props} handleLogin={this.handleLogin}/>}/>
                    <Route path="/login" component={(props) => <Login {...props} handleLogin={this.handleLogin}/>}/>
                    <Route path="/logout" component={this.logout}/>
                    <Route path="/newPost" component={(props)=> true ? <NewPost {...props} username={username} loggedInUserId={loggedInUserId}/> : <Redirect to={'/login'}/>}/>}
                    <Route path="/editPost" component={(props)=> isLoggedIn ? <EditPost {...props} currentPost={currentPost} username={username}/> : <Redirect to={'/login'}/>}/>
                    <Route path="/" component={(props)=><Home {...props} isLoggedIn={isLoggedIn} loggedInUserId={this.state.loggedInUserId} setCurrentPost={this.setCurrentPost}/>}/>
                </Switch>
            </BrowserRouter>
        )
    }
}