import React from 'react';
import './App.css'
import {Link} from "react-router-dom";

export default class Header extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: "",
            logOut: this.props.logOut
        }
    }

    logoutNow(){
        console.og("logoutNow from Header was called")
        this.state.logOut();
    }

    render() {
        var {isloggedIn, username} = this.props
        var {logOut} = this.state
        return (
            <header className="topnav">
                <li>
                    <Link to="/home">Home</Link>
                </li>
                <span> | </span>
                <li>
                    <Link to="/about">About Me</Link>
                </li>
                <span> | </span>
                <li>
                    <Link to="/newPost">New Post</Link>
                </li>
                {!isloggedIn &&
                <>
                    <li className="login">
                        <Link to="/login">Login</Link>
                    </li>
                        <span> | </span>
                        <li>
                        <Link to="/Signup">Signup</Link>
                        </li>
                </>
                }
                {isloggedIn &&
                    <div className="logindiv">
                        <p className="nameHeader">Hi {username}!</p>
                        <li className="login">
                            <Link to="/" onClick={logOut}>Logout</Link>
                        </li>
                    </div>
                }
            </header>
        );
    }
}