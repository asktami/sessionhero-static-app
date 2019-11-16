import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SessionContext from '../../contexts/SessionContext';
import SessionApiService from '../../services/session-api-service';
import { Hyph, Section } from '../../components/Utils/Utils';
import { SessionStarRating } from '../../components/SessionStarRating/SessionStarRating';
import CommentForm from '../../components/CommentForm/CommentForm';
import './SessionPage.css';

export default class SessionPage extends Component {
	static defaultProps = {
		match: { params: {} }
	};

	static contextType = SessionContext;

	componentDidMount() {
		const { SessionId } = this.props.match.params;
		this.context.clearError();
		SessionApiService.getSession(SessionId)
			.then(this.context.setSession)
			.catch(this.context.setError);
		SessionApiService.getSessionComments(SessionId)
			.then(this.context.setComments)
			.catch(this.context.setError);
	}

	componentWillUnmount() {
		this.context.clearSession();
	}

	renderSession() {
		const { Session, comments } = this.context;
		return (
			<>
				<div
					className="SessionPage__image"
					style={{ backgroundImage: `url(${Session.image})` }}
				/>
				<h2>{Session.title}</h2>
				<SessionContent Session={Session} />
				<SessionComments comments={comments} />
				<CommentForm />
			</>
		);
	}

	render() {
		const { error, Session } = this.context;
		let content;
		if (error) {
			content =
				error.error === `Session doesn't exist` ? (
					<p className="red">Session not found</p>
				) : (
					<p className="red">There was an error</p>
				);
		} else if (!Session.id) {
			content = <div className="loading" />;
		} else {
			content = this.renderSession();
		}
		return <Section className="SessionPage">{content}</Section>;
	}
}

function SessionContent({ Session }) {
	return <p className="SessionPage__content">{Session.content}</p>;
}

function SessionComments({ comments = [] }) {
	return (
		<ul className="SessionPage__review-list">
			{comments.map(comment => (
				<li key={comment.id} className="SessionPage__review">
					<p className="SessionPage__review-text">
						<FontAwesomeIcon
							size="lg"
							icon="quote-left"
							className="SessionPage__review-icon blue"
						/>
						{comment.text}
					</p>
					<p className="SessionPage__review-user">
						<SessionStarRating rating={comment.rating} />
						<Hyph />
						{'did-not-find comment.user.full_name'}
					</p>
				</li>
			))}
		</ul>
	);
}
