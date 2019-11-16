import React, { Component } from 'react';
import SessionListContext from '../../contexts/SessionListContext';
import SessionApiService from '../../services/session-api-service';
import SessionListItem from '../../components/SessionListItem/SessionListItem';
import './SessionListPage.css';

export default class SessionListPage extends Component {
	static contextType = SessionListContext;

	componentDidMount() {
		this.context.clearError();
		SessionApiService.getSessions()
			.then(this.context.setSessionList)
			.catch(this.context.setError);
	}

	renderSessions() {
		const { sessionList = [] } = this.context;
		return sessionList.map(session => (
			<li className="item" key={session.code}>
				<SessionListItem session={session} />
			</li>
		));
	}

	render() {
		const { error } = this.context;
		return (
			<section>
				{error ? (
					<p className="error">There was an error, try again</p>
				) : (
					<ul className="sessions-list">{this.renderSessions()}</ul>
				)}
			</section>
		);
	}
}
