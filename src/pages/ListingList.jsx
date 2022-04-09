
import { Link } from 'react-router-dom';
import { useOutletContext } from "react-router-dom";


function ListingList() {
    const [listings, setListings] = useOutletContext();
    console.log(listings)

    return (
        <>
        <div className="listingList">
            <ul>
                {listings.map((listing) =>(
                  <li key = {listing._id}>
                    <div className="listing">
                      <div className="listingImage">
                        {<img src={listing.image} height="300px" width="400px"/>} 
                      </div>
                      <div className="listingInfo">   
                        <b>{listing.address}</b> <br/>
                        District: {listing.district} <br/>
                        {/* <span onClick={handleUpdate(listing)}>{listing.price}</span> */}
                        Size: {listing.size} sqft<br/>
                        Price: ${listing.price}<br/>
                        {listing.no_of_bedrooms}   <img src="http://cdn.onlinewebfonts.com/svg/img_391908.png" height="20x" width="20px" /><br/>
                        {listing.no_of_bathrooms}   <img src="https://cdn-icons-png.flaticon.com/512/637/637270.png" height="20x" width="20px" /><br/>
                        <Link to={`/listings/${listing._id}`}>
                            <button className="viewListing">
                              <span>View Listing</span>
                            </button>
                        </Link>
                      </div>
                    </div>
                  </li>
                ))}           
            </ul>
          </div>
        </>
    )
}

export default ListingList;