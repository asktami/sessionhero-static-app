import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import TokenService from '../../services/token-service';
import '../../index.css';

export default class Header extends Component {
	handleLogoutClick = () => {
		TokenService.clearAuthToken();
	};

	handleScheduleClick = () => {
		// TBD
	};

	render() {
		console.log('props = ', JSON.stringify(this.props));
		return (
			<header className="hero">
				<h1>
					<Link to={`/`}>SessionHero</Link>
				</h1>

				<p>
					Search for conference sessions, add conference sessions to your
					schedule, comment on sessions, and see comments made by others.
				</p>

				<p>
					You need to register to add conference sessions to your schedule and
					comment on sessions.
				</p>

				<p>
					Demo Username: demoUser
					<br />
					Demo Password: demoUser!23
				</p>

				<p>&nbsp;</p>
			</header>
		);
	}
}
