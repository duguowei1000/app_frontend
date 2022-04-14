import { useState } from 'react';
const backend = 'http://localhost:2000';
const Input = ({ name, label, error, ...rest }) => {
	return (
		<div className='form-group'>
			<label htmlFor={name}>{label}</label>
			<input
				{...rest}
				name={name}
				id={name}
				className='form-control'
				autoFocus
			/>
			{error && <div className='alert alert-danger'>{error}</div>}
		</div>
	);
};

export default function Auth() {
	const [details, setDetails] = useState({ username: '', password: '' });

	const handleChange = (e) => {
		const { name, value } = e.target;
		setDetails((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};

	// const ad
	// const authHeader = `Authorisation: Bearer ${ad}`

	const submitInput = async (e) => {
		e.preventDefault();
		console.log(details);
		const res = await fetch(`${backend}/auth/login`, {
			credentials: 'include',
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(details),
		});
		const data = await res.json();
		console.log(data);
		console.log('first', JSON.stringify([res.status, data]));
	};

	const testAuth = (e) => {
		fetch(`${backend}/auth/test`, {
			credentials: 'include',
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		})
			.then((res) => res.json())
			.then((data) => {
				console.log(data);
			});
	};

	return (
		<>
			<h1>Auth</h1>
			<form>
				{' '}
				{/* action='' method='get'> */}
				<Input
					name='username'
					label='Username'
					error={
						details.username.length < 3
							? 'Username must be at least 3 characters'
							: null
					}
					value={details.username}
					onChange={handleChange}
				/>
				<Input
					name='password'
					label='Password'
					error={
						details.password.length < 3
							? 'Password must be at least 3 characters'
							: null
					}
					value={details.password}
					onChange={handleChange}
				/>
				<button onClick={submitInput}>Login</button>
				<button onClick={testAuth}>Auth</button>
			</form>
		</>
	);
}
