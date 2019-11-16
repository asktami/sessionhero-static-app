import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import TokenService from '../../services/token-service';
import { Pipe } from '../../components/Utils/Utils';
import '../../index.css';

export default class Header extends Component {
	handleLogoutClick = () => {
		TokenService.clearAuthToken();
	};

	handleScheduleClick = () => {
		// TBD
	};

	renderLogoutLink() {
		return (
			<nav>
				<div>
					<Link onClick={this.handleScheduleClick} to="/schedule">
						Schedule
					</Link>
					<Pipe />
					<Link onClick={this.handleLogoutClick} to="/">
						Logout
					</Link>
				</div>
			</nav>
		);
	}

	renderLoginLink() {
		return (
			<div>
				<Link to="/login">Log in</Link>
				<Pipe />
				<Link to="/register">Register</Link>
			</div>
		);
	}

	render() {
		return (
			<>
				<nav>
					<div>
						<Link to="/" className="logo">
							SessionHero
						</Link>
					</div>

					{/* check localStorage for login auth */}
					{TokenService.hasAuthToken()
						? this.renderLogoutLink()
						: this.renderLoginLink()}
				</nav>
			</>
		);
	}
}
