import React from 'react';
import styled from 'styled-components';
import { GithubContext } from '../context/context';
import { ExampleChart, Pie3D, Column3D, Bar3D, Doughnut2D } from './Charts';
import sortArray from 'sort-array';

const Repos = () => {
	var { repos } = React.useContext(GithubContext);

	var languageReducer = (propString) => {
		return repos
			.reduce((accu, repo) => {
				// let language, prop;
				let { language, [propString]: prop } = repo;

				if (!language) {
					return accu;
				}
				let languageExists = false;
				for (let item of accu) {
					if (item.label === language) {
						languageExists = true;
						item.value += prop || 1;
						break;
					}
				}
				if (!languageExists) {
					accu.push({ label: language, value: prop || 1 });
				}
				return accu;
			}, [])
			.slice(0, 5)
			.sort((a, b) => {
				return b.value - a.value;
			});
	};

	let mostLanguagesUsed = languageReducer();

	let mostStarsPerLanguage = languageReducer('stargazers_count');

	var reposReducer = (propString) => {
		let rawDataArr = repos.reduce((accu, repo) => {
			let { name, [propString]: prop } = repo;
			accu.push({ label: name, value: prop });
			return accu;
		}, []);
		return sortArray(rawDataArr, { by: 'value', order: 'desc' }).slice(0, 5);
	};

	let stars = reposReducer('stargazers_count');
	let forks = reposReducer('forks');
	// let stars = repos.reduce((accu, repo) => {
	// 	let { name, stargazers_count } = repo;
	// 	accu.push({ label: name, value: stargazers_count });
	// 	return accu;
	// }, []);

	// stars = sortArray(stars, { by: 'value', order: 'desc' }).slice(0, 5);

	// let forks = repos.reduce((accu, repo) => {
	// 	let { name, forks } = repo;
	// 	accu.push({ label: name, value: forks });
	// 	return accu;
	// }, []);

	// forks = sortArray(stars, { by: 'value', order: 'desc' }).slice(0, 5);

	return (
		<section className='section'>
			<Wrapper className='section-center'>
				<Pie3D data={mostLanguagesUsed} />
				<Column3D data={stars} />
				<Doughnut2D data={mostStarsPerLanguage} />
				<Bar3D data={forks} />
			</Wrapper>
		</section>
	);
};

const Wrapper = styled.div`
	display: grid;
	justify-items: center;
	gap: 2rem;
	@media (min-width: 800px) {
		grid-template-columns: 1fr 1fr;
	}

	@media (min-width: 1200px) {
		grid-template-columns: 2fr 3fr;
	}

	div {
		width: 100% !important;
	}
	.fusioncharts-container {
		width: 100% !important;
	}
	svg {
		width: 100% !important;
		border-radius: var(--radius) !important;
	}
`;

export default Repos;
