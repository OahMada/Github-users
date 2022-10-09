import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { GithubProvider } from './context/context';
import { Auth0Provider } from '@auth0/auth0-react';
// dev-8vbtupnx.us.auth0.com
// RnBBpL1oS1fHcKE2zAtbfiCBI9QP8m4H;

var root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<Auth0Provider
		domain={process.env.REACT_APP_AUTH0_DOMAIN}
		clientId={process.env.REACT_APP_AUTH0_CLIENT_ID}
		redirectUri={window.location.origin}
		cacheLocation='localstorage'
	>
		<React.StrictMode>
			<GithubProvider>
				<App />
			</GithubProvider>
		</React.StrictMode>
	</Auth0Provider>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
