import ListingList from "../pages/ListingList";
import { useEffect, useState } from "react";
import urlcat from "urlcat";
import { BACKEND } from "../utils/utils";
import { Outlet } from "react-router-dom";

function Listings() {

  const [listings,setListings]= useState([])

  useEffect(() => {
      fetch(urlcat(BACKEND, "/api/listings/"))
        .then((response) => response.json())
        .then((data) => setListings(data));
    }, []);


  return (
    <div className="ListingList">
      <Outlet context={[listings, setListings]} / >            
    </div>
  );
}

export default Listings;
