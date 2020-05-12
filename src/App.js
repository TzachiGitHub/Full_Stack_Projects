import './App.css';
import React from 'react';
import axios from 'axios';


class App extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            city: props.city || 'New York',
            weather: {},
        };
        console.log('constructor');
    }
    componentDidMount() {
        console.log('componentDidMount');
        const weatherKey = '2021457dd07b9c42f8a109269c0ec65d';
        const weatherUrl = `http://api.openweathermap.org/data/2.5/weather?q=${this.state.city}&appid=${weatherKey}`;
        const axiosGetResponse = axios.get(weatherUrl); // return Promise
        axiosResponder.then(props=>{
            if (props.status === 200) {
                this.setState({
                    weather: props.data
                });
            }
        })
        axiosGetResponse.then(axiosResponder(this));
    }
    onTextInputChange = (event) => {
        console.info('the user entered: ', event.target.value)
        this.setState({
            city: event.target.value
        })
    };
    onSendCityToServerClick = (event) => {
        const key = 'af4bef339069f117d3aafbea2cb7e7c5';
        const url = `http://api.openweathermap.org/data/2.5/weather?q=${this.state.city}&appid=${key}`;
        const axiosWeatherResponse = axios.get(url); // return Promise
        axiosWeatherResponder.then(props=>{
            if (props.status === 200) {
                this.setState({
                    weather: props.data
                });
            }
        })
        axiosWeatherResponse.then(axiosWeatherResponder(this));
    }

    render() {
        console.info('render');
        const weather = this.state.weather;
        if (weather.main) {
            return (
                <div id="main">
                    <br/>
                    <input placeholder="London" onChange={this.onTextInputChange} />
                    <br/><br/>
                    <button onClick={this.onSendCityToServerClick}>Search</button>
                    <br/><br/>
                    {`The weather in ${weather.name} is: ${weather.main.temp}`}
                    <br/>
                </div>
            );
        }
        return <div>Loading...</div>;
    }
}
export default App;
