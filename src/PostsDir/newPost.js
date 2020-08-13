import React, {Component} from 'react';
import '../App.css'
import axios from 'axios'

export default class newPost extends Component{
    constructor(props) {
        super(props);
        let title, content, author, imageUrl, currentPost, postId, authorId;
        currentPost = this.props.currentPost
        title = currentPost ? currentPost.title : ""
        content = currentPost ? currentPost.content : ""
        imageUrl = currentPost ? currentPost.imageUrl : ""
        author = currentPost ? currentPost.author : ""
        postId = currentPost ? currentPost.id : null
        authorId = currentPost ? currentPost.authorId : this.props.loggedInUserId

        this.state={
            title: title || "",
            content: content || "",
            author: author || this.props.nickname,
            imageUrl: imageUrl || "",
            loggedInUserId: this.props.loggedInUserId,
            nickname: props.nickname,
            currentPost: currentPost,
            authorId: authorId,
            tags: this.props.tags || [],
            postId: postId,
        }
    }

    validURL = (str)=> {
        var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
            '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
            '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
            '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
            '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
        return !!pattern.test(str);
    }

    addPost = (e) =>{
        var {loggedInUserId, title, content, author, imageUrl} = this.state
        if(title !== "" && content !== "" && imageUrl !== "" && this.validURL(imageUrl)) {
            var jsonPost =
                {
                    "title": title,
                    "content": content,
                    "author": author,
                    "imageUrl": imageUrl,
                    "loggedInUserId": loggedInUserId,
                }
            // const deployUrl = "/posts"
            const localUrl = "http://localhost:5000/posts"
            axios.post(localUrl, jsonPost)
                .then((res) => {
                    if (res.status === 200) {
                        this.setState({
                            resp: true
                        });
                        this.props.history.push('/')
                    }
                })
                .catch(er => {
                    console.log(er)
                })
        }else{
            alert("Please Fill the relevant fields correctly.")
        }
    }

    updatePost = (e) =>{
        var {postId, loggedInUserId, title, content, imageUrl} = this.state
        if(title !== "" && content !== "" && imageUrl !== "" && this.validURL(imageUrl)) {
            var jsonPost =
                {
                    "postId": postId,
                    "title": title,
                    "content": content,
                    "imageUrl": imageUrl,
                    "loggedInUserId": loggedInUserId,
                }
            // const deployUrl = "/posts"
            const localUrl = "http://localhost:5000/posts"
            axios.put(localUrl, jsonPost)
                .then((res) => {
                    if (res.status === 200) {
                        this.setState({
                            resp: true
                        });
                        this.props.history.push('/')
                    }
                })
                .catch(er => {
                    console.log(er)
                })
        }else{
            alert("Please Fill the relevant fields correctly.")
        }
    }


    addTag = event => {
        let updatedTags = this.state.tags
        if ((event.key === "Space" || event.key === "Enter") && event.target.value !== "") {
            updatedTags.push(event.target.value)
            this.setState({
                tags: updatedTags
            })
            event.target.value = "";
        }else{
            alert("Please enter a valid tag")
        }
    }

    render(){
        const currentPost = this.state.currentPost
        if(this.state) {
            let tags = currentPost ? currentPost.tags : "";
            let title = currentPost ? currentPost.title : "";
            let content = currentPost ? currentPost.content : "";
            let imageUrl = currentPost ? currentPost.imageUrl : "";
            return (
                <div className="form-group">
                    <h1>Create New Post</h1>
                    <span>Title: </span>
                    <input
                        type="text" name="postTitle" placeholder="typing.."
                        className="form-control" required
                        defaultValue={title}
                        onChange={(e) => {
                            this.setState({title: e.target.value})
                        }}
                    />
                    <br/><br/>
                    <span>Content: </span>
                    <textarea
                        name="postContent"
                        defaultValue={content}
                        placeholder="typing.."
                        className="form-control" required
                        id="newPostBody"
                        onChange={(e) => {
                            this.setState({content: e.target.value})
                        }}
                    />
                    <br/><br/>
                    <span>Image Url: </span>
                    <input
                        name="imageUrl"
                        placeholder="www..."
                        defaultValue={imageUrl}
                        className="form-control"
                        onChange={(e) => {this.setState({imageUrl: e.target.value})}}
                    />
                    <br/>
                    <input
                        name="tags"
                        defaultValue={tags}
                        placeholder="#hashtag"
                        className="form-control"
                        onChange={this.updateTags}
                    />
                    <br/>
                    <button
                        type="submit"
                        className="btn btn-primary"
                        id="new-post-submit-button"
                        onClick={()=>{currentPost ? this.updatePost() : this.addPost()}}
                    > Save Post
                    </button>
                </div>
            )
        }else{
            return (
                <div>Loading state..</div>
            )
        }
    }
}