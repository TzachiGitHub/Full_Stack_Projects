import React from 'react';
import axios from 'axios';
import 'react-router-dom';
import Cookie from 'js-cookie'
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';
import './App.css';
import AboutMe from './AboutMe';
import Header from './Header.js';
import Home from './HomePage/Home';
import Login from './Registration/Login';
import Signup from './Registration/Signup';
import NewPost from './PostsDir/newPost';
import EditPost from './PostsDir/EditPost';
import OnlyPostPage from './PostsDir/OnlyPostPage';

export default class App extends React.Component{
    constructor(props) {
        super(props);
        this.state ={   
            isLoggedIn: Cookie.get('username') != null,
            username: Cookie.get('username') || "",
            nickname: Cookie.get('nickname') || "",
            loggedInUserId: Cookie.get('loggedInUserId') || null,
            currentPost: null,
            currentTags: null,
        }
        console.log()
        this.handleLogin = this.handleLogin.bind(this);
        this.logOut = this.logOut.bind(this);
    }

    handleLogin = (loginData)=>{
        this.setState({
            username: loginData.username,
            nickname: loginData.nickname,
            isLoggedIn: loginData.isLoggedIn,
            loggedInUserId: loginData.loggedInUserId,
        })
        Cookie.set("loggedInUserId", this.state.loggedInUserId)
        Cookie.set("username", this.state.username)
        Cookie.set("nickname", this.state.nickname)
    }

    setCurrentPost = (post)=>{
        this.setState({
            currentPost: post
        })
    }

    updateTags = (tags) => {
        this.setState({
            currentTags: tags
        })
        console.log("updateTags was called!")
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
                }

            }).catch(err => {
                console.log(err)
                console.log("Something went wrong with the logout, please try again")
        })
    }

    render(){
        var {loggedInUserId, isLoggedIn, username, currentPost, nickname, tags} = this.state;
        return(
            <BrowserRouter>
                <Header loggedInUserId={loggedInUserId} isloggedIn={isLoggedIn} logOut={this.logOut} nickname={nickname} username={username}/>
                <Switch>
                    <Route path="/about" component={AboutMe}/>
                    <Route path='/post' component={(props)=><OnlyPostPage {...props} onEditUpdateTags={this.updateTags} currentPost={currentPost} loggedInUserId={loggedInUserId} isLoggedIn={isLoggedIn}/>}/>
                    <Route path="/Signup" render={(props) => <Signup {...props} handleLogin={this.handleLogin}/>}/>
                    <Route path="/login" component={(props) => <Login {...props} handleLogin={this.handleLogin}/>}/>
                    <Route path="/logout" component={this.logout}/>
                    <Route path="/newPost" component={(props)=> isLoggedIn ? <NewPost {...props} nickname={nickname} loggedInUserId={loggedInUserId}/> : <Redirect to={'/login'}/>}/>}
                    <Route path="/editPost" component={(props)=> isLoggedIn ? <NewPost {...props} tags={tags} currentPost={currentPost} loggedInUserId={loggedInUserId} nickname={nickname}/> : <Redirect to={'/login'}/>}/>
                    <Route path="/" component={(props)=><Home {...props} nickname={nickname} isLoggedIn={isLoggedIn} loggedInUserId={this.state.loggedInUserId} setCurrentPost={this.setCurrentPost}/>}/>
                </Switch>
            </BrowserRouter>
        )
    }
}