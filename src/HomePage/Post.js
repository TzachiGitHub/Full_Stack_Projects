import React from 'react';
import '../App.css';
import SinglePost from './SinglePost';
import posts from './PostsData';

var Posts = () => {
    return (
        <div>
            {posts.map((post) =>{
            return <SinglePost
                title={post.title}
                content={post.content}
                published={post.published}
                image={post.image}
                number={post.number}
                linkDescription={post.linkDescription}
                />
        })}
        </div>
    )
}


export default Posts;