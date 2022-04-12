import { useState } from "react";
import urlcat from "urlcat";
import { BACKEND } from "../utils/utils";


const url = urlcat(BACKEND, "/api/listings/");


function Create() {
    const [postal, setPostal] = useState("");
    const [propertyType, setPropertyType] = useState("");
    const [size, setSize] = useState(0);
    const [price, setPrice] = useState(0);
    const [image, setImage] = useState("");
    const [bedrooms, setBedrooms] = useState(0);
    const [bathrooms, setBathrooms] = useState(0);
    const [description, setDescription] = useState("");

    const [error, setError] = useState("")

    const createListing = (listing) => {
        fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(listing),
        })
        .then((response) => response.json())
        .then((data) => {
            if (data.error) {
                setError(data.error)
            }
        }).catch(error => console.log(error) );
    };
    
      const handleSubmit = (event) => {
        event.preventDefault();
        const listing = { postal, propertyType, size, price, image, bedrooms, bathrooms, description }
        createListing(listing)
      };

  return (
    <>
      <form onSubmit={handleSubmit}>
        Postal:
        <input 
            type="text"
            name="postal"
            value={postal}
            onChange={(event) => setPostal(event.target.value)}
        />
        <br />

        Property Type:
        <input 
            type="text"
            name="postal"
            value={propertyType}
            onChange={(event) => setPropertyType(event.target.value)}
        />
        <br />

        Size:
        <input 
         type="number" 
            name="size" 
            value={size} 
            onChange={(event) => setSize(event.target.value)}
        /> 
        <br />

        Price:
        <input 
         type="number" 
            name="price" 
            value={price} 
            onChange={(event) => setPrice(event.target.value)}
        /> 
        <br />

        Image Link:
        <input 
            type="text"
            name="image"
            value={image}
            onChange={(event) => setImage(event.target.value)}
        />
        <br />

        Number of Bedrooms:
        <input 
         type="number" 
            name="bedrooms" 
            value={bedrooms} 
            onChange={(event) => setBedrooms(event.target.value)}
        /> 
        <br />

        Number of Bathrooms:
        <input 
         type="number" 
            name="bathrooms" 
            value={bathrooms} 
            onChange={(event) => setBathrooms(event.target.value)}
        /> 
        <br />

        Description:
        <input 
            type="text"
            name="description"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
        />
        <br />

        <p>{error}</p>

        <button>Create</button>
      </form>
    </>
  );
}

export default Create;


