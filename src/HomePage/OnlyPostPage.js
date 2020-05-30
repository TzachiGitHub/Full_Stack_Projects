import React from 'react';
import posts from './PostsData';
import {useParams} from 'react-router-dom'

function SinglePost(){
    var {number} = useParams();
    return (
        <div className="blogPosts">
            <p>{posts[number - 1].title}</p>
            <img src={posts[number - 1].image} alt="X"/>
            <h3>{posts[number - 1].title}</h3>
            <p dangerouslySetInnerHTML={{__html: posts[number - 1].content}}></p>
            <p className="published">{posts[number - 1].published}</p>
        </div>
    )
}

export default SinglePost;