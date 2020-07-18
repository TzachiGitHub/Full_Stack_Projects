import React, {Component} from 'react';
import axios from 'axios';
import {Link} from "react-router-dom";
import Comment from './Comment'
import NewComment from '../Comments/NewComment'
import './../App.css'

export default class SinglePost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            postId: props.match.params.id,
            post: [],
            comments: [],
            resp: false,
            loggedInAsPostAuthor: false,
            isLoggedIn: this.props.isLoggedIn,
            loggedInUserId: this.props.loggedInUserId,
            newCommentButton: false,
        }
        this.getComments = this.getComments.bind(this)
    }

    onNewCommentButtonClick = (e)=>{
        this.setState({
            newCommentButton: !this.state.newCommentButton
        })

    }

    onNewCommentSuccess = (e) =>{
        window.location.reload(false)
    }


    componentDidMount() {
        this.setState({
            isLoggedIn: this.props.isLoggedIn
        })
        const localUrlGetPost = 'http://localhost:5000/post/' + this.state.postId
        // const deployUrlGetPost = '/post/' + this.state.postId
        axios.get(localUrlGetPost)
            .then((res) => {
                if (res.status === 200) {
                    this.setState({
                        post: res.data,
                        loggedInAsPostAuthor: (this.state.loggedInUserId == res.data.authorId) ? true : false,
                    })
                    this.getComments(res.data)
                }
            })
            .catch(er=>{
                console.log(er)
            });
    }

    getComments = (post) => {
        const localCommentsUrl = "http://localhost:5000/comments/" + post.id
        axios.get(localCommentsUrl)
            .then(commentResponse => {
                if (commentResponse.status === 200) {
                    this.setState({
                        comments: commentResponse.data,
                        resp: true,
                    })
                }
            })
            .catch(er => {
                console.log(er)
            })
    }

    deletePost = () =>{
        const localDeleteUrl = "http://localhost:5000/deletePost"
        // const deployDeleteUrl = "/deletePost"
        const data = this.state.post
        axios.post(localDeleteUrl, data)
            .then(res=>{
                if(res.status === 200){
                    alert("Post Deleted Successfully!")
                    window.location.reload(false);
                }
            })
            .catch(er=>{
                console.log(er)
            })
    }

    render() {
        var {postId, resp, post, isLoggedIn, comments, loggedInUserId, loggedInAsPostAuthor} = this.state;

        if(resp) {
            return (
                <div>
                    <div className="post">
                        <img src={post.imageUrl}
                             alt="under Maintanance"
                        />
                        <h3>{post.title}</h3>
                        <p dangerouslySetInnerHTML={{__html: post.content}}></p>
                        <p className="published">{post.published} </p>
                        {isLoggedIn && loggedInAsPostAuthor &&
                        <>
                            <Link to="/editPost">Edit Post</Link>
                            <span> | </span>
                            <Link onClick={this.deletePost} to="/">Delete Post</Link>
                        </>}
                    </div>
                    <section id="gallery">
                        <div className="container">
                            {comments.map(comment => {
                                return <Comment {...this.props} comment={comment} commentAuthorId={post.authorId} loggedInUserId={loggedInUserId}/>
                            })}
                        </div>
                        {isLoggedIn && !this.state.newCommentButton &&
                            <button onClick={this.onNewCommentButtonClick}>Add New Comment</button>
                        }
                        {isLoggedIn && this.state.newCommentButton &&
                        <div>
                            <NewComment postId={this.state.post.id} authorId={this.state.loggedInUserId} onSuccess={this.onNewCommentSuccess}/>
                            <button onClick={this.onNewCommentButtonClick}>Cancel New Comment</button>
                        </div>
                        }
                    </section>
                </div>
            )
        }else{
            return <p> Loading.. </p>
        }
    }
}