import React, { Component } from 'react';

const SessionContext = React.createContext({
	session: [],
	comments: [],
	error: null,
	setError: () => {},
	clearError: () => {},
	setSession: () => {},
	setComments: () => {},
	clearSession: () => {},
	addComment: () => {},
	editComment: () => {},
	deleteComment: () => {}
});

export default SessionContext;

export class SessionProvider extends Component {
	state = {
		session: [],
		error: null,
		comments: []
	};

	setError = error => {
		console.error(error);
		this.setState({ error });
	};

	clearError = () => {
		this.setState({ error: null });
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
			session: this.state.session,
			comments: this.state.comments,
			error: this.state.error,
			setError: this.setError,
			clearError: this.clearError,
			setSession: this.setSession,
			setComments: this.setComments,
			clearSession: this.clearSession,
			addComment: this.addComment,
			editComment: this.editComment,
			deleteComment: this.deleteComment
		};
		return (
			<SessionContext.Provider value={value}>
				{this.props.children}
			</SessionContext.Provider>
		);
	}
}
