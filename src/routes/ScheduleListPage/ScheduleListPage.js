import React, { Component } from 'react';
import AppContext from '../../contexts/AppContext';
import SessionApiService from '../../services/session-api-service';
import SessionListItem from '../../components/SessionListItem/SessionListItem';

import './ScheduleListPage.css';

export default class ScheduleListPage extends Component {
	static contextType = AppContext;

	componentDidMount() {
		this.context.clearFilters();
	}

	removeFromSchedule = scheduleId => {
		SessionApiService.deleteScheduleItem(scheduleId)
			.then(this.context.setScheduleList)
			.catch(this.context.setError);
	};

	renderSchedule() {
		const {
			scheduleList = [],
			setToggleId,
			toggleId,
			expandAll
		} = this.context;

		// apply search filters: filterDay and filterTrack
		return scheduleList
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
					/>
				</li>
			));
	}

	render() {
		const { error } = this.context;
		return (
			<section>
				{error ? (
					<p className="error">There was an error, try again {error}</p>
				) : (
					<ul className="sessions-list">{this.renderSchedule()}</ul>
				)}
			</section>
		);
	}
}
