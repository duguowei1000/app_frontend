import Seed from './pages/Seed';
import ListingList from './pages/ListingList';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Nav from './components/Nav';
import { Listings, Dashboard, Listing, Create, Auth, Edit } from './routes';

import TenantListingList from './tenant/TenantListingList';
import TenantWatchList from './tenant/TenantWatchList';

function App() {
	return (
		<div>
			<Nav />
			<Routes>
				<Route path='listings' element={<Listings />}>
					<Route path='all' element={<ListingList />} />
					<Route path=':id' element={<Listing />} />
				</Route>

				<Route path='dashboard' element={<Dashboard />} />
				<Route path='create' element={<Create />} />
				<Route path='listings/:id/edit' element={<Edit />} />

				<Route path='auth' element={<Auth />} />

				<Route path='tenantlistings/all' element={<TenantListingList />} />
				<Route path='tenantwatchlist' element={<TenantWatchList />} />
			</Routes>
		</div>
	);
}

export default App;
