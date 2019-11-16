import config from '../config';
import TokenService from './token-service';

const SessionApiService = {
	getSessions() {
		return fetch(`${config.API_ENDPOINT}/sessions`, {
			headers: {}
		}).then(res =>
			!res.ok ? res.json().then(e => Promise.reject(e)) : res.json()
		);
	},
	getSchedule() {
		return fetch(`${config.API_ENDPOINT}/schedule`, {
			headers: {}
		}).then(res =>
			!res.ok ? res.json().then(e => Promise.reject(e)) : res.json()
		);
	},
	getSession(sessionId) {
		return fetch(`${config.API_ENDPOINT}/sessions/${sessionId}`, {
			headers: {
				authorization: `bearer ${TokenService.getAuthToken()}`
			}
		}).then(res =>
			!res.ok ? res.json().then(e => Promise.reject(e)) : res.json()
		);
	},
	getSessionComments(sessionId) {
		return fetch(`${config.API_ENDPOINT}/sessions/${sessionId}/comments`, {
			headers: {
				authorization: `bearer ${TokenService.getAuthToken()}`
			}
		}).then(res =>
			!res.ok ? res.json().then(e => Promise.reject(e)) : res.json()
		);
	},
	postComment(sessionId, comment, rating) {
		return fetch(`${config.API_ENDPOINT}/comments`, {
			method: 'POST',
			headers: {
				'content-type': 'application/json',
				authorization: `bearer ${TokenService.getAuthToken()}`
			},
			body: JSON.stringify({
				session_id: sessionId,
				rating,
				comment
			})
		}).then(res =>
			!res.ok ? res.json().then(e => Promise.reject(e)) : res.json()
		);
	}
};

export default SessionApiService;
