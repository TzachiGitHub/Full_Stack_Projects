import sys

from flask import Flask
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
    gifsearch = "okay"
    if (temperature > 40) is True:
        gifsearch = "hell"
        pass
    elif (temperature > 30) is True:
        gifsearch = "bikini time"
        pass
    elif (temperature > 20) is True:
        gifsearch = "feels good"
        pass
    elif (temperature > 10) is True:
        gifsearch = "it's a bit chillie"
        pass
    elif (temperature > 0) is True:
        gifsearch = "too cold man"
        pass
    else:
        gifsearch = "freezing"
        pass

    giphySecret = 'sMccXlD0hvMaQy5Pc8mqWHXAHQQdin8J'
    giphyUrl = 'https://api.giphy.com/v1/gifs/translate'
    giphyParams = {'api_key': giphySecret, 's': gifsearch, 'weirdness': 10}
    response = requests.get(url=giphyUrl, params=giphyParams)
    return redirect((response.json()['data']['embed_url']))


if __name__ == "__main__":
    app.run()
