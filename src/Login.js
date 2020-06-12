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
        const url = 'http://127.0.0.1:5000/login'
        axios.post(url, jsonData)
            .then((res)=> {
                if(res.status === 200){
                    alert("Login success!");
                    console.log("login form submitted");
                    // this.props.history.push('/');
                    console.log(this.props)

                }

            }).catch((error)=>{
            if(error){
                alert("wrong username/password, please try again\n", error);
                console.log(error)

                window.location.reload(false);
            }
            if(error.status){}
        })
    }

    render(){
        return (
            <div>
                <form onSubmit={this.handleSubmit}>

                    <h2> Please Enter a Username and a Password to Login:</h2>

                    <div>
                        <p> Username:</p>
                        <input
                            type="text"
                            placeholder="username"
                            onChange={event => {this.setState({username: event.target.value})}}
                            required
                        />
                    </div>

                    <p> password:</p>
                    <input
                        type="password"
                        placeholder="password"
                        onChange={event => {this.setState({password: event.target.value})}}
                        required
                    />
                    <button type="submit">Signup</button>
                </form>
            </div>
        );
    }
}

