import React, { Component } from 'react';
import AppContext from '../../contexts/AppContext';
import SessionApiService from '../../services/session-api-service';
import SessionListItem from '../../components/SessionListItem/SessionListItem';
import './SessionListPage.css';

export default class SessionListPage extends Component {
	static contextType = AppContext;

	componentDidMount() {
		this.context.clearError();

		SessionApiService.getSessions()
			.then(this.context.setSessionList)
			.catch(this.context.setError);

		SessionApiService.getSchedule()
			.then(this.context.setScheduleList)
			.catch(this.context.setError);

		let newScheduleList = this.context.sessionList.filter(
			session => session.id_user === 1
		);

		this.context.setScheduleList(newScheduleList);
	}

	// HOW DOES THIS RUN AUTOMATICALLY???
	// TBD update sessionList:
	// combine sessionList and scheduleList so have login id_user in session record
	updateSessionList() {
		const { sessionList = [], scheduleList = [] } = this.context;

		// automatically updates sessionList in context
		sessionList.forEach(session => {
			scheduleList.forEach(schedule => {
				if (schedule.id_session === session.id) {
					session.id_user = schedule.id_user;
				}
			});
		});

		let newScheduleList = sessionList.filter(session => session.id_user === 1);
		console.log('newScheduleList B = ', newScheduleList);

		// WHY DOES THIS CAUSE AN UNENDING LOOP???
		// this.context.setScheduleList(newScheduleList);

		console.log('sessionList B = ', this.context.sessionList);

		console.log('scheduleList in context = ', this.context.scheduleList);
	}

	renderSessions() {
		const { sessionList = [], scheduleList = [] } = this.context;

		return sessionList.map(session => (
			<li className="schedule" key={session.id}>
				<SessionListItem session={session} />
			</li>
		));
	}

	render() {
		const { error } = this.context;

		this.updateSessionList();

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
