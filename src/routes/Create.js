import { useContext, useState, useRef } from 'react';
import urlcat from 'urlcat';
import { BACKEND, FRONTEND } from '../utils/utils';
import Nav2 from '../components/Nav2';
import { AuthContext } from '../components/Authentication/Provider';

const url = urlcat(BACKEND, '/api/listings/');

const districts = [
	{
		district: '01',
		postal_prefix: ['01', '02', '03', '04', '05', '06'],
		areas: ['Raffles Place', 'Marina Bay'],
	},
	{
		district: '02',
		postal_prefix: ['07', '08'],
		areas: ['Chinatown', 'Tanjong Pagar'],
	},
	{
		district: '03',
		postal_prefix: ['14', '15', '16'],
		areas: ['Queenstown', 'Redhill', 'Tiong Bahru'],
	},
	{
		district: '04',
		postal_prefix: ['09', '10'],
		areas: ['Telok Blangah', 'Harbourfront'],
	},
	{
		district: '05',
		postal_prefix: ['11', '12', '13'],
		areas: ['Pasir Panjang', 'Clementi', 'West Coast'],
	},
	{
		district: '06',
		postal_prefix: ['17'],
		areas: ['City Hall'],
	},
	{
		district: '07',
		postal_prefix: ['18', '19'],
		areas: ['Bugis', 'Rochor'],
	},
	{
		district: '08',
		postal_prefix: ['20', '21'],
		areas: ['Farrer Park', 'Little India'],
	},
	{
		district: '09',
		postal_prefix: ['22', '23'],
		areas: ['Orchard', 'River Valley'],
	},
	{
		district: '10',
		postal_prefix: ['24', '25', '26', '27'],
		areas: ['Bukit Timah', 'Holland'],
	},
	{
		district: '11',
		postal_prefix: ['28', '29', '30'],
		areas: ['Novena', 'Newton'],
	},
	{
		district: '12',
		postal_prefix: ['31', '32', '33'],
		areas: ['Balestier', 'Toa Payoh'],
	},
	{
		district: '13',
		postal_prefix: ['34', '35', '36', '37'],
		areas: ['Macpherson', 'Potong Pasir'],
	},
	{
		district: '14',
		postal_prefix: ['38', '39', '40', '41'],
		areas: ['Geylang', 'Eunos', 'Kembangan'],
	},
	{
		district: '15',
		postal_prefix: ['42', '43', '44', '45'],
		areas: ['Katong', 'Marine Parade', 'Siglap', 'Tanjong Rhu'],
	},
	{
		district: '16',
		postal_prefix: ['46', '47', '48'],
		areas: ['Bedok', 'Bayshore'],
	},
	{
		district: '17',
		postal_prefix: ['49', '50', '81'],
		areas: ['Loyang', 'Changi'],
	},
	{
		district: '18',
		postal_prefix: ['51', '52'],
		areas: ['Tampines', 'Pasir Ris'],
	},
	{
		district: '19',
		postal_prefix: ['53', '54', '55', '82'],
		areas: ['Serangoon Garden', 'Hougang', 'Punggol'],
	},
	{
		district: '20',
		postal_prefix: ['56', '57'],
		areas: ['Bishan', 'Ang Mo Kio'],
	},
	{
		district: '21',
		postal_prefix: ['58', '59'],
		areas: ['Upper Bukit Timah', 'Clementi Park', 'Ulu Pandan'],
	},
	{
		district: '22',
		postal_prefix: ['60', '61', '62', '63', '64'],
		areas: ['Jurong', 'Boon Lay', 'Tuas'],
	},
	{
		district: '23',
		postal_prefix: ['65', '66', '67', '68'],
		areas: ['Hillview', 'Bukit Batok', 'Bukit Panjang', 'Choa Chu Kang'],
	},
	{
		district: '24',
		postal_prefix: ['69', '70', '71'],
		areas: ['Lim Chu Kang', 'Tengah', 'Kranji'],
	},
	{
		district: '25',
		postal_prefix: ['72', '73'],
		areas: ['Admiralty', 'Woodlands'],
	},
	{
		district: '26',
		postal_prefix: ['77', '78'],
		areas: ['Upper Thomson', 'Springleaf'],
	},
	{
		district: '27',
		postal_prefix: ['75', '76'],
		areas: ['Yishun', 'Sembawang'],
	},
	{
		district: '28',
		postal_prefix: ['79', '80'],
		areas: ['Seletar', 'Yio Chu Kang'],
	},
];

function districtLookupBy(postal) {
	if (postal.length === 6) {
		const postal_prefix = postal.slice(0, 2);
		const district = districts.find((district) =>
			district.postal_prefix.includes(postal_prefix)
		);
		return district.district;
	} else {
		return 'Enter Valid Postal';
	}
}

function Create() {
	const [postal, setPostal] = useState('');
	const [district, setDistrict] = useState('');
	const [address, setAddress] = useState('');
	const [property_type, setPropertyType] = useState('HDB');
	const [size, setSize] = useState('');
	const [price, setPrice] = useState('');
	const [image, setImage] = useState('');
	const [no_of_bedrooms, setBedrooms] = useState('');
	const [no_of_bathrooms, setBathrooms] = useState('');
	const [description, setDescription] = useState('');

	const [loginState, _] = useContext(AuthContext);
	console.log('loginState', loginState);
	const [error, setError] = useState('');

	const createListing = (listing) => {
		fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				...listing,
				lister: loginState.name,
			}),
		})
			.then((response) => response.json())
			.then((data) => {
				if (data.error) {
					setError(data.error);
				}
			})
			.catch((error) => console.log(error));
	};

	const inputHandler = (event) => {
		const postalCode = event.target.value;
		setPostal(postalCode);
		setDistrict(districtLookupBy(postalCode));
	};

	const handleSubmit = (event) => {
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
		createListing(listing);
		alert('listing created');
	};

	return (
		<>
			<Nav2 />
			<form action={urlcat(FRONTEND, 'listings/all')} onSubmit={handleSubmit}>
				Postal:
				<input
					type='text'
					name='postal'
					value={postal}
					onInput={inputHandler}
				/>
				<br />
				District:
				<input type='text' placeholder='' name='district' value={district} />
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
				<button type='submit'>Create</button>
			</form>
		</>
	);
}

export default Create;
