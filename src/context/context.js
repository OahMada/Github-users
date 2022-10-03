import React, { useState, useEffect } from 'react';
import mockUser from './mockData.js/mockUser';
import mockRepos from './mockData.js/mockRepos';
import mockFollowers from './mockData.js/mockFollowers';
import axios from 'axios';

const rootUrl = 'https://api.github.com';

var GithubContext = React.createContext();

var GithubProvider = ({ children }) => {
	var [githubUser, setGitHubUser] = useState(mockUser);
	var [repos, setRepos] = useState(mockRepos);
	var [followers, setFollowers] = useState(mockFollowers);

	var [requestsUsed, setRequestsUsed] = useState(0);
	var [loading, setLoading] = useState(false);
	var [error, setError] = useState({ show: false, msg: '' });

	var toggleError = (show = false, msg = '') => {
		setError({ show, msg });
	};

	var fetchGithubUser = async (user) => {
		toggleError();
		setLoading(true);
		try {
			let userResp = await axios(`${rootUrl}/users/${user}`);
			setGitHubUser(userResp.data);

			try {
				let { repos_url, followers_url } = userResp.data;
				let reposPromise = axios(`${repos_url}?per_page=100`);
				let followersPromise = axios(`${followers_url}?per_page=100`);

				let [reposResp, followersResp] = await Promise.all([
					reposPromise,
					followersPromise,
				]);
				setRepos(reposResp.data);
				setFollowers(followersResp.data);
			} catch (error) {
				console.log(error);
			}
		} catch (error) {
			toggleError(true, 'there is no user matches that username');
			console.log(error);
		}
		fetchUsedRequests();
		setLoading(false);
	};

	var fetchUsedRequests = async () => {
		try {
			let response = await axios(`${rootUrl}/rate_limit`);
			let {
				data: {
					rate: { used },
				},
			} = response;
			setRequestsUsed(used);
			if (used === 60) {
				toggleError(true, 'you have exceeded your hourly rate limit');
			}
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		fetchUsedRequests();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []); // why can't add function into dependency array? because the function get declared in every re-render
	// the warning here can be safely ignored
	// It is only safe to omit a function from the dependency list if nothing in it (or the functions called by it) references props, state, or values derived from them.

	return (
		<GithubContext.Provider
			value={{
				githubUser,
				repos,
				followers,
				requestsUsed,
				error,
				fetchGithubUser,
				loading,
			}}
		>
			{children}
		</GithubContext.Provider>
	);
};

export { GithubContext, GithubProvider };
