import React from 'react';
import {Link} from 'react-router-dom'
import axios from 'axios'
import './../App.css'

export default class SinglePost extends React.Component{
    constructor(props) {
        super(props);

        this.state={
            post: this.props.post,
            loggedInUserId: this.props.loggedInUserId,
            isLoggedIn: this.props.isLoggedIn,
            setCurrentPost: this.props.setCurrentPost
        }
    }

    componentDidMount(){
        this.setState({
            loggedInUserId: this.props.loggedInUserId,
            isLoggedIn: this.props.isLoggedIn,
            setCurrentPost: this.props.setCurrentPost
        })
    }

    deletePost = () =>{
        const localDeleteUrl = "http://localhost:5000/deletePost"
        // const deployDeleteUrl = "/deletePost"
        const data = this.props.post
        axios.post(localDeleteUrl, data)
            .then(res=>{
                if(res.status === 200){
                    alert("Post Deleted Successfully!")
                }
            })
            .catch(er=>{
                console.log(er)
            })
    }

    render() {
        var {isLoggedIn, loggedInUserId} = this.state
        var {id, imageUrl, title, content, published, linkDescription, authorId} = this.props.post
        linkDescription = (linkDescription !== "") ? linkDescription : "X"

        return (
            <div className="blogPosts">
                <div>
                    <img src={imageUrl} alt={linkDescription}/>
                    <h3>{title}</h3>
                    <p dangerouslySetInnerHTML={{__html: content}}></p>
                    <p>published by {published}.</p>
                    <div className="postLinks">
                        <div className="FullPostLink">
                            <Link onClick={(props)=>{this.props.setCurrentPost(this.props.post)}} to={location => `/posts/${id}`}>View Full Post</Link>
                        </div>
                        {isLoggedIn &&
                            (loggedInUserId === authorId) &&

                            <div id="deletePostLink">
                                <Link onClick={this.deletePost} to="/about">Delete Post</Link>
                            </div>
                        }
                    </div>
                </div>
            </div>
        )
    }
}