import React from 'react';
import { Info, Repos, User, Search, Navbar } from '../components';
import loadingImage from '../images/preloader.gif';
import { GithubContext } from '../context/context';
const Dashboard = () => {
	let { loading } = React.useContext(GithubContext);
	return (
		<main>
			<Navbar />
			<Search />
			{loading && (
				<img src={loadingImage} alt='loading' className='loading-img' />
			)}
			{!loading && (
				<>
					<Info />
					<User />
					<Repos />
				</>
			)}
		</main>
	);
};

export default Dashboard;
