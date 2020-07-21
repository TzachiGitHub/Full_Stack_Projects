import React, {Component} from 'react';
import './App.css'
import axios from 'axios'

export default class newPost extends Component{
    constructor(props) {
        super(props);
        this.state={
            title: "",
            content: "",
            published: "",
            imageUrl: "",
            linkDescription: "",
            loggedInUserId: this.props.loggedInUserId
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
        var {loggedInUserId, title, content, published, imageUrl, linkDescription} = this.state
        if(title !== "" && content !== "" && published !== "" && imageUrl !== "" && this.validURL(imageUrl)) {
            var jsonPost =
                {
                    "title": title,
                    "content": content,
                    "published": published,
                    "imageUrl": imageUrl,
                    "linkDescription": linkDescription,
                    "loggedInUserId": loggedInUserId,
                }
            const deployUrl = "/posts"
            // const localUrl = "http://localhost:5000/posts"
            axios.post(deployUrl, jsonPost)
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

    changeContent = (e) =>{
        this.setState({
            content: e.target.value
        })
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
                    onChange={this.changeContent}
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
