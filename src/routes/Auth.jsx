/* eslint-disable no-unused-vars */

import { useState } from 'react';
import urlcat from 'urlcat';
import { login, saveTokens } from '../utils/auth';
import { BACKEND } from '../utils/utils';
import Nav2 from '../components/Nav2';

const backend = BACKEND;
/**  @param {{name:string}} */
const Input = ({ name, value, ...rest }) => {
	const capitaliseName = () => {
		const [first, ...rest] = [...name];
		return `${first.toUpperCase()}${rest.join('')}`;
	};
	const label = capitaliseName();
	const error =
		value.trim().length === 0
			? `${label} is required`
			: value.trim().length < 3
			? 'Username must be at least 3 characters'
			: '';

	return (
		<div className='form-group'>
			<label htmlFor={name}>{label}</label>
			<input {...rest} name={name} id={name} className='form-control' />
			{error && <div className='alert alert-danger'>{error}</div>}
		</div>
	);
};

function Test() {
	return (
		<div>
			<h1>Test</h1>
		</div>
	);
}

export default function Auth() {
	const [details, setDetails] = useState({ username: '', password: '' });
	const [isAuthorised, setIsAuthorised] = useState(false);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setDetails((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};

	const handleLogin = async (e) => {
		e.preventDefault();
		const response = await fetch(urlcat(backend, '/auth/login'), {
			credentials: 'include',
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(details),
		});
		if (response.status === 200) {
			const data = await response.json();
			console.log('data', data);
			saveTokens(data);
			setIsAuthorised(true);
		}
		return alert('Invalid username or password');
	};

	const handleSignup = async (e) => {
		e.preventDefault();
		const response = await fetch(urlcat(backend, '/auth/signup'), {
			credentials: 'include',
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(details),
		});
		if (response.status === 200) {
			const data = await response.json();
			console.log('data', data);
			saveTokens(data);
			setIsAuthorised(true);
		}
	};

	const doTest = async (e) => {
		e.preventDefault();
		const response = await fetch(urlcat(backend, '/auth/test'), {
			credentials: 'include',
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		});
		if (!response.status === 200) return alert('Invalid username or password');
		const data = await response.json();
		console.log(data);
	};

	return (
		<>
			<Nav2 />
			<h1>Auth</h1>

			<form>
				{/* show an icon if user is logged in */}
				{!isAuthorised ? (
					<>
						<Input
							name='username'
							value={details.username}
							onChange={handleChange}
						/>
						<Input
							name='password'
							value={details.password}
							onChange={handleChange}
						/>
						<button onClick={handleLogin} className='btn btn-primary'>
							Login
						</button>
						<button onClick={handleSignup} className='btn btn-primary'>
							Signup
						</button>
						<button onClick={doTest}>test</button>
					</>
				) : (
					<p>Youre logged in</p>
				)}
			</form>
		</>
	);
}
