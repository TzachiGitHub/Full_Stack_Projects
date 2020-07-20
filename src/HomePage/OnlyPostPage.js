import React, {Component} from 'react';
import axios from 'axios';
import {Link} from "react-router-dom";
import Comment from './Comment'
import NewComment from '../Comments/NewComment'
import './../App.css'

export default class OnlyPostPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            postId: props.match.params.id,
            post: props.currentPost,
            comments: [],
            resp: false,
            loggedInAsPostAuthor: false,
            isLoggedIn: this.props.isLoggedIn,
            loggedInUserId: this.props.loggedInUserId,
            newCommentButton: false,
        }
        this.getComments = this.getComments.bind(this)
        this.onNewCommentButtonClick = this.onNewCommentButtonClick.bind(this)
    }

    onNewCommentButtonClick = (e)=>{
        this.setState({
            newCommentButton: !this.state.newCommentButton
        })
    }

    onNewCommentSuccess = (e) =>{
        this.setState({
            newCommentButton: false
        })
        this.componentDidMount()
    }


    componentDidMount() {
        if(this.props.currentPost) {
            this.setState({
                isLoggedIn: this.props.isLoggedIn,
                loggedInAsPostAuthor: (this.props.loggedInUserId === this.props.currentPost.authorId) ? true : false,
            })
            this.getComments()
        }
    }

    getComments = () => {
        const {post} = this.state
        if(post) {
            const localCommentsUrl = "http://localhost:5000/comments/" + post.id
            // const deployCommentsUrl = "/comments/" + post.id
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
        }else{
            console.log("the OnlyPostPage didn't receive the currentPost object")
        }
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
        var {post, isLoggedIn, comments, loggedInUserId, loggedInAsPostAuthor} = this.state
        if(post) {
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
                            <Link onClick={this.deletePost} to="/home">Delete Post</Link>
                        </>}
                    </div>
                    <section id="gallery">
                        <div className="container">
                            {comments.map(comment => {
                                return <Comment {...this.props} comment={comment} loggedInUserId={loggedInUserId}/>
                            })}
                        </div>
                        {isLoggedIn && !this.state.newCommentButton &&
                        <button onClick={this.onNewCommentButtonClick}>Add New Comment</button>
                        }
                        {isLoggedIn && this.state.newCommentButton &&
                        <div>
                            <NewComment postId={this.state.post.id} authorId={this.state.loggedInUserId}
                                        onSuccess={this.onNewCommentSuccess}/>
                            <button onClick={this.onNewCommentButtonClick}>Cancel New Comment</button>
                        </div>
                        }
                    </section>
                </div>
            )
        }else{
            return (
                <div>
                    <p>Please go to the Home Page:</p>
                    <Link to="/">HomePage</Link>
                </div>
            )
        }
    }
}