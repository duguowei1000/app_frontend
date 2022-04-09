import { useOutletContext, useParams } from "react-router-dom";


function Listing() {

    const { id } = useParams();
    const [listings, setListings] = useOutletContext();
    console.log(listings);

  return (
    <div className="ListingList">
        Welcome! {id}
    </div>
  );
}

export default Listing;
