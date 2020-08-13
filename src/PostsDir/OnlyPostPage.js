import React, {Component} from 'react';
import axios from 'axios';
import Tags from '../TagsDir/Tags'
import {Link} from "react-router-dom";
import Comment from '../Comments/Comment'
import NewComment from '../Comments/NewComment'
import '../App.css'

export default class OnlyPostPage extends Component {
    constructor(props) {
        super(props);
        const {currentPost, isLoggedIn, loggedInUserId} = this.props
        this.state = {
            userNickname: currentPost.author,
            postId: currentPost.id,
            post: currentPost,
            comments: [],
            tags: [],
            resp: false,
            loggedInAsPostAuthor: (parseInt(currentPost.authorId) === parseInt(loggedInUserId)),
            isLoggedIn: isLoggedIn,
            loggedInUserId: loggedInUserId,
            newCommentButton: false,
        }
        console.log(this.state)
        console.log(this.props)
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
            this.getTags()
            this.getComments()
        }
    }

    getTags = () => {
        const {post, loggedInUserId} = this.state
        if(post){
            const {postId} = this.state
            console.log(this.state)
            const localTagsUrl = "http://localhost:5000/post/" + postId + "/tags"
            // const deployTagsUrl = "/post/" + postId + "/tags"
            const data = {
                "postId": postId,
                "loggedInUserId": loggedInUserId
            }
            console.log(data)
            axios.get(localTagsUrl, data)
                .then(res=>{
                    if(res.status === 200){
                        console.log("HEEEERE are the tags: ")
                        console.log(data)
                        this.setState({
                            tags: res.data,
                            isLoggedIn: this.props.isLoggedIn,
                            loggedInAsPostAuthor: (this.props.loggedInUserId === this.props.currentPost.authorId) ? true : false,
                        })
                    }
                    console.log("tags ==")
                    console.log(this.state.tags)
                })
                .catch(err=>{
                    console.log(err)
                })
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
                            resp: true
                        });
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
        var {postId, post, isLoggedIn, comments, loggedInUserId, loggedInAsPostAuthor, userNickname, tags} = this.state
        if(post) {
            return (
                <div>
                    <div className="post">
                        <img src={post.imageUrl}
                             alt="X"
                        />
                        <h3>{post.title}</h3>
                        <p dangerouslySetInnerHTML={{__html: post.content}}></p>
                        <p className="published">written by {userNickname} </p>
                        {isLoggedIn && loggedInAsPostAuthor &&
                        <>
                            <Link onClick={()=> this.props.onEditUpdateTags(tags)} to="/editPost">Edit Post</Link>
                            <span> | </span>
                            <Link onClick={this.deletePost} to="/">Delete Post</Link>
                        </>}
                        <Tags
                            loggedInUserId={loggedInUserId}
                            postId={postId}
                        />
                    </div>
                    <section id="gallery">
                        <div className="container">
                            {comments.map((comment, index) => {
                                return <Comment key={index} {...this.props} comment={comment} loggedInUserId={loggedInUserId}/>
                            })}
                        </div>
                        {isLoggedIn && !this.state.newCommentButton &&
                        <button onClick={this.onNewCommentButtonClick}>Add New Comment</button>
                        }
                        {isLoggedIn && this.state.newCommentButton &&
                        <div>
                            <NewComment
                                userNickname={userNickname}
                                postId={this.state.post.id}
                                authorId={this.state.loggedInUserId}
                                onSuccess={this.onNewCommentSuccess}/>
                            <button
                                onClick={this.onNewCommentButtonClick}>
                                Cancel New Comment
                            </button>
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