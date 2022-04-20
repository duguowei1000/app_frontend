import React from 'react';
import { Link } from 'react-router-dom';

const Nav = () => {
	return (
		<header>
			<nav>
				<ul className='nav'>
					<li>
						<Link to='/listings/all'>Listings</Link>
					</li>
					<li>
						<Link to='/dashboard'>Dashboard</Link>
					</li>
					<li>
						<Link to='/create'>Create Listing</Link>
					</li>
					<li>
						<Link to='/auth'>Auth</Link>
					</li>
					<li>
						<Link to='/tenantlistings/all'>Tenant Listings</Link>
					</li>
					<li>{/* <Link to='/tenantwatchlist'>Tenant Watchlist</Link> */}</li>
				</ul>
			</nav>
		</header>
	);
};

export default Nav;
