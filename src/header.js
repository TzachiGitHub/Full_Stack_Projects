import React from 'react';
import './blog.css'
import Section from "./section";
import Aside from "./aside";

var Header = () => {
    return (
        <div>


            <nav className={"topnav"}>
                <li><a className="active" href="https://www.youtube.com/watch?v=IwWUL0HbRhY">Home</a></li>
                <li><span>|</span></li>
                <li><a className="active" href="https://www.linkedin.com/in/tzachi-elrom/">About me</a></li>
                <li><span>|</span></li>
                <li><a href="https://www.facebook.com/Tzachi.Elrom/">Contact Me </a></li>
                <li className="login"><a href="https://www.youtube.com/watch?v=GAOBXGPuKqo">Login</a></li>
            </nav>
            <Section/>
            <Aside/>
        </div>
    )
}
export default Header