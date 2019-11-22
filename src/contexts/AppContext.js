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
	toggleExpandAll: () => {},
	session: [],
	comments: [],
	setSession: () => {},
	setComments: () => {},
	clearSession: () => {},
	addComment: () => {},
	editComment: () => {},
	deleteComment: () => {}
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
		expandAll: false,
		session: [],
		comments: []
	};

	setError = error => {
		this.setState({ error });
	};

	clearError = () => {
		this.setState({ error: null });
	};

	setSessionList = sessionList => {
		this.setState({ sessionList });
	};

	setScheduleList = scheduleList => {
		this.setState({ scheduleList });
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

	clearFilters = e => {
		this.setState({ filterDay: '' });
		this.setState({ filterTrack: '' });
	};

	toggleExpandAll = () => {
		this.setState({
			expandAll: !this.state.expandAll
		});
	};

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
	};

	setSession = session => {
		this.setState({ session });
	};

	setComments = comments => {
		this.setState({ comments });
	};

	clearSession = () => {
		this.setSession([]);
		this.setComments([]);
	};

	addComment = comment => {
		this.setComments([...this.state.comments, comment]);
	};

	editComment = updatedComment => {
		const newComments = this.state.comments.map(comment =>
			comment.id !== updatedComment.id ? comment : updatedComment
		);

		this.setComments(newComments);
	};

	deleteComment = commentId => {
		const newComments = this.state.comments.filter(
			comment => comment.id !== commentId
		);

		this.setComments(newComments);
	};

	render() {
		const value = {
			error: this.state.error,
			setError: this.setError,
			clearError: this.clearError,
			sessionList: this.state.sessionList,
			scheduleList: this.state.scheduleList,
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
			expandAll: this.state.expandAll,
			session: this.state.session,
			comments: this.state.comments,
			setSession: this.setSession,
			setComments: this.setComments,
			clearSession: this.clearSession,
			addComment: this.addComment,
			editComment: this.editComment,
			deleteComment: this.deleteComment
		};
		return (
			<AppContext.Provider value={value}>
				{this.props.children}
			</AppContext.Provider>
		);
	}
}
