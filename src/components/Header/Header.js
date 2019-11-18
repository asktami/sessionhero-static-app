import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import TokenService from '../../services/token-service';
import '../../index.css';

// to get props in Header
import { withRouter } from 'react-router';

class Header extends Component {
	renderMessage() {
		return (
			<>
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
					Demo Password: demoUser123*
				</p>
			</>
		);
	}
	render() {
		console.log('HEADER props = ', this.props);

		return (
			<header className="hero">
				<h1>
					<Link to={`/`}>SessionHero</Link>
				</h1>

				{this.renderMessage()}
				<p>&nbsp;</p>
			</header>
		);
	}
}

export default withRouter(Header);
