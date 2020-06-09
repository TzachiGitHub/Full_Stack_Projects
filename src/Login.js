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

        axios.post('http://127.0.0.1:5000/login',
            {
                username: username,
                password: password
            })
            .then( (res) => {
                alert(res.data.msg);
                if(res.status === 200 && res.data.isLoggedIn){
                    console.log("login form submitted");
                    this.props.history.push('/');
                }
            }).catch((error)=>{
            if(error){
                console.log("signup failed\n", error);
                window.location.reload(false);
            }
        })
    }

    render(){
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <input
                        type="text"
                        placeholder="username"
                        onChange={event => {this.setState({username: event.target.value})}}
                        required
                    />
                    <br/><br/>
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

