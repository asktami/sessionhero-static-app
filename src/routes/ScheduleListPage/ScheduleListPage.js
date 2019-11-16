import React, { Component } from 'react';
import SessionListContext from '../../contexts/SessionListContext';
import SessionApiService from '../../services/session-api-service';
import SessionListItem from '../../components/SessionListItem/SessionListItem';

import './ScheduleListPage.css';

export default class ScheduleListPage extends Component {
	static contextType = SessionListContext;

	componentDidMount() {
		this.context.clearError();
		SessionApiService.getSchedule()
			.then(this.context.setScheduleList)
			.catch(this.context.setError);
	}

	renderSchedule() {
		const { scheduleList = [], sessionList = [] } = this.context;

		// TBD create new array with all items from session where session.code === schedule.id_session
		let scheduleArr = sessionList.map(session =>
			scheduleList.filter(schedule => schedule.id_session === session.code)
		);

		return scheduleArr.map(schedule => (
			<li className="item" key={schedule.id}>
				<SessionListItem session={schedule} />
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
					<ul className="sessions-list">{this.renderSchedule()}</ul>
				)}
			</section>
		);
	}
}
