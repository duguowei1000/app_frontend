import { useRef, useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import Modal from './Modal';
import { AuthContext } from '../components/Authentication/Provider';
import urlcat from 'urlcat';
import { BACKEND } from '../utils/utils';
import useModal from '../hooks/useModal';

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

const inputClasses =
	'appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm ';

const SignUp = () => {
	const [loginState, dispatch] = useContext(AuthContext);
	const [isRegister, setIsRegister] = useState(false);
	const [state, setState] = useState(messageSet.signIn);
	const [modalContent, setModalContent] = useState(false);
	const navigate = useNavigate();

	const closeModal = () => {
		setModalContent();
	};

	const switchType = (e) => {
		e.preventDefault();
		const newIsRegister = !isRegister;
		setIsRegister(newIsRegister);
		setState(newIsRegister ? messageSet.signIn : messageSet.register);
	};

	//TODO - add sign up switch form

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

	const submitHandler = async (e) => {
		e.preventDefault();

		const { username, password, rememberMe, accountType } =
			e.target.form.elements;

		const postBody = {
			username: username.value,
			password: password.value,
			rememberMe: rememberMe.checked,
			accountType: accountType.value,
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
			setModalContent(data.message);
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
					className='mt-8 space-y-6'
					id='signup-form'
					action='http://localhost:2000/api/testusers/login'
					method='POST'
				>
					{/* <input type='hidden' name='remember' value='true' /> */}
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
								className={inputClasses + 'rounded-t-md'}
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
								autoComplete={(isRegister ? 'new' : 'current') + '-password'}
								required
								className={inputClasses + (!isRegister ? '' : 'rounded-b-md')}
								placeholder='Password'
							/>
						</div>

						<div style={isRegister ? { display: 'none' } : {}}>
							<label htmlFor='accountType' className='sr-only'>
								Account Type
							</label>
							<select
								id='accountType'
								name='accountType'
								autoComplete='current-password'
								required
								className={inputClasses + 'rounded-b-md'}
								placeholder='Password'
							>
								<option value='tenant'>tenant</option>
								<option value='lister'>lister</option>
							</select>
						</div>
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
								{!isRegister ? (
									/* eslint-disable-next-line jsx-a11y/anchor-is-valid */
									<a
										href='#'
										className='font-medium text-indigo-600 hover:text-indigo-500'
									>
										{' '}
										Forgot your password?
									</a>
								) : undefined}
							</div>
						}
					</div>

					<div>
						<button
							type='submit'
							form='signup-form'
							onClick={submitHandler}
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
							{!isRegister ? 'Register' : 'Sign in'}
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
					{modalContent ? (
						<Modal callback={closeModal}>{modalContent}</Modal>
					) : undefined}
				</div>
			</div>
		</div>
	);
};

export default SignUp;
