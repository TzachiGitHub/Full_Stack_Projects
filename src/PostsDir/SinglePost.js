import React from 'react';
import {Link} from 'react-router-dom'
import axios from 'axios'
import Tags from '../TagsDir/Tags'
import '../App.css'

export default class SinglePost extends React.Component{
    constructor(props) {
        super(props);
        const {userNickname, post, loggedInUserId, isLoggedIn, setCurrentPost} = this.props
        this.state={
            post: post,
            loggedInUserId: loggedInUserId,
            isLoggedIn: isLoggedIn,
            setCurrentPost: setCurrentPost,
            userNickname: userNickname,
        }
    }

    componentDidMount(){
        const {userNickname, post, loggedInUserId, isLoggedIn, setCurrentPost} = this.props
        this.setState({
            post: post,
            userNickname: userNickname,
            loggedInUserId: loggedInUserId,
            isLoggedIn: isLoggedIn,
            setCurrentPost: setCurrentPost,
        })
    }

    deletePost = () =>{
        const localDeleteUrl = "http://localhost:5000/deletePost"
        // const deployDeleteUrl = "/deletePost"
        const data = this.props.post
        axios.post(localDeleteUrl, data)
            .then(res=>{
                if(res.status === 200){
                    alert("Post Deleted Successfully!")
                }
                window.location.reload(false)
            })
            .catch(er=>{
                console.log(er)
            })
    }


    render() {
        var {isLoggedIn, loggedInUserId} = this.state
        var {imageUrl, title, content, author, authorId, id} = this.props.post

        return (
            <div className="blogPosts">
                <div>
                    <img src={imageUrl} alt="X"/>
                    <h3>{title}</h3>
                    <p dangerouslySetInnerHTML={{__html: content}}></p>
                    <div className="postLinks">
                        <div className="FullPostLink">
                            <Link onClick={(props)=>{this.props.setCurrentPost(this.props.post)}} to='/post'>View Full Post</Link>
                        </div>
                        <span className="writtenBy">Written by {author}.</span>
                        <Tags loggedInUserId={loggedInUserId} postId={id} />
                        {isLoggedIn &&
                            (parseInt(loggedInUserId) === parseInt(authorId)) &&
                            <div id="deletePostLink">
                                <Link onClick={this.deletePost} to="/">Delete Post</Link>
                            </div>
                        }
                    </div>
                </div>
            </div>
        )
    }
}