import React, { Component } from 'react';

const AppContext = React.createContext({
	sessionList: [],
	scheduleList: [],
	error: null,
	setError: () => {},
	clearError: () => {},
	setSessionList: () => {},
	setScheduleList: () => {},
	setFilterDay: () => {},
	setFilterTrack: () => {},
	clearFilters: () => {},
	setToggleId: () => {},
	toggleExpandAll: () => {}
});
export default AppContext;

export class AppProvider extends Component {
	state = {
		sessionList: [],
		scheduleList: [],
		error: null,
		filterDay: '',
		filterTrack: '',
		toggleId: '',
		expandAll: false
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

	setFilterDay = day => {
		this.setState({
			filterDay: day
		});
	};

	setFilterTrack = track => {
		this.setState({
			filterTrack: track
		});
	};

	clearFilters = () => {
		this.setState({ filterDay: '' });
		this.setState({ filterTrack: '' });
	};

	toggleExpandAll = () => {
		this.setState({
			toggleId: ''
		});
		this.setState({
			expandAll: !this.state.expandAll
		});
	};

	// TBD
	addToSchedule = () => {};

	// TBD
	setToggleId = id => {
		if (this.state.toggleId === id) {
			this.setState({
				toggleId: ''
			});
		} else {
			this.setState({
				toggleId: id
			});
		}

		// TBD - does not work - why???
		// this.setState((prevState, id) => ({
		// 	toggleId: prevState.toggleId === id ? '' : id
		// }));
	};

	render() {
		const value = {
			sessionList: this.state.sessionList,
			scheduleList: this.state.scheduleList,
			error: this.state.error,
			setError: this.setError,
			clearError: this.clearError,
			setSessionList: this.setSessionList,
			setScheduleList: this.setScheduleList,
			setFilterDay: this.setFilterDay,
			setFilterTrack: this.setFilterTrack,
			filterDay: this.state.filterDay,
			filterTrack: this.state.filterTrack,
			clearFilters: this.clearFilters,
			setToggleId: this.setToggleId,
			toggleId: this.state.toggleId,
			toggleExpandAll: this.toggleExpandAll,
			expandAll: this.state.expandAll
		};
		return (
			<AppContext.Provider value={value}>
				{this.props.children}
			</AppContext.Provider>
		);
	}
}
