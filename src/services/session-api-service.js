import config from '../config';
import TokenService from './token-service';

const SessionApiService = {
	getSessions() {
		return fetch(`${config.API_ENDPOINT}/sessions`, {
			headers: {
				'content-type': 'application/json'
			}
		}).then(res =>
			!res.ok ? res.json().then(e => Promise.reject(e)) : res.json()
		);
	},
	getSchedule() {
		return fetch(`${config.API_ENDPOINT}/schedule`, {
			headers: {
				'content-type': 'application/json'
			}
		}).then(res =>
			!res.ok ? res.json().then(e => Promise.reject(e)) : res.json()
		);
	},
	getSession(sessionId) {
		return fetch(`${config.API_ENDPOINT}/sessions/${sessionId}`, {
			headers: {
				'content-type': 'application/json',
				authorization: `bearer ${TokenService.getAuthToken()}`
			}
		}).then(res =>
			!res.ok ? res.json().then(e => Promise.reject(e)) : res.json()
		);
	},
	getSessionComments(sessionId) {
		return fetch(`${config.API_ENDPOINT}/sessions/${sessionId}/comments`, {
			headers: {
				'content-type': 'application/json',
				authorization: `bearer ${TokenService.getAuthToken()}`
			}
		}).then(res =>
			!res.ok ? res.json().then(e => Promise.reject(e)) : res.json()
		);
	},

	getComment(commentId) {
		return fetch(`${config.API_ENDPOINT}/comments/${commentId}`, {
			headers: {
				'content-type': 'application/json',
				authorization: `bearer ${TokenService.getAuthToken()}`
			}
		}).then(res =>
			!res.ok ? res.json().then(e => Promise.reject(e)) : res.json()
		);
	},
	deleteComment(commentId) {
		return fetch(`${config.API_ENDPOINT}/comments/${commentId}`, {
			method: 'DELETE',
			headers: {
				'content-type': 'application/json',
				authorization: `bearer ${TokenService.getAuthToken()}`
			}
		}).then(res =>
			!res.ok ? res.json().then(e => Promise.reject(e)) : res.json()
		);
	},
	editComment(comment) {
		return fetch(`${config.API_ENDPOINT}/comments/${comment.id}`, {
			method: 'PATCH',
			headers: {
				'content-type': 'application/json',
				authorization: `bearer ${TokenService.getAuthToken()}`
			},
			body: JSON.stringify({
				comment
			})
		}).then(res =>
			!res.ok
				? res.json().then(e => Promise.reject(e))
				: res.json().then(json => console.log(json))
		);
	},
	addComment(sessionId, text, rating) {
		return fetch(`${config.API_ENDPOINT}/comments`, {
			method: 'POST',
			headers: {
				'content-type': 'application/json',
				authorization: `bearer ${TokenService.getAuthToken()}`
			},
			body: JSON.stringify({
				session_id: sessionId,
				rating,
				text
			})
		}).then(res =>
			!res.ok
				? res.json().then(e => Promise.reject(e))
				: res.json().then(json => console.log(json))
		);
	}
};

export default SessionApiService;
