import React, { Component } from 'react';
import AppContext from '../../contexts/AppContext';
import SessionListItem from '../../components/SessionListItem/SessionListItem';

import './ScheduleListPage.css';

export default class ScheduleListPage extends Component {
	static contextType = AppContext;

	renderSchedule() {
		const { sessionList = [], scheduleList = [] } = this.context;

		return sessionList.map(schedule => (
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
