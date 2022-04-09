
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { useOutletContext } from "react-router-dom";
import Search from "../components/Search";


function ListingList() {
    const [listings, setListings] = useOutletContext();
    // const [filteredListings ,setFilteredListings] = useState([])
    const [Value_Min, setValue_Min] = useState()
    const [Value_Max, setValue_Max] = useState()
    const [toggle, setToggle] = useState(false);
    const [show, setShow] = useState(false);

        //   useEffect(() => {
    //     // const reducedArray = fullList.splice(0,30)
    //     // setList(reducedArray)
    //     if (Value_Max.length) {
    //         const searchArray = listings.filter(element => {
    //             const lowercase = element.name.toLowerCase()
    //             const submitted = Value.toLowerCase()
    //             return lowercase.includes(submitted)
    //         });
    //         console.log('search>>>', searchArray)
    //         console.log('list', list)
    //         if (searchArray.length) {
    //             setList(searchArray)
    //     } else setList(fullList)
    //         // setSearchStatus(true)
    //     }

    // }
    //     , [])

    const handleToggle = () => {
      setToggle(!toggle);
  };
    const search = (searchValue_min, searchValue_max) => {
      setShow(true)
      handleToggle()
      console.log(searchValue_min)
      console.log(searchValue_max)
      setValue_Min(searchValue_min)
      setValue_Max(searchValue_max)
      // setList([...fullList])
      console.log(Value_Min)
      console.log(Value_Max)
      
  }

    return (
        <>
            <form action="#">

      Price Range
      <div><Search search={search} toggle={handleToggle} /></div>

      
      <input type="submit" value="Submit" />
</form>
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