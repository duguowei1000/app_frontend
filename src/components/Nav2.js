import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from './Authentication/Provider';
import AuthStatusIndicator from './AuthStatusIndicator';

const Nav2 = () => {
	const [loginState, _] = useContext(AuthContext);
	const { isLoggedIn } = loginState;

	return (
		<nav class='bg-gray-800'>
			<div class='max-w-7xl mx-auto px-2 sm:px-6 lg:px-8'>
				<div class='relative flex items-center justify-between h-16'>
					<div class='absolute inset-y-0 left-0 flex items-center sm:hidden'>
						<button
							type='button'
							class='inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white'
							aria-controls='mobile-menu'
							aria-expanded='false'
						>
							<span class='sr-only'>Open main menu</span>

							<svg
								class='block h-6 w-6'
								xmlns='http://www.w3.org/2000/svg'
								fill='none'
								viewBox='0 0 24 24'
								stroke='currentColor'
								aria-hidden='true'
							>
								<path
									stroke-linecap='round'
									stroke-linejoin='round'
									stroke-width='2'
									d='M4 6h16M4 12h16M4 18h16'
								/>
							</svg>

							<svg
								class='hidden h-6 w-6'
								xmlns='http://www.w3.org/2000/svg'
								fill='none'
								viewBox='0 0 24 24'
								stroke='currentColor'
								aria-hidden='true'
							>
								<path
									stroke-linecap='round'
									stroke-linejoin='round'
									stroke-width='2'
									d='M6 18L18 6M6 6l12 12'
								/>
							</svg>
						</button>
					</div>
					<div class='flex-1 flex items-center justify-center sm:items-stretch sm:justify-start'>
						<div class='flex-shrink-0 flex items-center'>
							<div class='hidden sm:block sm:ml-6'>
								<div class='flex space-x-4'>
									<div class='text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium'>
										<Link to='/listings/all'>Listings</Link>{' '}
									</div>

									<div class='text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium'>
										{/* {isLoggedIn &&  */}
										<Link to='/dashboard'>Dashboard</Link>
										{/* } */}
									</div>

									<div class='text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium'>
										<Link to='/create'>Create Listing</Link>
									</div>

									<div class='text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium'>
										<Link to='/tenantlistings/all'>Tenant Listings</Link>
									</div>

									<div class='text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium'>
										<Link to='/tenantwatchlist'>Tenant Watchlist</Link>
									</div>

									<div class='text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium'>
										<Link to='/'>Login</Link>
									</div>
								</div>
							</div>
						</div>
						<div class='absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0'>
							<div class='ml-3 relative'>
								<AuthStatusIndicator />
							</div>
						</div>
					</div>
				</div>
			</div>

			<div class='sm:hidden' id='mobile-menu'>
				<div class='px-2 pt-2 pb-3 space-y-1'>
					<div class='text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium'>
						<Link to='/listings/all'>Listings</Link>
					</div>
					<div class='text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium'>
						<Link to='/dashboard'>Dashboard</Link>
					</div>
					<div class='text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium'>
						<Link to='/create'>Create Listing</Link>
					</div>
					<div class='text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium'>
						<Link to='/tenantlistings/all'>Tenant Listings</Link>
					</div>
					<div class='text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium'>
						<Link to='/tenantwatchlist'>Tenant Watchlist</Link>
					</div>
					<div class='text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium'>
						<Link to='/'>Login</Link>
					</div>
				</div>
			</div>
		</nav>
	);
};

export default Nav2;
