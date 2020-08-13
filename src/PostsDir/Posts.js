import React, {Component} from 'react';
import '../App.css';
import SinglePost from './SinglePost';
import axios from 'axios';
import './../App.css'

export default class Posts extends Component{
    constructor(props) {
        super(props);
        const {nickname, isLoggedIn, setCurrentPost, loggedInUserId} = this.props
        this.state={
            data: [],
            resp: false,
            userNickname: nickname,
            isLoggedIn: isLoggedIn,
            setCurrentPost: setCurrentPost,
            loggedInUserId: loggedInUserId,
        };
    }

    componentDidMount(){
        const localUrl = "http://localhost:5000/posts"
        // const deployUrl = "/posts"
        axios.get(localUrl).then((res) => {
            if (res.status === 200) {
                this.setState({
                    data: res.data,
                    resp: true
                });
            }
        })
            .catch(er=>{
                console.log(er)
            })
    }

    render(){
        var {data, resp, isLoggedIn, loggedInUserId, setCurrentPost, userNickname} = this.state

        if (this.state) {
            return (
                <div>
                    {resp &&
                    data.map((post) => {
                        return <SinglePost
                            userNickname={userNickname}
                            key={post.id}
                            post={post}
                            loggedInUserId={loggedInUserId}
                            isLoggedIn={isLoggedIn}
                            setCurrentPost={setCurrentPost}
                        />
                    })}
                </div>
            )
        }else{
            return(
                <div>Loading..</div>
            )
        }
    }
}