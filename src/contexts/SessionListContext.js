import React, { Component } from 'react';

const SessionListContext = React.createContext({
	sessionList: [],
	scheduleList: [],
	error: null,
	setError: () => {},
	clearError: () => {},
	setSessionList: () => {},
	setScheduleList: () => {}
});
export default SessionListContext;

export class SessionListProvider extends Component {
	state = {
		sessionList: [],
		scheduleList: [],
		error: null
	};

	setSessionList = sessionList => {
		this.setState({ sessionList });
	};

	setScheduleList = scheduleList => {
		this.setState({ scheduleList });
	};

	setError = error => {
		console.error(error);
		this.setState({ error });
	};

	clearError = () => {
		this.setState({ error: null });
	};

	render() {
		const value = {
			sessionList: this.state.sessionList,
			scheduleList: this.state.scheduleList,
			error: this.state.error,
			setError: this.setError,
			clearError: this.clearError,
			setSessionList: this.setSessionList,
			setScheduleList: this.setScheduleList
		};
		return (
			<SessionListContext.Provider value={value}>
				{this.props.children}
			</SessionListContext.Provider>
		);
	}
}
