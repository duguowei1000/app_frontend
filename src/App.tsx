import ListingList from './pages/ListingList';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Provider from './components/Authentication/Provider';

import { Listings, Dashboard, Listing, Create, Edit, Home } from './routes';

import TenantListingList from './tenant/TenantListingList';
import TenantWatchList from './tenant/TenantWatchList';
import Forbidden from './pages/Forbidden';
import Protected from './components/Protected';

function App() {
	return (
		<Provider>
			<Routes>
				<Route path='' element={<Home />}></Route>
				<Route path='listings' element={<Listings />}>
					<Route path='all' element={<ListingList />} />
					<Route path=':id' element={<Listing />} />
				</Route>
				<Route
					path='dashboard'
					element={
						<Protected credType='lister'>
							<Dashboard />
						</Protected>
					}
				/>
				<Route
					path='create'
					element={
						<Protected credType='lister'>
							<Create />
						</Protected>
					}
				/>
				<Route
					path='listings/:id/edit'
					element={
						<Protected credType='lister'>
							<Edit />
						</Protected>
					}
				/>

				<Route path='' element={<Home />} />

				<Route path='tenantlistings/all' element={<TenantListingList />} />
				<Route path='tenantwatchlist' element={<TenantWatchList />} />
				<Route path='fourohthree' element={<Forbidden />} />
			</Routes>
		</Provider>
	);
}

export default App;
