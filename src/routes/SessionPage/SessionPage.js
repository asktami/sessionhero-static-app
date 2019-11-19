import React, { Component } from 'react';
import SessionContext from '../../contexts/SessionContext';
import SessionApiService from '../../services/session-api-service';

import SessionListItem from '../../components/SessionListItem/SessionListItem';
// import SessionComments from '../../components/SessionComments/SessionComments';
import CommentForm from '../../components/CommentForm/CommentForm';

import { Link } from 'react-router-dom';
import { Button } from '../../components/Utils/Utils';
import { SessionStarRating } from '../../components/SessionStarRating/SessionStarRating';

import './SessionPage.css';

export default class SessionPage extends Component {
	static defaultProps = {
		match: { params: {} }
	};

	static contextType = SessionContext;

	componentDidMount() {
		const { sessionId } = this.props.match.params;
		this.context.clearError();

		SessionApiService.getSession(sessionId)
			.then(this.context.setSession)
			.catch(this.context.setError);

		SessionApiService.getSessionComments(sessionId)
			.then(this.context.setComments)
			.catch(this.context.setError);

		console.log(this.context.comments);
	}

	// WHAT IS THIS FOR???
	componentWillUnmount() {
		this.context.clearSession();
	}

	renderSession() {
		const { session, comments, deleteComment } = this.context;
		return (
			<>
				<SessionListItem session={session} />
				<SessionComments comments={comments} deleteComment={deleteComment} />
				<CommentForm />
			</>
		);
	}

	render() {
		const { error, session } = this.context;
		let content;
		if (error) {
			content =
				error.error === `Session doesn't exist` ? (
					<p className="error">Session not found</p>
				) : (
					<p className="error">There was an error</p>
				);
		} else if (!session.id) {
			content = <div className="loading" />;
		} else {
			content = this.renderSession();
		}
		return <section>{content}</section>;
	}
}

function SessionComments({ comments = [], deleteComment }) {
	return (
		<ul className="comment-list">
			{comments.map(comment => (
				<li key={comment.id} className="comment-item">
					<div className="comment-text">
						{comment.text}
						<br />

						<div className="flex-row comment-footer ">
							<div>
								{comment.rating}
								<br />
								<SessionStarRating rating={comment.rating} />
								<br />
								<span className="comment-user sponsor">
									LoggedIn UserFirstLast
								</span>
							</div>
							<div className="flex-row comment-btns">
								<div>
									<Link to={`/comments/${comment.id}`}>
										<Button className="btn-edit-comment">Edit</Button>
									</Link>
								</div>
								<div>
									<button
										className="btn-delete-comment"
										onClick={() => deleteComment(comment.id)}
									>
										Delete
									</button>
								</div>
							</div>
						</div>
					</div>
				</li>
			))}
		</ul>
	);
}
