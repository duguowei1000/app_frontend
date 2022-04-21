import React from 'react';
import { Link } from 'react-router-dom';

const NavTenant = () => {
	return (
		<header>
			<nav>
				<ul className='nav'>
					<li>
						<Link to='/tenantlistings/all'>Tenant Listings</Link>
					</li>
					<li>
						<Link to='/tenantdashboard'>Tenant Dashboard</Link>
					</li>
				</ul>
			</nav>
		</header>
	);
};

export default NavTenant;
