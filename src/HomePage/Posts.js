import React, {Component} from 'react';
import '../App.css';
import SinglePost from './SinglePost';
import axios from 'axios';
import './../App.css'

export default class Posts extends Component{
    constructor(props) {
        super(props);
        this.state={
            data: [],
            resp: false,
            isLoggedIn: this.props.isLoggedIn,
            setCurrentPost: this.props.setCurrentPost,
            loggedInUserId: this.props.loggedInUserId
        };
    }

    componentDidMount(){
        const localUrl = "http://localhost:5000/posts"
        //const deployUrl = "/post"
        axios.get(localUrl).then((res) => {
            if (res.status === 200) {
                this.setState({
                    data: res.data,
                    resp: true
                });
            }
        });
    }

    render(){
        var {data, resp, isLoggedIn, loggedInUserId, setCurrentPost} = this.state

        if (this.state) {
            return (
                <div>
                    {resp &&
                    data.map((post) => {
                        return <SinglePost
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