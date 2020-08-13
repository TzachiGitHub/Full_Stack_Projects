import React from 'react'
import '../App.css'
import axios from 'axios'

export default class Tags extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loggedInUserId: props.loggedInUserId,
            postId: props.postId,
            tags: [],
        }
    }

    // componentDidMount(){
    //     const {postId} = this.state
    //     //console.log(this.state)
    //     const localTagsUrl = "http://localhost:5000/post/" + postId + "/tags"
    //     // const deployTagsUrl = "/post/" + postId + "/tags"
    //     axios.get(localTagsUrl)
    //         .then(res=>{
    //             if(res.status === 200){
    //                 //console.log("HEEEERE are the tags: ")
    //                 //console.log(res.data.tags)
    //                 this.setState({
    //                     tags: res.data.tags,
    //                 })
    //             }
    //             //console.log("this.state.tags ==")
    //             //console.log(this.state.tags)
    //         })
    //         .catch(err=>{
    //             //TODO - uncomment the console.log(err) and fix the bug!
    //             //console.log(err)
    //         })
    // }


    addTag = event => {
        let updatedTags = this.state.tags
        if (event.key === "Enter" && event.target.value !== "") {
            updatedTags.push(event.target.value)
            this.setState({
                tags: updatedTags
            })
            event.target.value = "";
        }else if(event.key === "Enter"){
            alert("Please enter a valid tag.")
        }
    }

    removeTags = index => {
        const {tags} = this.state
        this.setState({
            tags: tags.filter(tag => tags.indexOf(tag) !== index)
        })
    }

    SaveTags = () => {
        const {postId, tags} = this.state
        const url = "http://localhost:5000/post/" + postId + "/tags"
        axios.post(url, tags)
            .then(res=>{
                if(res.status === 200){
                    alert("Saved tags Successfully!")
                   // console.log(res)
                }
            })
            .catch(err=>{
                //TODO - uncomment the console.log(err) and fix the bug!
                //console.log(err)
            })
    }

    render() {
        if(this.state) {
            var {tags} = this.state
            return (
                <div className="tags-input">
                    <ul>
                        {tags.map((tag, index) => (
                            <li id="tags"
                                key={index}>
                                <button>#{tag.name} </button>
                            </li>
                        ))}
                    </ul>
                </div>
            )
        }else{
            return <p>Loading tags..</p>
        }
    }
}