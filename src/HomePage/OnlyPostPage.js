import React, {Component} from 'react';
import axios from 'axios';
export default class SinglePost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: props.match.params.id,
            post: [],
            resp: false,
        }
    }

    componentDidMount() {
        const url = 'http://localhost:5000/post/' + this.state.id
        axios.get(url)
            .then((res) => {
                if (res.status === 200) {
                    this.setState({
                        post: res.data,
                        resp: true,
                    })
                    console.log(this.state.post)
                    console.log(this.state.resp)
                }
            })
            .catch(er=>{
                console.log(er)
            });

    }

    render() {
        var {resp, post} = this.state;
        return (
            <div>
                {resp &&
                <div className="blogPosts">
                    <p>{post.title}</p>
                    <img
                        src={post.imageUrl}
                        alt="under
                    Maintanance"
                    />
                    <h3>{post.title}</h3>
                    <p dangerouslySetInnerHTML={{__html: post.content}}></p>
                    <p className="published">{post.published}</p>
                </div>
                }
            </div>
        )
    }
}