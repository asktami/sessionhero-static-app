import React, { Component } from 'react';
import AppContext from '../../contexts/AppContext';
import SessionApiService from '../../services/session-api-service';
import SessionListItem from '../../components/SessionListItem/SessionListItem';
import './SessionListPage.css';

export default class SessionListPage extends Component {
	static contextType = AppContext;

	componentDidMount() {
		this.context.clearError();

		Promise.all([
			SessionApiService.getSchedule(),
			SessionApiService.getSessions()
		])
			.then(results => {
				const schedule = results[0];
				const sessions = results[1];

				this.context.setScheduleList(schedule);
				this.context.setSessionList(sessions);

				// in postgres use joins instead
				this.updateSessionList();
			})
			.catch(this.context.setError);
	}

	// TBD update sessionList:
	// combine sessionList and scheduleList so have login userId in session record
	// in postgres use joins instead
	updateSessionList() {
		const { sessionList = [], scheduleList = [] } = this.context;

		// automatically updates sessionList in context
		sessionList.forEach(session => {
			scheduleList.forEach(schedule => {
				if (schedule.sessionId === session.id) {
					session.userId = schedule.userId;
				}
			});
		});

		// to update scheduleList in context
		let newScheduleList = sessionList.filter(session => session.userId === 1);

		this.context.setScheduleList(newScheduleList);
	}

	renderSessions() {
		const { sessionList = [] } = this.context;

		return sessionList.map(session => (
			<li className="schedule" key={session.id}>
				<SessionListItem session={session} />
			</li>
		));
	}

	render() {
		const { error } = this.context;

		console.log('sessionList in context = ', this.context.sessionList);
		console.log('scheduleList in context = ', this.context.scheduleList);

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
