import React, { Component } from 'react';
import AppContext from '../../contexts/AppContext';
import SessionApiService from '../../services/session-api-service';
import SessionListItem from '../../components/SessionListItem/SessionListItem';
import './SessionListPage.css';

export default class SessionListPage extends Component {
	static contextType = AppContext;

	componentDidMount() {
		this.context.clearError();

		SessionApiService.getSchedule()
			.then(this.context.setScheduleList)
			.catch(this.context.setError);

		SessionApiService.getSessions()
			.then(this.context.setSessionList)
			.catch(this.context.setError);

		console.log('log from cdm');

		// WHY DOES "this.updateSessionList" THIS NOT WORK HERE?
		// HOW DO I CHANGE what's saved in state for sessionList and scheduleList on the page???

		// this.updateSessionList();

		// I need to get raw sessions and raw schedule
		// THEN loop thru sessions and add userID to update state.sessionList
		// THEN loop thru state.sessionList and filter just those with the userID to get the real scheduleList
		// and store that real scheduleList in state.scheduleList

		// 		let newSessionList = data.forEach(session => {
		// 			scheduleList.forEach(schedule => {
		// 				if (schedule.id_session === session.id) {
		// 					session.id_user = schedule.id_user;
		// 				}
		// 			});
		// 		});

		// 		this.context.setScheduleList(newSessionList)

		// -----------

		// let newScheduleList = this.context.sessionList.filter(
		// 	session => session.id_user === 1
		// );

		// this.context.setScheduleList(newScheduleList);
	}

	// TBD update sessionList:
	// combine sessionList and scheduleList so have login userId in session record
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

		let newScheduleList = sessionList.filter(session => session.userId === 1);

		// WHY DOES THIS CAUSE AN UNENDING LOOP???
		// this.context.setScheduleList(newScheduleList);
		// console.log('scheduleList inside function B = ', scheduleList);

		console.log('sessionList inside function  = ', sessionList);

		console.log('newScheduleList inside function  = ', newScheduleList);
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
		console.log('props = ', this.props);

		const { error } = this.context;
		// this.updateSessionList();

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
