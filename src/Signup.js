import React from 'react';
import axios from 'axios';

export default class Signup extends React.Component{
    constructor(props) {
        super(props);

        this.state ={
            username: "",
            password: "",
            LoggedIn: false,
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event){
        [event.target.name] = event.target.value;
        console.log(event.target.name , event.target.value);
    }

    handleSubmit(event){
        event.preventDefault();
        const {username, password} = this.state;
        const data ={
                username: username,
                password: password
            }
        const url = 'http://127.0.0.1:5000/signup';
        axios.post(url, data)
            .then((res)=> {
                if(res.status === 200){
                    alert("Success! signed in perfectly!")
                    console.log("signup form submitted");
                    // this.props.history.push('/');
                    console.log(this.props)
                    //TODO - fix go to homepage function - this.props.history.push('/');
                    
                }
                // this.props.handleLogin({"username": username, "LoggedIn": this.LoggedIn})
            }).catch((error)=>{
                if(error){
                    console.log(error)
                    alert("The username already exists, please choose another or log in", error);
                    // window.location.reload(false);
                }
            })
    }

    render(){
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <h3>Welcome to the Signup Page!</h3>
                    <h3>Please enter name and Password:</h3>

                    <p>name:</p>
                    <input
                        type="text"
                        placeholder="username"
                        onChange={event => {this.setState({username: event.target.value})}}
                        required
                    />
                    <br/><br/>
                    <p>password:</p>
                    <input
                        type="password"
                        placeholder="password"
                        onChange={event => {this.setState({password: event.target.value})}}
                        required
                    />
                    <br/><br/>
                    <button type="submit">Signup</button>
                </form>
            </div>
        );
    }
}
