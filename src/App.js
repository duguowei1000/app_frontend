import Seed from './pages/Seed';
import ListingList from './pages/ListingList';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Listings from './routes/Listings.js';
import Dashboard from './routes/Dashboard';
import Listing from './routes/Listing.js';
import Create from './routes/Create';

function App() {
	return (
		<Routes>
			<Route path='listings' element={<Listings />}>
				<Route path='all' element={<ListingList />} />
				<Route path=':id' element={<Listing />} />
			</Route>

			<Route path='dashboard' element={<Dashboard />} />
			<Route path='create' element={<Create />} />
		</Routes>
	);
}

export default App;
