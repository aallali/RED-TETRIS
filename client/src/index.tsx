import React from 'react';
import ReactDOM from 'react-dom';
import { store } from './app/store';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import SocketListerners from "./listeners"
import * as serviceWorker from './serviceWorker';

// window.addEventListener('hashchange', function () {
// 	window.location.reload()
// }, true);

SocketListerners()

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<App />
		</Provider>
	</React.StrictMode>,
	document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
