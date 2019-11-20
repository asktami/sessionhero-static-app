import React, { Component } from 'react';
import SessionContext from '../../contexts/SessionContext';
import SessionApiService from '../../services/session-api-service';
import SessionListItem from '../../components/SessionListItem/SessionListItem';
import SessionComments from '../../components/SessionComments/SessionComments';
import CommentForm from '../../components/CommentForm/CommentForm';

import './SessionPage.css';

export default class SessionPage extends Component {
	static defaultProps = {
		match: { params: {} }
	};

	static contextType = SessionContext;

	componentDidMount() {
		const { sessionId } = this.props.match.params;
		this.context.clearError();

		SessionApiService.getSession(sessionId)
			.then(this.context.setSession)
			.catch(this.context.setError);

		SessionApiService.getSessionComments(sessionId)
			.then(this.context.setComments)
			.catch(this.context.setError);

		console.log(this.context.comments);
	}

	addToSchedule = (sessionId, userId) => {
		console.log.logrt('add to schedule');

		SessionApiService.addScheduleItem(sessionId, userId)
			.then(this.context.setSessionList)
			.catch(this.context.setError);
	};

	removeFromSchedule = scheduleId => {
		console.log('remove from schedule');

		SessionApiService.deleteScheduleItem(scheduleId)
			.then(this.context.setScheduleList)
			.catch(this.context.setError);
	};

	componentWillUnmount() {
		this.context.clearSession();
	}

	renderSession() {
		const { session, setToggleId, toggleId, expandAll } = this.context;
		return (
			<>
				<SessionListItem
					session={session}
					setToggleId={setToggleId}
					toggleId={toggleId}
					expandAll={expandAll}
					pathname={this.props.location.pathname}
				/>
				<SessionComments />
				<CommentForm />
			</>
		);
	}

	render() {
		const { error, session } = this.context;
		let content;
		if (error) {
			content =
				error.error === `Session doesn't exist` ? (
					<p className="error">Session not found</p>
				) : (
					<p className="error">There was an error</p>
				);
		} else if (!session.id) {
			content = <div className="loading" />;
		} else {
			content = this.renderSession();
		}
		return <section>{content}</section>;
	}
}
