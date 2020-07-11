import React, {Component} from 'react';
import './../App.css'
import axios from 'axios'

export default class Comment extends Component{
    constructor(props) {
        super(props);
        const {id, title, content, imageUrl, author} = this.props.comment
        this.state = {
            comment: this.props.comment,
            commentId: this.props.comment.id,
            commentAuthorId: this.props.comment.authorId,
            title: title,
            content: content,
            imageUrl: imageUrl,
            author: author,
            loggedInUserId: this.props.loggedInUserId,
            currentlyEditing: false,
        }
    }

    onEditSubmit = ()=> {
        const localEditCommentUrl = "http://localhost:5000/comment/edit"
        const {loggedInUserId, commentId, title, content, imageUrl, author} = this.state
        const data = {
            title: title,
            content: content,
            imageUrl: imageUrl,
            author: author,
            loggedInUserId: loggedInUserId,
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

    onCancelEdit = () => {
        const {title, content, imageUrl, author, loggedInUserId} = this.props.comment
        this.setState({
            title: title,
            content: content,
            imageUrl: imageUrl,
            author: author,
            currentlyEditing: false,
        })
    }

    onDeleteComment = ()=>{
        const {loggedInUserId, commentId} = this.state
        const localDeleteCommentUrl = "http://localhost:5000/comment/delete"
        const data ={
            commentId: commentId,
            loggedInUserId: loggedInUserId,
        }
        axios.post(localDeleteCommentUrl, data)
            .then(res=>{
                if(res.status === 200){
                    this.setState({
                        currentlyEditing: false
                    })
                    window.location.reload(false)
                }
            })
            .catch(er=>{
                console.log(er)
            })
    }

    render() {
        const {currentlyEditing, title, content, imageUrl, author, loggedInUserId, commentAuthorId} = this.state

        if(this.state){
            return (
                <div className="col-md-4 mb-4">
                    {!currentlyEditing &&
                    <div className="card">
                        <img
                            src={imageUrl}
                            alt="Loading Image.." className="card-img-top"/>
                        <div className="card-body">
                            <h5 className="card-title">{title}</h5>
                            <p className="card-text">{content}</p>
                            <p className="card-text, published">{author}</p>
                            {loggedInUserId && loggedInUserId == commentAuthorId &&
                            <div>
                                <button
                                    onClick={() => this.setState({currentlyEditing: true})}
                                    className="btn btn-outline-success btn-sm">
                                        Edit Comment
                                </button>
                                <button onClick={this.onDeleteComment} className="btn btn-outline-danger btn-sm">
                                    Delete Comment
                                </button>
                            </div>
                            }
                        </div>
                    </div>
                    }
                    {currentlyEditing &&
                        <div>
                            <input onChange={(e)=>{this.setState({imageUrl: e.target.value})}} type="text" defaultValue={imageUrl}/>
                            <input onChange={(e)=>{this.setState({title: e.target.value})}} type="text" defaultValue={title}/>
                            <input onChange={(e)=>{this.setState({content: e.target.value})}} type="text" defaultValue={content}/>
                            <input onChange={(e)=>{this.setState({author: e.target.value})}} type="text" defaultValue={author}/>
                            <button onClick={this.onEditSubmit}>Submit Edit</button>
                            <button onClick={this.onCancelEdit}>Cancel</button>
                        </div>
                    }
                </div>
            )
        }else{
            return <p> Loading.. </p>
        }
    }

}
