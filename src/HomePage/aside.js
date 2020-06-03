import React from 'react';
import '../App.css'

var latestPosts = [
    {
        content: "blog post #1",
        link: "https://www.youtube.com/watch?v=_Yhyp-_hX2s&list=RDeJO5HU_7_1w&index=2"
    },
    {
        content: "blog post #2",
        link: "https://www.youtube.com/watch?v=eJO5HU_7_1w"
    },
    {
        content: "blog post #3",
        link: "https://www.youtube.com/watch?v=hlVBg7_08n0&list=RDeJO5HU_7_1w&index=3"
    },
]

var populaPosts = [
    {
        content: "blog post #1",
        link: "https://www.youtube.com/watch?v=Obim8BYGnOE&list=RDeJO5HU_7_1w&index=5"
    },
    {
        content: "blog post #2",
        link: "https://www.youtube.com/watch?v=UprcpdwuwCg&list=RDeJO5HU_7_1w&index=4"
    },
    {
        content: "blog post #3",
        link: "https://www.youtube.com/watch?v=qQkBeOisNM0&list=RDeJO5HU_7_1w&index=7"
    },
]
var SidePosts = (props) =>{
    return (
        props.posts.map((post)=>{
            return(
                <>
                <li> {post.content}<a href={post.link}>go to page</a></li>
                <br/>
                </>
                )

        })
    )
}
var finalPosts = () => {
    return (
            <div className="asidePost">
                <h1>Latest</h1>
                <ul>
                    <SidePosts
                    posts={latestPosts}/>
                </ul>
                <br/>
                <hr className="line"/>
                <h1>Popular</h1>
                <ul>
                    <SidePosts
                    posts={populaPosts}/>
                </ul>
            </div>
    )
}
export default finalPosts
