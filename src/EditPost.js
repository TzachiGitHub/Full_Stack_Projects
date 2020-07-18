import React from 'react'
import axios from 'axios'

export default class EditPost extends React.Component{
    constructor(props){
        super(props)
        this.state={
            username: props.username,
            currentPost: this.props.currentPost,
            id: this.props.currentPost.id,
            imageUrl: this.props.currentPost.imageUrl,
            title: this.props.currentPost.title,
            content: this.props.currentPost.content,
            published: this.props.currentPost.published,
            linkDescription: this.props.currentPost.linkDescription,
            authorId: this.props.currentPost.authorId
        }
    }

    updatePost = ()=>{
        const id = this.state.id
        const localUpdateUrl = "http://localhost:5000/editPost"
        // const deployUpdateUrl = "/editPost"
        const updatedPost = {
            id: this.state.id,
            imageUrl: this.state.imageUrl,
            title: this.state.title,
            content: this.state.content,
            published: this.state.published,
            linkDescription: this.state.linkDescription,
            userId: this.state.authorId
        }
        axios.post(localUpdateUrl, updatedPost)
            .then(res=>{
                if(res.status === 200){
                    alert("The Post was updated Successfully!")
                    this.props.history.push("/")
                }
            })
            .catch(err=>{
                console.log(err)
            })
    }


    render(){
        if(this.state){
            if(this.state.currentPost){
                var {title, content, author, imageUrl, linkDescription} = this.state.currentPost
                return(
                    <div>
                        <h1>Edit Post</h1>
                        <input
                            type="text" name="postTitle"
                            className="newPostTitle" required
                            defaultValue={title}
                            placeholder="Post Title"
                            onChange={(e)=>{this.setState({title: e.target.value})}}
                        />
                        <br/><br/>
                        <input
                            name="postContent"
                            defaultValue={content}
                            placeholder="Post content"
                            className="newPostBody" required
                            onChange={(e)=>{this.setState({content: e.target.value})}}
                        />
                        <br/>
                        <input name="author"
                               defaultValue={author}
                               placeholder="Author name"
                               className="author"
                               onChange={(e)=>{this.setState({published: e.target.value})}}
                        />
                        <br/>
                        <input name="imageUrl"
                               placeholder="image url goes here"
                               defaultValue={imageUrl}
                               className="imageurl"
                               onChange={(e)=>{this.setState({imageUrl: e.target.value})}}
                        />                               value={}
                        <br/>
                        <input name="linkDescription"
                               placeholder="Image Description"
                               defaultValue={linkDescription}
                               className="newPostTitle"
                               onChange={(e)=>{this.setState({linkDescription: e.target.value})}}
                        />
                        <br/>
                        <button type="submit" onClick={this.updatePost}>Save Post</button>
                    </div>
                )
            }else{
                return <div>Loading..1</div>
            }
        }
        else{
            return <div>Loading..2</div>
        }
    }
}