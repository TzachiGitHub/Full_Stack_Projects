import React from 'react'
import axios from 'axios'

class HW03 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            city: props.city || 'Berlin',
            weather: {}
        }
        console.log("constructor")
    }

    componentDidMount() {
        console.log("componentDidMount")
        const apiKey = '2021457dd07b9c42f8a109269c0ec65d'
        const url = `http://api.openweathermap.org/data/2.5/weather?
        q=${this.state.city}&appid=${apiKey}`;

        const axiosGetResponse = axios.get(url); //returns a Promise

        var WeatherUpdate = (axiosGetResponse) => {
            if (axiosGetResponse.status === 200) {
                this.setState({
                    weather: axiosGetResponse.data
                });
            }
        }
        axiosGetResponse.then(WeatherUpdate.bind(this))
    }

    onTextInputChange = (event) => {
        console.log('the user entered: ', event.target.value);

        this.setState({
            city: event.target.value
        })
    }

    onSendCityToServerClick = (event) => {
        console.info('send' + this.state.city + ' to server')

        const apiKey = '2021457dd07b9c42f8a109269c0ec65d'
        const url = `http://api.openweathermap.org/data/2.5/weather?
        q=${this.state.city}&appid=${apiKey}`;

        const axiosResponse = axios.get(url)

        var WeatherUpdate = (props) => {
            if (props.status === 200) {
                this.setState({
                    weather: props.data
                });
            }
        }
        axiosResponse.then(WeatherUpdate.bind(this))

    };

    render() {
        console.log('render');
        const weather = this.state.weather

        if (weather) {
            return (
                <div>
                    <input onChange={this.onTextInputChange}/>
                    <button onClick={this.WeatherUpdate}>Click here to Submit></button>
                    if(weather.city){
                    <p> The weather in {weather.city} is {weather.data} </p>
                }
                </div>
            )
        }
        return <div>Loading...</div>
    }
}
export default HW03
