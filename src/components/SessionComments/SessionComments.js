import React, { Component } from 'react';
import SessionContext from '../../contexts/SessionContext';
import SessionApiService from '../../services/session-api-service';

import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from '../Utils/Utils';
import { SessionStarRating } from '../../components/SessionStarRating/SessionStarRating';

export default class SessionContents extends Component {
	static defaultProps = {
		match: { params: {} }
	};

	static contextType = SessionContext;

	render() {
		const { deleteComment } = this.context;

		return (
			<ul className="comment-list">
				{this.props.comments.map(comment => (
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
}
