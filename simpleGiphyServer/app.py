from flask import Flask, render_template
import requests
from werkzeug.utils import redirect

app = Flask(__name__)


@app.route('/')
def hello():
    return 'Hello World!'


@app.route('/weather/<city>')
def weather(city):
    secret = '2021457dd07b9c42f8a109269c0ec65d'
    url = 'http://api.openweathermap.org/data/2.5/weather'
    params = {'q': city, 'units': 'metric', 'appid': secret}
    response = requests.get(url=url, params=params)
    temperature = response.json()['main']['temp']
    gifSearch = "okay"
    if (temperature > 40) is True:
        gifSearch = "hell"
        pass
    elif (temperature > 30) is True:
        gifSearch = "bikini time"
        pass
    elif (temperature > 20) is True:
        gifSearch = "feels good"
        pass
    elif (temperature > 10) is True:
        gifSearch = "it's a bit chillie"
        pass
    elif (temperature > 0) is True:
        gifSearch = "too cold man"
        pass
    else:
        gifSearch = "freezing"
        pass

    giphySecret = 'sMccXlD0hvMaQy5Pc8mqWHXAHQQdin8J'
    giphyUrl = 'https://api.giphy.com/v1/gifs/translate'
    giphyParams = {'api_key': giphySecret, 's': gifSearch, 'weirdness': 10}
    response = requests.get(url=giphyUrl, params=giphyParams)
    image = str(response.json()['data']['images']['downsized']['url'])
    return render_template("weatherGiphy.html", city=city, temperature=temperature, image=image)


if __name__ == "__main__":
    app.run()
