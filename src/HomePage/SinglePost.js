import React from 'react';
import {Link} from 'react-router-dom'

var SinglePost = (props) => {
    return (
        <div className="blogPosts">
            <div>
                <img src={props.image} alt="X"/>
                <h3>{props.title}</h3>
                <p dangerouslySetInnerHTML={{__html: props.content}}></p>
                <p className="published">{props.published} <Link to={location =>`/post/${props.number}`}> {props.linkDescription}.</Link></p>
            </div>
        </div>
    )
}



export default SinglePost;