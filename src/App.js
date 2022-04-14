import Seed from './pages/Seed';
import ListingList from './pages/ListingList';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Listings, Dashboard, Listing, Create, Auth } from './routes';

import Nav from './components/Nav.js';

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
          
        <Route path='auth' element={<Auth />} />
			</Routes>
		</div>

	);
}

export default App;
