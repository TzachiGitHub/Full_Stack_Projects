(this["webpackJsonpweather-react"]=this["webpackJsonpweather-react"]||[]).push([[0],{18:function(e,t,n){e.exports=n(42)},23:function(e,t,n){},24:function(e,t,n){},42:function(e,t,n){"use strict";n.r(t);var a=n(0),o=n.n(a),c=n(13),r=n.n(c),i=(n(23),n(14)),l=n(15),s=n(2),u=n(17),h=n(16),d=(n(24),n(3)),m=n.n(d),p=function(e){Object(u.a)(n,e);var t=Object(h.a)(n);function n(e){var a;return Object(i.a)(this,n),(a=t.call(this,e)).onTextInputChange=function(e){console.info("the user entered: ",e.target.value),a.setState({city:e.target.value})},a.onSendCityToServerClick=function(e){var t="http://api.openweathermap.org/data/2.5/weather?q=".concat(a.state.city,"&appid=").concat("af4bef339069f117d3aafbea2cb7e7c5");m.a.get(t).then(function(e){200===e.status&&a.setState({weather:e.data})}.bind(Object(s.a)(a)))},a.state={city:e.city||"New York",weather:{}},console.log("constructor"),a}return Object(l.a)(n,[{key:"componentDidMount",value:function(){var e=this;console.log("componentDidMount");var t="http://api.openweathermap.org/data/2.5/weather?q=".concat(this.state.city,"&appid=").concat("2021457dd07b9c42f8a109269c0ec65d");m.a.get(t).then(function(t){console.log("status = "+t.status),200===t.status&&e.setState({weather:t.data})}.bind(this))}},{key:"render",value:function(){console.info("render");var e=this.state.weather;return e.main?o.a.createElement("div",{id:"main"},o.a.createElement("br",null),o.a.createElement("input",{placeholder:"London",onChange:this.onTextInputChange}),o.a.createElement("br",null),o.a.createElement("br",null),o.a.createElement("button",{onClick:this.onSendCityToServerClick},"Search"),o.a.createElement("br",null),o.a.createElement("br",null),"The weather in ".concat(e.name," is: ").concat(e.main.temp),o.a.createElement("br",null)):o.a.createElement("div",null,"Loading...")}}]),n}(o.a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));r.a.render(o.a.createElement(o.a.StrictMode,null,o.a.createElement(p,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[18,1,2]]]);
//# sourceMappingURL=main.c5795e44.chunk.js.map