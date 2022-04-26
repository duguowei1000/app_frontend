import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from './Authentication/Provider';
import AuthStatusIndicator from './AuthStatusIndicator';
import urlcat from 'urlcat';
import { BACKEND } from '../utils/utils';
/*

? admin all
? tenant -dashboard -create
? lister -tenantlisting -tenantwatchlist

*/
const Nav2 = () => {
	const [loginState, dispatch] = useContext(AuthContext);
	const { isLoggedIn } = loginState;

	const initiateLogout = async () => {
		dispatch({ type: 'LOGOUT_REQUEST' });
	};

	return (
		<nav className='bg-gray-800'>
			<div className='max-w-7xl mx-auto px-2 sm:px-6 lg:px-8'>
				<div className='relative flex items-center justify-between h-16'>
					<div className='absolute inset-y-0 left-0 flex items-center sm:hidden'>
						<button
							type='button'
							className='inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white'
							aria-controls='mobile-menu'
							aria-expanded='false'
						>
							<span className='sr-only'>Open main menu</span>

							<svg
								className='block h-6 w-6'
								xmlns='http://www.w3.org/2000/svg'
								fill='none'
								viewBox='0 0 24 24'
								stroke='currentColor'
								aria-hidden='true'
							>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth='2'
									d='M4 6h16M4 12h16M4 18h16'
								/>
							</svg>

							<svg
								className='hidden h-6 w-6'
								xmlns='http://www.w3.org/2000/svg'
								fill='none'
								viewBox='0 0 24 24'
								stroke='currentColor'
								aria-hidden='true'
							>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth='2'
									d='M6 18L18 6M6 6l12 12'
								/>
							</svg>
						</button>
					</div>
					<div className='flex-1 flex items-center justify-center sm:items-stretch sm:justify-start'>
						<div className='flex-shrink-0 flex items-center'>
							<div className='hidden sm:block sm:ml-6'>
								<div className='flex space-x-4'>
									<div className='text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium'>
										<Link to='/listings/all'>Listings</Link>{' '}
									</div>

									<div className='text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium'>
										{/* {isLoggedIn &&  */}
										<Link to='/dashboard'>Dashboard</Link>
										{/* } */}
									</div>

									<div className='text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium'>
										<Link to='/create'>Create Listing</Link>
									</div>

									<div className='text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium'>
										<Link to='/tenantlistings/all'>Tenant Listings</Link>
									</div>

									<div className='text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium'>
										<Link to='/tenantwatchlist'>Tenant Watchlist</Link>
									</div>
									{isLoggedIn ? (
										<button
											onClick={initiateLogout}
											className='text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium'
										>
											Logout
											{/* <Link to='/'>Logout</Link> */}
											<a
												href='http://localhost:3000/'
												className='btn btn-danger'
											></a>
										</button>
									) : (
										<button className='text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium'>
											<Link to='/'>Login</Link>
										</button>
									)}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* 			<div className='sm:hidden' id='mobile-menu'>
				<div className='px-2 pt-2 pb-3 space-y-1'>
					<div className='text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium'>
						<Link to='/listings/all'>Listings</Link>
					</div>
					<div className='text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium'>
						<Link to='/dashboard'>Dashboard</Link>
					</div>
					<div className='text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium'>
						<Link to='/create'>Create Listing</Link>
					</div>
					<div className='text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium'>
						<Link to='/tenantlistings/all'>Tenant Listings</Link>
					</div>
					<div className='text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium'>
						<Link to='/tenantwatchlist'>Tenant Watchlist</Link>
					</div>
					<div className='text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium'>
						<Link to='/'>Login</Link>
					</div>
				</div>
			</div> */}
		</nav>
	);
};

export default Nav2;
