import React, { useRef, useState, useContext } from 'react';
import { Link } from 'react-router-dom';

import Modal from './Modal';
import { AuthContext } from '../components/Authentication/Provider';
import urlcat from 'urlcat';
import { BACKEND } from '../utils/utils';
import { useNavigate } from 'react-router-dom';

const messages = {
	signIn: 'Sign in to your account',
	register: 'Register A New Account',
};

const linkTo = {
	signIn: 'auth/login',
	register: 'auth/signup',
};

const messageSet = {
	signIn: {
		mainMessage: messages.signIn,
		subMessage: messages.register,
		link: linkTo.signIn,
	},
	register: {
		mainMessage: messages.register,
		subMessage: messages.signIn,
		link: linkTo.register,
	},
};

const SignUp = () => {
	const [isRegister, setIsRegister] = useState(false);
	const [state, setState] = useState(messageSet.signIn);
	const [modalContent, setModalContent] = useState(false);

	const setDummyContent = () => {
		setModalContent(
			<div>
				<h1>{state.mainMessage}</h1>
				<p>{state.subMessage}</p>
				<Link to={state.link}>{state.link}</Link>
			</div>
		);
	};

	const closeModal = () => {
		setModalContent(null);
	};

	const navigate = useNavigate();

	const switchType = (e) => {
		e.preventDefault();
		setIsRegister(!isRegister);
		setState(isRegister ? messageSet.signIn : messageSet.register);
	};

	//TODO - add sign up switch form
	const [loginState, dispatch] = useContext(AuthContext);
	const formRef = useRef();
	console.log('loginState', loginState);
	const ListerName = 'LISTER';
	const TenantName = 'TENANT';
	const formInput = TenantName;

	const doTest = async (e) => {
		const jwt = sessionStorage.getItem('jwt');
		// console.log('jwt', jwt);
		const res = await fetch(urlcat(BACKEND, '/auth/test/'), {
			credentials: 'include',
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `jwt ${jwt}`,
			},
		});
		const data = await res.json();
		console.log('data', data);
	};

	const clickHandler = async (e) => {
		e.preventDefault();

		// const { username, password, rememberMe, accountType } = formRef.current;
		const postBody = isRegister
			? {
					username: formRef.current.username.value,
					password: formRef.current.password.value,
					rememberMe: formRef.current.rememberMe.checked,
					accountType: formRef.current.accountType.value,
			  }
			: {
					username: formRef.current.username.value,
					password: formRef.current.password.value,
					rememberMe: formRef.current.rememberMe.checked,
			  };

		const res = await fetch(urlcat(BACKEND, state.link), {
			credentials: 'include',
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(postBody),
		});
		const data = await res.json();
		if (data.success) {
			const {
				token,
				refreshToken,
				userData: { username, accountType, userId, listings },
			} = data;
			dispatch({
				type: 'LOGIN_SUCCESS',
				payload: {
					jwt: token,
					refreshToken,
					username,
					accountType,
					userId,
					listings,
				},
			});
			const nav = setTimeout(() => {
				navigate('/listings/all');
			}, 1200);
			setModalContent(
				<div>
					<h1>Success!</h1>
					<p>You have successfully logged in!</p>
					<p>redirecting...</p>

					<p>
						or click{' '}
						<Link onClick={() => clearTimeout(nav)} to='/listings/all'>
							here
						</Link>{' '}
						to proceed
					</p>
				</div>
			);
		} else {
			dispatch({
				type: 'LOGIN_FAILURE',
				payload: data.message,
			});
			alert(data.message);
		}
	};

	return (
		<div className='min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8'>
			<div className='max-w-md w-full space-y-8'>
				<div>
					<h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900'>
						{state.mainMessage}
					</h2>
					<div className='mt-2 text-center text-sm text-gray-600'>
						Or {''}
						<p className='font-medium text-indigo-600 hover:text-indigo-500'>
							{' '}
							<button type='button' onClick={switchType}>
								{state.subMessage}
							</button>{' '}
						</p>
					</div>
				</div>

				<form
					ref={formRef}
					className='mt-8 space-y-6'
					action='http://localhost:2000/api/testusers/login'
					method='POST'
				>
					<input type='hidden' name='remember' value='true' />
					<div className='rounded-md shadow-sm -space-y-px'>
						<div>
							<label htmlFor='username' className='sr-only'>
								Username
							</label>
							<input
								id='username'
								name='username'
								type='username'
								autoComplete='username'
								required
								className='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
								placeholder='Username'
							/>
						</div>
						<div>
							<label htmlFor='password' className='sr-only'>
								Password
							</label>
							<input
								id='password'
								name='password'
								type='password'
								autoComplete='current-password'
								required
								className={
									isRegister
										? 'appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
										: 'appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm rounded-b-md'
								}
								placeholder='Password'
							/>
						</div>
						{isRegister ? (
							<div>
								<label htmlFor='accountType' className='sr-only'>
									Account Type
								</label>
								<select
									id='accountType'
									name='accountType'
									type='accountType'
									autoComplete='current-password'
									required
									className='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
									placeholder='Password'
								>
									<option value='tenant'>tenant</option>
									<option value='lister'>lister</option>
								</select>
							</div>
						) : null}
					</div>

					<div className='flex items-center justify-between'>
						<div className='flex items-center'>
							<input
								id='remember-me'
								name='rememberMe'
								type='checkbox'
								className='h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded'
							/>
							<label
								htmlFor='remember-me'
								className='ml-2 block text-sm text-gray-900'
							>
								{' '}
								Remember me{' '}
							</label>
						</div>
						{
							<div className='text-sm'>
								<a
									href='#'
									className='font-medium text-indigo-600 hover:text-indigo-500'
								>
									{' '}
									{!isRegister ? 'Forgot your password? ' : ''}
								</a>
							</div>
						}
					</div>

					<div>
						<button
							type='button'
							onClick={clickHandler}
							className='group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
						>
							<span className='absolute left-0 inset-y-0 flex items-center pl-3'>
								<svg
									className='h-5 w-5 text-indigo-500 group-hover:text-indigo-400'
									xmlns='http://www.w3.org/2000/svg'
									viewBox='0 0 20 20'
									fill='currentColor'
									aria-hidden='true'
								>
									<path
										fillRule='evenodd'
										d='M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z'
										clipRule='evenodd'
									/>
								</svg>
							</span>
							{isRegister ? 'Register' : 'Sign in'}
						</button>
					</div>

					<div className='font-medium text-indigo-600 hover:text-indigo-500'>
						{' '}
						<Link to={`/listings/all`}>
							{loginState.isLoggedIn
								? `Welcome to reallistic, ${loginState.name}!`
								: 'Skip To Browse Listings As Guest'}
						</Link>{' '}
					</div>
				</form>
				<div>
					{/* 				<p>{JSON.stringify(loginState)}</p>
					<button onClick={doTest}>test</button>
					<button onClick={setDummyContent}>model</button> */}
					{modalContent ? (
						<Modal callback={closeModal}>{modalContent}</Modal>
					) : null}
				</div>
			</div>
		</div>
	);
};

export default SignUp;
