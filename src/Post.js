import React from 'react';
import './blog.css'

var posts = [
    {
        title: "Blog Post #1",
        startContent: "My ",
        strongText: 'first blog post ',
        middleText: 'is all about my ',
        redText: 'blog post ',
        mostContent: "and how to write a new post in my ",
        lastContent: "blog, you can find it ",
        linkDescription: "here",
        image: "https://static2.clutch.co/s3fs-public/logos/imagex.png?8LJHsHudIJsZ7HDb.z6r7w35ShAkg1fp",
        published: 'Published 1 days ago by Israel',
        link: 'https://www.youtube.com/watch?v=TONLzXk2b40'
    },
    {
        title: "Blog Post #2",
        startContent: "My ",
        strongText: 'first blog post ',
        middleText: 'is all about my ',
        redText: 'blog post ',
        mostContent: "and how to write a new post in my ",
        lastContent: "blog, you can find it ",
        linkDescription: "here",
        image: "https://static2.clutch.co/s3fs-public/logos/imagex.png?8LJHsHudIJsZ7HDb.z6r7w35ShAkg1fp",
        published: 'Published 2 days ago by Israel',
        link: 'https://www.youtube.com/watch?v=m9DO3zpdWqw&list=RDm9DO3zpdWqw&start_radio=1'
    },
    {
        title: "Blog Post #3",
        startContent: "My ",
        strongText: 'first blog post ',
        middleText: 'is all about my ',
        redText: 'blog post ',
        mostContent: "and how to write a new post in my ",
        lastContent: "blog, you can find it ",
        linkDescription: "here",
        image: "https://static2.clutch.co/s3fs-public/logos/imagex.png?8LJHsHudIJsZ7HDb.z6r7w35ShAkg1fp",
        published: 'Published 3 days ago by Israel',
        link: 'https://www.youtube.com/watch?v=cNld-AHw-Wg&list=RDcNld-AHw-Wg&start_radio=1'
    },
    {
        title: "Blog Post #4",
        startContent: "My ",
        strongText: 'first blog post ',
        middleText: 'is all about my ',
        redText: 'blog post ',
        mostContent: "and how to write a new post in my ",
        lastContent: "blog, you can find it ",
        linkDescription: "here",
        image: "https://static2.clutch.co/s3fs-public/logos/imagex.png?8LJHsHudIJsZ7HDb.z6r7w35ShAkg1fp",
        published: 'Published 4 days ago by Israel',
        link: 'https://www.youtube.com/watch?v=rvBXx2MZA5Q'
    }
    ]

var Post = (post) => {
    return (
        <div className="blogPosts">
            <div>
                <img src={post.image}/>
                <h3>{post.title}</h3>
                <p>{post.startContent}<strong>{post.strongText}</strong>{post.middleText}<span className="red">{post.redText}</span>
                    {post.mostContent}<br/>{post.lastContent}<a href={post.link}>{post.linkDescription}</a>.</p>
                <p className="published">{post.published}</p>
            </div>
        </div>
    )
}

var Posts = () => {
    return posts.map((post) =>{
        return <Post
            title={post.title}
            startContent={post.startContent}
            strongText={post.strongText}
            middleText={post.middleText}
            redText={post.redText}
            mostContent={post.mostContent}
            lastContent={post.lastContent}
            linkDescription={post.linkDescription}
            image={post.image}
            published={post.published}
            link={post.link}
            />
    })
}


export default Posts