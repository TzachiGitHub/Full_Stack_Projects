import React, {Component} from 'react';
import '../App.css'
import axios from 'axios'

export default class NewComment extends Component{
    constructor(props) {
        super(props);
        this.state={
            title: "",
            content: "",
            imageUrl: "",
            author: "",
            authorId: this.props.authorId,
            postId: this.props.postId,
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

    addComment = (e) =>{
        var {postId, authorId, title, content, imageUrl, author} = this.state

        if(title !== "" && content !== "" && author !== "" && imageUrl !== "" && this.validURL(imageUrl)) {
            var jsonPost =
                {
                    "title": title,
                    "content": content,
                    "author": author,
                    "imageUrl": imageUrl,
                    "authorId": authorId,
                    "postId": postId
                }
            // const deployUrl = "/comment"
            const localUrl = "http://localhost:5000/comment"
            axios.post(localUrl, jsonPost)
                .then((res) => {
                    console.log("we are in the onComment")
                    this.props.onSuccess()
                })
                .catch(er => {
                    console.log(er)
                })
        }else{
            alert("Please Fill the relevant fields correctly.")
        }
    }


    render(){
        return (
            <div>
                <h1>Create New Comment</h1>
                <input
                    type="text" name="commentTitle" placeholder="Comment title goes here"
                    className="commentTitle" required
                    onChange={(e)=>{this.setState({title: e.target.value})}}
                />
                <br/><br/>
                <input name="commentContent" placeholder="Comment content goes here"
                       className="commentContent" required
                       onChange={(e)=>{this.setState({content: e.target.value})}}
                />
                <br/>
                <input name="published" placeholder="author name goes here"
                       className="newPostTitle"
                       onChange={(e)=>{this.setState({author: e.target.value})}}
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
                <button onClick={this.addComment}>Save Comment</button>
            </div>
        )
    }
}
