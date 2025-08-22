import './AllStartups.css';
import $api from '../../http/index';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function AllStartups() {
	const [startups, setStartups] = useState([]);

	useEffect(() => {
		const fetchStartups = () => {
			$api.get('/startups')
				.then((res) => {
					setStartups(res.data);
				})
				.catch((err) => {
					console.error('Ошибка при получении стартапов:', err);
				});
		};

		fetchStartups();
		const interval = setInterval(fetchStartups, 5000);

		return () => clearInterval(interval);
	}, []);

	return (
		<div className="startups-container">
			<h1 className="startups-title">Стартапы</h1>

			<ul className="startups">
				{startups.map((startup, index) => (
					<li key={index} className="startups-item">
						<div className="startups-item-container">
							<h2>{startup.name}</h2>
						</div>
						<div className="startups-item-container">
							<h5 className="startups-item-title">Описание:</h5>
							<p>{startup.description}</p>
						</div>
						<div className="startups-item-container">
							<div className="line-item">
								<h5 className="startups-item-title">
									Основатель:
								</h5>
								<Link
									to={`/user/${startup.founder}`}
									className="startups-founder"
								>
									{startup.founder}
								</Link>
							</div>
							<div className="line-item">
								<h5 className="startups-item-title">
									Команда:
								</h5>
								<p className="startups-team">{startup.team}</p>
							</div>
						</div>
					</li>
				))}
			</ul>
		</div>
	);
}

export default AllStartups;
