import React, { Component } from 'react';

const AppContext = React.createContext({
	sessionList: [],
	scheduleList: [],
	error: null,
	setError: () => {},
	clearError: () => {},
	setSessionList: () => {},
	setScheduleList: () => {}
});
export default AppContext;

export class AppProvider extends Component {
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
			<AppContext.Provider value={value}>
				{this.props.children}
			</AppContext.Provider>
		);
	}
}
