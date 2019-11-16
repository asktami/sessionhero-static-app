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
	getSession(SessionId) {
		return fetch(`${config.API_ENDPOINT}/sessions/${SessionId}`, {
			headers: {
				authorization: `bearer ${TokenService.getAuthToken()}`
			}
		}).then(res =>
			!res.ok ? res.json().then(e => Promise.reject(e)) : res.json()
		);
	},
	getSessionComments(SessionId) {
		return fetch(`${config.API_ENDPOINT}/sessions/${SessionId}/comments`, {
			headers: {
				authorization: `bearer ${TokenService.getAuthToken()}`
			}
		}).then(res =>
			!res.ok ? res.json().then(e => Promise.reject(e)) : res.json()
		);
	},
	postComment(SessionId, text, rating) {
		return fetch(`${config.API_ENDPOINT}/comments`, {
			method: 'POST',
			headers: {
				'content-type': 'application/json',
				authorization: `bearer ${TokenService.getAuthToken()}`
			},
			body: JSON.stringify({
				Session_id: SessionId,
				rating,
				text
			})
		}).then(res =>
			!res.ok ? res.json().then(e => Promise.reject(e)) : res.json()
		);
	}
};

export default SessionApiService;
