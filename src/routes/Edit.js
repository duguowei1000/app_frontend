import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import urlcat from 'urlcat';
import { BACKEND, FRONTEND } from '../utils/utils';

function Edit() {
	const { id } = useParams();
	const url = urlcat(BACKEND, `/api/listings/${id}`);

	const [postal, setPostal] = useState();
	const [district, setDistrict] = useState(0);
	const [address, setAddress] = useState(0);
	const [property_type, setPropertyType] = useState('HDB');
	const [size, setSize] = useState(0);
	const [price, setPrice] = useState(0);
	const [image, setImage] = useState('');
	const [no_of_bedrooms, setBedrooms] = useState(0);
	const [no_of_bathrooms, setBathrooms] = useState(0);
	const [description, setDescription] = useState('');

	const [error, setError] = useState('');
	const [selectedListing, setSelectedListing] = useState([]);

	useEffect(() => {
		fetch(urlcat(BACKEND, '/api/listings/'))
			.then((response) => response.json())

			.then((data) => {
				const selectedListing = data.filter((listing) => listing._id === id);
				console.log('selectedListing', selectedListing);
				setSelectedListing(selectedListing[0]);
			});
		setPostal(`${selectedListing.postal}`);
		setDistrict(`${selectedListing.district}`);
		setAddress(`${selectedListing.address}`);
		setPropertyType(`${selectedListing.property_type}`);
		setSize(`${selectedListing.size}`);
		setPrice(`${selectedListing.price}`);
		setImage(`${selectedListing.image}`);
		setBedrooms(`${selectedListing.no_of_bedrooms}`);
		setBathrooms(`${selectedListing.no_of_bathrooms}`);
		setDescription(`${selectedListing.description}`);
	}, [selectedListing.postal]);

	const updateListing = (listing) => {
		fetch(url, {
			credentials: 'include',
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(listing),
		})
			.then((response) => response.json())
			.then((data) => data)
			.catch((error) => console.log(error));
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		const listing = {
			postal,
			district,
			address,
			property_type,
			size,
			price,
			image,
			no_of_bedrooms,
			no_of_bathrooms,
			description,
		};
		updateListing(listing);
		alert('listing updated');
	};

	return (
		<>
			<form action={urlcat(FRONTEND, 'dashboard')} onSubmit={handleSubmit}>
				Postal:
				<input
					type='text'
					name='postal'
					value={postal}
					onChange={(event) => setPostal(event.target.value)}
				/>
				<br />
				District:
				<input
					type='number'
					name='district'
					value={district}
					onChange={(event) => setDistrict(event.target.value)}
				/>
				<br />
				Address:
				<textarea
					className='inputBox1'
					type='text'
					name='address'
					value={address}
					onChange={(event) => setAddress(event.target.value)}
				/>
				<br />
				Property Type:
				<select
					type='text'
					name='property_type'
					value={property_type}
					onChange={(event) => {
						{
							setPropertyType((prev) => event.target.value); // console.log(event.target.value)
						}
						console.log(property_type);
					}}
				>
					<option value='HDB'>HDB</option>
					<option value='Private'>Private</option>
				</select>
				<br />
				Size:
				<input
					type='number'
					name='size'
					value={size}
					onChange={(event) => setSize(event.target.value)}
				/>
				<br />
				Price:
				<input
					type='number'
					name='price'
					value={price}
					onChange={(event) => setPrice(event.target.value)}
				/>
				<br />
				Image Link:
				<textarea
					className='inputBox1'
					type='text'
					name='image'
					value={image}
					onChange={(event) => setImage(event.target.value)}
				/>
				<br />
				Number of Bedrooms:
				<input
					type='number'
					name='no_of_bedrooms'
					value={no_of_bedrooms}
					onChange={(event) => setBedrooms(event.target.value)}
				/>
				<br />
				Number of Bathrooms:
				<input
					type='number'
					name='no_of_bathrooms'
					value={no_of_bathrooms}
					onChange={(event) => setBathrooms(event.target.value)}
				/>
				<br />
				Description:
				<textarea
					className='inputBox2'
					type='text'
					name='description'
					value={description}
					onChange={(event) => setDescription(event.target.value)}
				/>
				<br />
				<p>{error}</p>
				<button type='submit'>Edit</button>
			</form>
		</>
	);
}

export default Edit;
