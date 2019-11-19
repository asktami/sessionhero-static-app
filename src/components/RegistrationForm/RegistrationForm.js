import React, { Component } from 'react';
import { Required } from '../Utils/Utils';
import AuthApiService from '../../services/auth-api-service';

export default class RegistrationForm extends Component {
	static defaultProps = {
		onRegistrationSuccess: () => {}
	};

	state = { error: null };

	handleSubmit = ev => {
		ev.preventDefault();
		const { fullname, nick_name, username, password } = ev.target;

		// console.log('registration form submitted');
		// console.log({ fullname, nick_name, username, password });

		this.setState({ error: null });
		AuthApiService.postUser({
			username: username.value,
			password: password.value,
			fullname: fullname.value,
			nickname: nick_name.value
		})
			.then(user => {
				fullname.value = '';
				nick_name.value = '';
				username.value = '';
				password.value = '';
				this.props.onRegistrationSuccess();
			})
			.catch(res => {
				this.setState({ error: res.error });
			});
	};

	render() {
		const { error } = this.state;
		return (
			<form className="RegistrationForm" onSubmit={this.handleSubmit}>
				<div role="alert">{error && <p className="error">{error}</p>}</div>
				<div>
					<label htmlFor="fullname">
						Fullname <Required />
					</label>
					<input name="fullname" type="text" required id="fullname" />
				</div>
				<div>
					<label htmlFor="username">
						Username <Required />
					</label>
					<input name="username" type="text" required id="username" />
				</div>
				<div className="password">
					<label htmlFor="password">
						Password <Required />
					</label>
					<input
						name="password"
						type="password"
						required
						id="RegistrationForm__password"
					/>
				</div>
				<button className="btn-basic">Register</button>
			</form>
		);
	}
}
