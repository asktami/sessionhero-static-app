import React, { Component } from 'react';
import AppContext from '../../contexts/AppContext';
import SessionApiService from '../../services/session-api-service';
import SessionListItem from '../../components/SessionListItem/SessionListItem';
import './SessionListPage.css';

export default class SessionListPage extends Component {
	static contextType = AppContext;

	componentDidMount() {
		this.context.clearError();
		this.context.clearFilters();

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
	// ALSO need schedule.id in the join!
	// in postgres use joins instead
	updateSessionList() {
		const { sessionList = [], scheduleList = [] } = this.context;

		// automatically updates sessionList in context
		sessionList.forEach(session => {
			scheduleList.forEach(schedule => {
				if (schedule.sessionId === session.id) {
					session.userId = schedule.userId;
					session.scheduleId = schedule.id;
				}
			});
		});

		// to update scheduleList in context
		let newScheduleList = sessionList.filter(session => session.userId === 1);

		this.context.setScheduleList(newScheduleList);
	}

	addToSchedule = (sessionId, userId) => {
		console.log('add to schedule');

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

	renderSessions() {
		const { sessionList = [], setToggleId, toggleId, expandAll } = this.context;

		// apply search filters: filterDay and filterTrack
		return sessionList
			.filter(
				session =>
					session.day
						.toLowerCase()
						.includes(this.context.filterDay.toLowerCase()) &&
					session.track
						.toLowerCase()
						.includes(this.context.filterTrack.toLowerCase())
			)
			.map(session => (
				<li className="item" key={session.id}>
					<SessionListItem
						session={session}
						setToggleId={setToggleId}
						toggleId={toggleId}
						expandAll={expandAll}
						pathname={this.props.location.pathname}
						addToSchedule={this.addToSchedule}
						removeFromSchedule={this.removeFromSchedule}
					/>
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
