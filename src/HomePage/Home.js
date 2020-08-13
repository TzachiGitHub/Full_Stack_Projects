import React from 'react';
import Aside from './aside';
import Posts from '../PostsDir/Posts'

export default class Home extends React.Component {

    render() {
        const {nickname, isLoggedIn, loggedInUserId, setCurrentPost} = this.props
        return (
            <div>
                <h1>This is My Blog</h1>
                <Posts nickname={nickname} isLoggedIn={isLoggedIn} loggedInUserId={loggedInUserId} setCurrentPost={setCurrentPost}/>
                <Aside/>
            </div>
        );
    }
}
