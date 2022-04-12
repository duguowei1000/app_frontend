import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './App.css';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Listings from "./routes/Listings.js";
import Listing from "./routes/Listing.js";
import ListingList from './pages/ListingList';
import Create from './routes/Create';


import App from './App';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <BrowserRouter basename="">
    <Routes>
      
      <Route path="/listings" element={<Listings />}>
        <Route path="/listings/all" element={<ListingList />}/>
        <Route path="/listings/:id" element={<Listing />}/>
      </Route>
      <Route path="/create" element={<Create />}></Route>
       
    </Routes>
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
