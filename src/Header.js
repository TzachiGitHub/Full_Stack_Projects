import React from 'react';
import '../App.css'
import {Link} from "react-router-dom";

export default class Header extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoggedIn: false,
            username: ""
        }
    }

    render() {
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
                {!this.isLoggedin &&
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
                {/*{!this.isLoggedin && */}
            </header>
        );
    }
}