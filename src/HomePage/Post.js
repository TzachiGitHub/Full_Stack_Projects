import React from 'react';
import '../App.css';
import SinglePost from './SinglePost';
import posts from './PostsData';

class Post extends React.component{
    constructor(props) {
        super();
        this.state = {

        }
    }
}

var Posts = () => {
    return (
        <div>
            {posts.map((post) =>{
            return <SinglePost
                title={post.title}
                content={post.content}
                published={post.published}
                image={post.image}
                id={post.id}
                linkDescription={post.linkDescription}
                />
        })}
        </div>
    )
}


export default Posts;