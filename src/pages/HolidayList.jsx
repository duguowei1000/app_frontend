import { useEffect, useState } from "react";
import urlcat from "urlcat";
import { BACKEND } from "../utils/utils"

function ListingList() {
    const [listings,setListings]= useState([])


    useEffect(() => {
        fetch(urlcat(BACKEND, "/api/listings/"))
          .then((response) => response.json())
          .then((data) => setListings(data));
      }, []);

      const handleDelete = (id) => () => {
        const url = urlcat(BACKEND, `/api/listings/${id}`);
        fetch(url, { method: "DELETE" })
          .then((response) => response.json())
          .then((data) => console.log(data));
      };
      const handleUpdate = (listing) => () => {
        const url = urlcat(BACKEND, `/api/listings/${listing._id}`);
        // const newListing = { ...listing, likes: holiday.likes + 10 }
        
        fetch(url, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            // body: JSON.stringify(newListing),
          })
          .then((response) => response.json())
          .then((data) => console.log(data));
      };

    return (
        <>
        <div className="listingList">
            <ul>
                {listings.map((listing) =>(
                    <li key = {listing._id}>
                      {<img src={listing.image} height="150px" width="200px"/>} <br/>
            Address: {listing.address} <br/>
            District: {listing.district} <br/>
            {/* <span onClick={handleUpdate(listing)}>{listing.price}</span> */}
            Size: {listing.size} sqft<br/>
            Price: ${listing.price}<br/>
            Bedrooms: {listing.no_of_bedrooms}<br/>
            Bathrooms: {listing.no_of_bathrooms}<br/>
            Description: {listing.description}<br/>
                    </li>
                ))}           
            </ul>
            </div>
        </>
    )
}

export default ListingList;