import React, {Component} from 'react';
import '../App.css';
import SinglePost from './SinglePost';
// import posts from './PostsData';
import axios from 'axios';


export default class Posts extends Component{
    constructor(props) {
        super(props);
        this.state={
            data: [],
            resp: false
        };
    }

    componentDidMount(){
        const url = "http://localhost:5000/posts"
        axios.get(url).then((res) => {
            if (res.status === 200) {
                this.setState({
                    data: res.data,
                    resp: true
                });
                console.log(res.data)
                console.log(this.data)
            }
        });
    }

    render(){

        var {data, resp} = this.state
        if (this.state) {
            return (
                <div>
                    {resp &&
                    data.map((post) => {
                        return <SinglePost
                            title={post.title}
                            content={post.content}
                            published={post.published}
                            image={post.image}
                            id={post.id}
                            linkDescription={post.linkDescription}
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