const districts = [
	{
		district: '01',
		postal_prefix: ['01', '02', '03', '04', '05', '06'],
		areas: ['Raffles Place', 'Cecil', 'Marina', "People's Park"],
	},
	{
		district: '02',
		postal_prefix: ['07', '08'],
		areas: ['Anson', 'Tanjong Pagar'],
	},
	{
		district: '03',
		postal_prefix: ['14', '15', '16'],
		areas: ['Queenstown', 'Tiong Bahru'],
	},
	{
		district: '04',
		postal_prefix: ['09', '10'],
		areas: ['Telok Blangah', 'Harbourfront'],
	},
	{
		district: '05',
		postal_prefix: ['11', '12', '13'],
		areas: ['Pasir Panjang', 'Hong Leong Garden', 'Clementi New Town'],
	},
	{
		district: '06',
		postal_prefix: ['17'],
		areas: ['High Street', 'Beach Road (part)'],
	},
	{
		district: '07',
		postal_prefix: ['18', '19'],
		areas: ['Middle Road', 'Golden Mile'],
	},
	{ district: '08', postal_prefix: ['20', '21'], areas: ['Little India'] },
	{
		district: '09',
		postal_prefix: ['22', '23'],
		areas: ['Orchard', 'Cairnhill', 'River Valley'],
	},
	{
		district: '10',
		postal_prefix: ['24', '25', '26', '27'],
		areas: ['Ardmore', 'Bukit Timah', 'Holland Road', 'Tanglin'],
	},
	{
		district: '11',
		postal_prefix: ['28', '29', '30'],
		areas: ['Watten Estate', 'Novena', 'Thomson'],
	},
	{
		district: '12',
		postal_prefix: ['31', '32', '33'],
		areas: ['Balestier', 'Toa Payoh', 'Serangoon'],
	},
	{
		district: '13',
		postal_prefix: ['34', '35', '36', '37'],
		areas: ['Macpherson', 'Braddell'],
	},
	{
		district: '14',
		postal_prefix: ['38', '39', '40', '41'],
		areas: ['Geylang', 'Eunos'],
	},
	{
		district: '15',
		postal_prefix: ['42', '43', '44', '45'],
		areas: ['Katong', 'Joo Chiat', 'Amber Road'],
	},
	{
		district: '16',
		postal_prefix: ['46', '47', '48'],
		areas: ['Bedok', 'Upper East Coast', 'Eastwood', 'Kew Drive'],
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
		areas: ['Jurong'],
	},
	{
		district: '23',
		postal_prefix: ['65', '66', '67', '68'],
		areas: ['Hillview', 'Dairy Farm', 'Bukit Panjang', 'Choa Chu Kang'],
	},
	{
		district: '24',
		postal_prefix: ['69', '70', '71'],
		areas: ['Lim Chu Kang', 'Tengah'],
	},
	{
		district: '25',
		postal_prefix: ['72', '73'],
		areas: ['Kranji', 'Woodgrove'],
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
	{ district: '28', postal_prefix: ['79', '80'], areas: ['Seletar'] },
];

function districtLookupBy(postal) {
	const isValidPostalCode = /^\d{6}$/.test(postal);
	if (!isValidPostalCode) throw new Error('Invalid postal code: ' + postal);

	const postal_prefix = postal.slice(0, 2);
	const district = districts.find((district) =>
		district.postal_prefix.includes(postal_prefix)
	);
	return district;
}

export default districtLookupBy;
