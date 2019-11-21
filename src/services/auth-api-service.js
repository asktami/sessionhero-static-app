import config from '../config';

const AuthApiService = {
	postLogin(credentials) {
		return fetch(`${config.AUTH_ENDPOINT}/auth/login`, {
			method: 'POST',
			headers: {
				'content-type': 'application/json'
			},
			body: JSON.stringify(credentials)
		}).then(res =>
			!res.ok ? res.json().then(e => Promise.reject(e)) : res.json()
		);

		// grab logged in userId from res.json()
	},

	postUser(user) {
		return fetch(`${config.AUTH_ENDPOINT}/users`, {
			method: 'POST',
			headers: {
				'content-type': 'application/json'
			},
			body: JSON.stringify(user)
		}).then(res =>
			!res.ok ? res.json().then(e => Promise.reject(e)) : res.json()
		);
	}
};

export default AuthApiService;
