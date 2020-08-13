import React from 'react';
import axios from 'axios';

export default class Signup extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            username: "",
            password: "",
            nickname: "",
        }

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event){
        event.preventDefault();
        const {username, nickname, password} = this.state;
        const data ={
            username: username,
            nickname: nickname,
            password: password,
        }
        console.log("in handleSubmit")
        // const deployUrl = '/signup';
        const localUrl = 'http://127.0.0.1:5000/signup';
        axios.post(localUrl, data)
            .then((res)=> {
                if(res.status === 200){
                    var loginData = {
                        username: username,
                        nickname: nickname,
                        isLoggedIn: true,
                        loggedInUserId: res.data.userId
                    }
                    //calling the handleLogin function from the App.js class - to save the userData and pass it on
                    this.props.handleLogin(loginData, this.props)
                    this.props.history.push('/');
                }
            }).catch((error)=>{
                console.log(error)
                alert("The username is already taken, Please try another one or login")
                window.location.reload(false);
        })
    }


    render(){
        return (
            <div className="registration">
                <h2>Please signup to continue:</h2>
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
                        <span>Nickname:</span>
                        <input
                            className="registrationInput"
                            type="text"
                            onChange={event => {this.setState({nickname: event.target.value})}}
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
