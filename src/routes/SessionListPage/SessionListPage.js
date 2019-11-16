import React, { Component } from 'react';
import SessionListContext from '../../contexts/SessionListContext';
import SessionApiService from '../../services/session-api-service';
import { Section } from '../../components/Utils/Utils';
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
		const { SessionList = [] } = this.context;
		return SessionList.map(Session => (
			<SessionListItem key={Session.id} Session={Session} />
		));
	}

	render() {
		const { error } = this.context;
		return (
			<Section list className="SessionListPage">
				{error ? (
					<p className="red">There was an error, try again</p>
				) : (
					this.renderSessions()
				)}
			</Section>
		);
	}
}
