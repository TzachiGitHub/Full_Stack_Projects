import React from 'react';
import axios from 'axios';

export default class Signup extends React.Component{
    constructor(props) {
        super(props);

        this.state ={
            username: "",
            password: "",
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
        // const deployUrl = '/signup';
        const localUrl = 'http://127.0.0.1:5000/signup';
        axios.post(localUrl, data)
            .then((res)=> {
                if(res.status === 200){
                    console.log(res)
                    var loginData = {
                        username: this.state.username,
                        isLoggedIn: true,
                        loggedInUserId: res.data.userId
                    }
                    //calling the handleLogin function from the App.js class - to save the userData and pass it on
                    this.props.handleLogin(loginData, this.props)
                    this.props.history.push('/');
                }
            }).catch((error)=>{
            alert("The username already exists, please choose another or log in");
            console.log(error)
            window.location.reload(false);
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
