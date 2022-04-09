import { useOutletContext, useParams } from "react-router-dom";


function Listing() {

    const { id } = useParams();
    const [listings, setListings] = useOutletContext();

    const selectedListing = listings.filter(listing => listing._id === id)
    console.log(selectedListing)

  return (
    <div className="ListingList">
        id is: {selectedListing.address} ;
    </div>
  );
}

export default Listing;
