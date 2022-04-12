import { useOutletContext, useParams } from "react-router-dom";



function Listing() {

    const { id } = useParams();
    const [listings, setListings] = useOutletContext();

    const selectedListing = (listings.filter(listing => listing._id === id))[0]
    console.log(selectedListing)

  return (
    <div className="individualListing">
        <img src={selectedListing.image} height="50%" width="50%" /> <br/>
        <h4>Property Details:</h4>
        <h1>{selectedListing.address} ({selectedListing.property_type})<br/></h1>
        <h3>(District {selectedListing.district}) <br/><br/>
        Size: {selectedListing.size} sqft <br/><br/>
        Price: ${selectedListing.price}<br/><br/>


        {selectedListing.no_of_bedrooms} <img src="http://cdn.onlinewebfonts.com/svg/img_391908.png" height="25x" width="25px" /> <br/><br/>
        {selectedListing.no_of_bathrooms} <img src="https://cdn-icons-png.flaticon.com/512/637/637270.png" height="25x" width="25px" /> <br/><br/>
        </h3>
        <u>Property Description:<br/> <br/></u> 
        {selectedListing.description} <br/><br/> 

    </div>
  );
}

export default Listing;