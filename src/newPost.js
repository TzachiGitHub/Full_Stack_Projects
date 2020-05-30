import React from 'react';
import './App.css'

var PostRegistration = () => {
    return (
        <form onSubmit="">
            <h1>Create New Post</h1>
            <input type="text" name="postTitle" placeholder="Post title goes here.." className="newPostTitle" required/>
            <br/><br/>
            <input name="postContent" placeholder="Post content goes here.." className="newPostBody" required/>
            <br/>
            <button>Save Post</button>
        </form>
    )
}


export default PostRegistration
