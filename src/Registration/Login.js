import React from 'react';
import axios from 'axios';

export default class Login extends React.Component{
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
        console.log("got into handleSubmit forum")
        const jsonData = {
            username: username,
            password: password
            }
        // const deployUrl = '/login'
        const localUrl = 'http://127.0.0.1:5000/login'
        axios.post(localUrl, jsonData)
            .then((res)=> {
                if(res.status === 200) {
                    var loginData = {
                        username: username,
                        nickname: res.data.nickname,
                        isLoggedIn: true,
                        loggedInUserId: res.data.userId
                    }
                    this.props.handleLogin(loginData, this.props)
                    setTimeout(()=> {
                      this.props.history.push('/')
                        }, 500);
                }
            }).catch((error)=>{
            if(error){
                alert("wrong username/password, please try again\n", error);
                console.log(error)
            }
        })
    }

    render(){
        return (
            <div>
                <h2> Please Enter a Username and a Password to Login:</h2>
                <form onSubmit={this.handleSubmit} id="Registration">
                    <div className="registrationSpan">
                        <span>Username:</span>
                        <input
                            type="text"
                            className="registrationInput"
                            onChange={event => {this.setState({username: event.target.value})}}
                            required
                        />
                    </div>
                    <div className="registrationSpan">
                    <span>Password:</span>
                    <input
                        className="registrationInput"
                        type="password"
                        onChange={event => {this.setState({password: event.target.value})}}
                        required
                    />
                    </div>
                    <button className="registrationButton" type="submit">Signup</button>
                </form>
            </div>
        );
    }
}

