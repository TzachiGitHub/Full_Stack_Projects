import React, {Component} from 'react';
import './App.css'
import axios from 'axios'

export default class newPost extends Component{
    constructor() {
        super();
        this.state = {
            title: "",
            content: "",
            published: "",
            imageUrl: "",
            linkDescription: ""
        }
    }
    addPost = (e) =>{
        var {title, content, published, imageUrl} = this.state
        if(title !== "" && content !== "" && published !== "" && imageUrl !== "") {
            var {title, content, published, imageUrl, linkDescription} = this.state
            var jsonPost =
                {
                    "title": title,
                    "content": content,
                    "published": published,
                    "imageUrl": imageUrl,
                    "linkDescription": linkDescription
                }
            console.log(jsonPost)
            const url = "http://localhost:5000/posts"
            axios.post(url, jsonPost)
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
            alert("Please Fill the relevant fields.")
        }
    }

    render(){
        return (
            <div>
                <h1>Create New Post</h1>
                <input
                    type="text" name="postTitle" placeholder="Post title goes here.."
                    className="newPostTitle" required
                    onChange={(e)=>{this.setState({title: e.target.value})}}
                />
                <br/><br/>
                <input name="postContent" placeholder="Post content goes here.."
                    className="newPostBody" required
                    onChange={(e)=>{this.setState({content: e.target.value})}}
                />
                <br/>
                <input name="published" placeholder="author name goes here"
                       className="newPostTitle"
                       onChange={(e)=>{this.setState({published: e.target.value})}}
                />
                <br/>
                <input name="imageUrl" placeholder="image url goes here"
                       className="newPostTitle"
                       onChange={(e)=>{this.setState({imageUrl: e.target.value})}}
                />
                <br/>
                <input name="linkDescription" placeholder="optional: adding link description (if the link is offline)"
                       className="newPostTitle"
                       onChange={(e)=>{this.setState({linkDescription: e.target.value})}}
                />
                <br/>
                <button type="submit" onClick={this.addPost}>Save Post</button>
            </div>
        )
    }
}
