import React from 'react';
import './App.css'
import {Link} from "react-router-dom";

var Header = () => {
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
                <li className="login">
                    <Link to="/login">Login</Link>
                </li>
            </header>
        );
    }


 export default  Header
