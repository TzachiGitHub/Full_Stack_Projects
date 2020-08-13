import React, {Component} from 'react';
import '../App.css'
import axios from 'axios'
import {Link} from "react-router-dom";

export default class Comment extends Component{
    constructor(props) {
        super(props);

        const {id, postId, title, content, imageUrl, author, authorId} = this.props.comment
        this.state = {
            comment: this.props.comment,
            commentId: id,
            postId: postId,
            commentAuthorIdString: authorId,
            title: title,
            content: content,
            imageUrl: imageUrl,
            author: author,
            loggedInUserIdString: this.props.loggedInUserId,
            currentlyEditing: false,
        }
    }

    onEditSubmit = ()=> {
        const localEditCommentUrl = "http://localhost:5000/comment/edit"
        // const deployEditCommentUrl = "/comment/edit"
        const {loggedInUserIdString, commentId, title, content, imageUrl, author} = this.state
        const data = {
            title: title,
            content: content,
            imageUrl: imageUrl,
            author: author,
            loggedInUserId: loggedInUserIdString,
            commentId: commentId,
        }
        axios.post(localEditCommentUrl, data)
            .then(res=>{
                if(res.status === 200){
                    this.setState({
                        currentlyEditing: false,
                    })
                }
            })
            .catch(er=> {
                console.log(er)
            })
    }

    onEditComment = ()=>{
        console.log("from onEditComment: this.state.loggedInUserId == ")
        console.log(this.state.loggedInUserIdString)
        if(this.state.loggedInUserIdString) {
            this.setState({
                currentlyEditing: !this.state.currentlyEditing
            })
        }else{
            alert("Please Login first")
        }
    }


    onCancelEdit = () => {
        const {title, content, imageUrl, author} = this.props.comment
        this.setState({
            title: title,
            content: content,
            imageUrl: imageUrl,
            author: author,
            currentlyEditing: false,
        })
    }

    onDeleteComment = ()=>{
        const {loggedInUserIdString, commentId} = this.state
        const localDeleteCommentUrl = "http://localhost:5000/comment/delete"
        // const deployDeleteCommentUrl = "/comment/delete"
        const data ={
            commentId: commentId,
            loggedInUserId: loggedInUserIdString,
        }
        axios.post(localDeleteCommentUrl, data)
            .then(res=>{
                if(res.status === 200){
                    this.setState({
                        currentlyEditing: false
                    })
                    this.props.history.push("/")
                }
            })
            .catch(er=>{
                console.log(er)
            })
    }

    render(){
        const {currentlyEditing, title, content, imageUrl, loggedInUserIdString, commentAuthorIdString, author, authorId} = this.state

        const loggedInUserId = parseInt(loggedInUserIdString)
        const commentAuthorId = parseInt(commentAuthorIdString)
        const postLink = "/posts/" + this.state.comment['postId']

        return (
            <div className="media-body p-2 shadow-sm rounded bg-light border">
                {!currentlyEditing &&
                <div>
                    <img
                        className="mr-3 bg-light rounded commentImage"
                        width="48"
                        height="48"
                        src={imageUrl}
                        alt={title}
                    />

                        <div>
                            <h6 className="mt-0 mb-1 text-muted comment-title">{title}</h6>
                            <p className="inline">{content}</p>
                            <small>Written by {author}.</small>
                        </div>
                    {commentAuthorId === loggedInUserId &&
                        <div>
                            <button className="btn btn-outline-primary btn-sm"
                                  onClick={this.onEditComment}>
                                Edit
                            </button>
                            <Link
                            to={postLink}
                            onClick={this.onDeleteComment}
                            className="btn btn-outline-danger btn-sm">
                            Delete Comment
                            </Link>
                        </div>
                    }
                </div>
                }

                {currentlyEditing &&
                <div>
                    <br/>
                    <span>Title: </span>
                    <input
                        className="comment-input"
                        onChange={(e) => {this.setState({title: e.target.value})}}
                        type="text"
                        defaultValue={title}
                    />
                    <br/>
                    <br/>
                    <p>
                        <span>image Url:</span>
                        <input
                            className="comment-input"
                            onChange={(e) => {this.setState({imageUrl: e.target.value})}}
                            type="text"
                            defaultValue={imageUrl}
                        />
                        <br/><br/>
                        <span>Content: </span>
                        <input
                            className="comment-input"
                            onChange={(e) => {this.setState({content: e.target.value})}}
                            type="text"
                            defaultValue={content}
                        />
                    </p>
                    <br/>
                    <br/>
                    <button onClick={this.onEditSubmit}>Submit Edit</button>
                    <button onClick={this.onCancelEdit}>Cancel</button>
                </div>
                }
            </div>
        );
    }

    // render() {
    //     const {currentlyEditing, title, content, imageUrl, loggedInUserIdString, commentAuthorIdString, author} = this.state
    //
    //     const loggedInUserId = parseInt(loggedInUserIdString)
    //     const commentAuthorId = parseInt(commentAuthorIdString)
    //
    //     if(this.state){
    //        const postLink = "/posts/" + this.state.comment['postId']
    //         return (
    //             <div className="col-md-4 mb-4">
    //                 {!currentlyEditing &&
    //                 <div className="card">
    //                     <img
    //                         src={imageUrl}
    //                         alt="Loading.." className="card-img-top"/>
    //                     <div className="card-body">
    //                         <h5 className="card-title">{title}</h5>
    //                         <p className="card-text">{content}</p>
    //                         <p className="card-text, published">{author}</p>
    //                         {(loggedInUserId != null) && loggedInUserId === commentAuthorId &&
    //                         <div>
    //                             <button
    //                                 onClick={() => this.setState({currentlyEditing: true})}
    //                                 className="btn btn-outline-success btn-sm">
    //                                 Edit Comment
    //                             </button>
    //                             <Link to={postLink} onClick={this.onDeleteComment}
    //                                   className="btn btn-outline-danger btn-sm">
    //                                 Delete Comment
    //                             </Link>
    //                         </div>
    //                         }
    //                     </div>
    //                 </div>
    //                 }
    //                 {currentlyEditing &&
    //                 <div>
    //                     <br/>
    //                     <span>Title: </span>
    //                     <input
    //                         onChange={(e) => {this.setState({title: e.target.value})}}
    //                         type="text"
    //                         defaultValue={title}
    //                     />
    //                     <br/>
    //                     <br/>
    //                     <span>image Url: </span>
    //                     <input
    //                         className="inputUrl"
    //                         onChange={(e) => {this.setState({imageUrl: e.target.value})}}
    //                         type="text"
    //                         defaultValue={imageUrl}
    //                     />
    //                     <br/><br/>
    //                     <span>Content: </span>
    //                     <input
    //                         onChange={(e) => {this.setState({content: e.target.value})}}
    //                         type="text"
    //                         defaultValue={content}
    //                     />
    //                     <br/>
    //                     <br/>
    //                     <button onClick={this.onEditSubmit}>Submit Edit</button>
    //                     <button onClick={this.onCancelEdit}>Cancel</button>
    //                 </div>
    //                 }
    //             </div>
    //         )
    //     }else{
    //         return <p> Loading.. </p>
    //     }
    // }

}
