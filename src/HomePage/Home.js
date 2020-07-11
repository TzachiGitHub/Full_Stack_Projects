import React from 'react';
import Aside from './aside';
import Posts from './Posts.js'

export default class Home extends React.Component {

    render() {
        return (
            <div>
                <h1>This is My Blog</h1>
                <Posts isLoggedIn={this.props.isLoggedIn} loggedInUserId={this.props.loggedInUserId} setCurrentPost={this.props.setCurrentPost}/>
                <Aside/>
            </div>
        );
    }
}
