import React, { Component } from 'react';
import SessionContext from '../../contexts/SessionContext';
import SessionApiService from '../../services/session-api-service';
import { Button, Textarea } from '../Utils/Utils';
import './CommentForm.css';

export default class CommentForm extends Component {
	static contextType = SessionContext;

	handleSubmit = ev => {
		ev.preventDefault();
		const { session } = this.context;
		const { text, rating } = ev.target;

		SessionApiService.postComment(session.id, text.value, Number(rating.value))
			.then(this.context.addComment)
			.then(() => {
				text.value = '';
			})
			.catch(this.context.setError);
	};

	render() {
		return (
			<section>
				<form className="comment-form" onSubmit={this.handleSubmit}>
					<div className="text">
						<Textarea
							required
							aria-label="Type a comment..."
							name="text"
							id="text"
							placeholder="Type a comment.."
						></Textarea>
					</div>

					<select
						required
						aria-label="Rate this session"
						type="number"
						name="rating"
						id="rating"
					>
						<option value="">Rate this session</option>
						<option value="1">1 Star</option>
						<option value="2">2 Stars</option>
						<option value="3">3 Stars</option>
						<option value="4">4 Stars</option>
						<option value="5">5 Stars</option>
					</select>
					<br />
					<br />

					<Button className="btn-save-comment" type="submit">
						Save
					</Button>
				</form>
			</section>
		);
	}
}
