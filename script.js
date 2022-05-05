/* #!/usr/bin/env zsh

#shellcheck shell=bash

doSomething() {
    local dir
    dir="${PWD}/src/routes"

    find "$dir"/*.js | while read -r file; do
        mv -- "$file" "${file}x"

    done

}

doSomething
 */

// eslint-disable-next-line no-unused-expressions
const classes = [
	'.list-price',
	'.listing-availability',
	'.listing-rooms',
	'.listing-floorarea',
	'.listing-property-type',
];
const scrape = () => {
	const cards = document.querySelectorAll('.listing-card');
	const data = Array.from(cards, (card) => {
		const desc = card.querySelector('.listing-description');
		const rooms = {};
		for (const span of desc.querySelectorAll('.listing-rooms > span')) {
			const key = span.className;
			const value = Number.parseInt(span.textContent);
			rooms[key] = value;
		}
		const floorArea = [];
		for (const span of desc.querySelectorAll('.listing-floorarea')) {
			floorArea.push(span.textContent.trim());
		}
		const propertyType = [];
		for (const item of desc.querySelector('.listing-property-type').children) {
			propertyType.push(item.textContent.trim());
		}
		const automationWalk = desc.querySelectorAll(
			'[data-automation-id*="walk"]'
		);
		return {
			desc,
			imgSrc: card.querySelector('img').src,
			title: desc.firstElementChild.textContent.trim(),
			address: desc.querySelector('.listing-location').textContent,
			price: desc.querySelector('.list-price').textContent.trim(),
			availability:
				desc.querySelector('.listing-availability')?.textContent.trim() ?? '',
			rooms,
			floorArea,
			propertyType,
			walk:
				automationWalk.length > 0 ? automationWalk[0].textContent.trim() : '',
		};
	});
	return data;
};
const scrollPage = async (s = 10) => {
	const pagesElement = document.querySelector('.listing-pagination');
	const targetOffset = pagesElement.offsetTop - window.innerHeight / 2;
	const scrollTimeInMilliseconds = s * 1000;
	const milliSecondsPerPixel = scrollTimeInMilliseconds / targetOffset;

	while (window.scrollY < targetOffset) {
		await new Promise((resolve) =>
			setTimeout(() => {
				window.scrollBy(0, 3);
				resolve();
			}, milliSecondsPerPixel)
		);
	}
	return;
};
const saveAndGoToNextPage = () => {
	const currentPage = Number.parseInt(
		document.querySelector('.pagination > .active').textContent
	);
	if (!localStorage.getItem('page' + currentPage)) {
		const data = scrape();
		localStorage.setItem('page' + currentPage, JSON.stringify(data));
	}
	document.querySelector('.pagination > .active ~ * > a ').click();
};
const joinPages = () => {
	let pages = [];
	for (let i = 1; i <= 10; i++) {
		const storageItem = localStorage.getItem(`page${i}`);
		// console.log(i, storageItem);
		if (storageItem !== null) {
			pages = [...pages, ...JSON.parse(storageItem)];
			localStorage.removeItem(`page${i}`);
		} else {
			console.log('pages', pages);
			localStorage.setItem('pages', JSON.stringify(pages));
			break;
		}
	}
};

const pages = [
	{
		desc: {},
		imgSrc:
			'https://sg1-cdn.pgimgs.com/listing/23980866/UPHO.135073344.V800/220-Serangoon-Avenue-4-Hougang-Punggol-Sengkang-Singapore.jpg',
		title: '220 Serangoon Avenue 4220 Serangoon Avenue 4',
		address: '220 Serangoon Avenue 4',
		price: 'S$ 2,800 /mo',
		availability: 'Available from 27 May',
		rooms: {
			bed: 3,
			bath: 2,
		},
		floorArea: ['1001 sqft', 'S$ 2.80 psf'],
		propertyType: ['HDB Flat', 'Fully Furnished', 'Built: 1984'],
		walk: '',
	},
	{
		desc: {},
		imgSrc:
			'https://sg1-cdn.pgimgs.com/listing/16639657/UPHO.69825916.V800/Regal-35-Eunos-Geylang-Paya-Lebar-Singapore.jpg',
		title: 'Regal 3515 Lorong 35 Geylang',
		address: '15 Lorong 35 Geylang',
		price: 'S$ 3,800 /mo',
		availability: 'Available from 5 Jul',
		rooms: {
			bed: 2,
			bath: 2,
		},
		floorArea: ['915 sqft', 'S$ 4.15 psf'],
		propertyType: ['Apartment', 'Fully Furnished', 'Built: 2004'],
		walk: '8 mins (590 m) to EW8 Paya Lebar MRT',
	},
	{
		desc: {},
		imgSrc:
			'https://sg2-cdn.pgimgs.com/listing/23926956/UPHO.134359415.V800/The-Scotts-Tower-Orchard-River-Valley-Singapore.jpg',
		title: 'The Scotts Tower38 Scotts Road',
		address: '38 Scotts Road',
		price: 'S$ 4,800 /mo',
		availability: 'Available from 9 Jun',
		rooms: {
			bed: 1,
			bath: 1,
		},
		floorArea: ['646 sqft', 'S$ 7.43 psf'],
		propertyType: ['Condominium', 'Fully Furnished', 'Built: 2016'],
		walk: '7 mins (510 m) to NS21 Newton MRT',
	},
	{
		desc: {},
		imgSrc:
			'https://sg1-cdn.pgimgs.com/listing/23966358/UPHO.134877460.V800/Park-Colonial-Macpherson-Potong-Pasir-Singapore.jpg',
		title: 'Park Colonial2 Woodleigh Lane',
		address: '2 Woodleigh Lane',
		price: 'S$ 3,100 /mo',
		availability: 'Available from 18 May',
		rooms: {
			bed: 1,
			bath: 1,
		},
		floorArea: ['464 sqft', 'S$ 6.68 psf'],
		propertyType: ['New Project: 2022', 'Condominium', 'Partially Furnished'],
		walk: '3 mins (220 m) to NE11 Woodleigh MRT',
	},
	{
		desc: {},
		imgSrc:
			'https://sg1-cdn.pgimgs.com/listing/23982932/UPHO.135156994.V800/167B-Punggol-East-Hougang-Punggol-Sengkang-Singapore.jpg',
		title: '167B Punggol East167B Punggol East',
		address: '167B Punggol East',
		price: 'S$ 3,500 /mo',
		availability: 'Available from 31 May',
		rooms: {
			bed: 3,
			bath: 2,
		},
		floorArea: ['990 sqft', 'S$ 3.54 psf'],
		propertyType: ['HDB Flat', 'Fully Furnished', 'Built: 2007'],
		walk: '1 mins (110 m) to PE4 Riviera LRT',
	},
	{
		desc: {},
		imgSrc:
			'https://sg1-cdn.pgimgs.com/listing/23500349/UPHO.135157358.V800/Nassim-Jade-Tanglin-Holland-Bukit-Timah-Singapore.jpg',
		title: 'Nassim Jade3 Nassim Road',
		address: '3 Nassim Road',
		price: 'S$ 18,800 /mo',
		availability: 'Ready to move',
		rooms: {
			bed: 6,
			bath: 5,
		},
		floorArea: ['3300 sqft', 'S$ 5.70 psf'],
		propertyType: ['Condominium', 'Partially Furnished', 'Built: 1999'],
		walk: '7 mins (540 m) to TE13 Orchard Boulevard MRT',
	},
	{
		desc: {},
		imgSrc:
			'https://sg2-cdn.pgimgs.com/listing/20642645/UPHO.98818701.V800/The-Peak-Cairnhill-II-Orchard-River-Valley-Singapore.jpg',
		title: 'The Peak @ Cairnhill II61 Cairnhill Circle',
		address: '61 Cairnhill Circle',
		price: 'S$ 6,600 /mo',
		availability: 'Available from 8 May',
		rooms: {
			bed: 2,
			bath: 2,
		},
		floorArea: ['829 sqft', 'S$ 7.96 psf'],
		propertyType: ['Apartment', 'Fully Furnished', 'Built: 2015'],
		walk: '9 mins (640 m) to NS21 Newton MRT',
	},
	{
		desc: {},
		imgSrc:
			'https://sg2-cdn.pgimgs.com/listing/23535893/UPHO.129298599.V800/450A-Fernvale-Crest-Seletar-Yio-Chu-Kang-Singapore.jpg',
		title: '450A Fernvale Crest450A Sengkang West Way',
		address: '450A Sengkang West Way',
		price: 'S$ 3,480 /mo',
		availability: 'Available from 15 May',
		rooms: {
			bed: 3,
			bath: 2,
		},
		floorArea: ['1000 sqft', 'S$ 3.48 psf'],
		propertyType: ['HDB Flat', 'Fully Furnished', 'Built: 2012'],
		walk: '5 mins (400 m) to SW4 Thanggam LRT',
	},
	{
		desc: {},
		imgSrc:
			'https://sg2-cdn.pgimgs.com/listing/23987360/UPHO.135157149.V800/Martin-Modern-Orchard-River-Valley-Singapore.jpg',
		title: 'Martin Modern8 Martin Place',
		address: '8 Martin Place',
		price: 'S$ 7,200 /mo',
		availability: 'Available from 1 Jul',
		rooms: {
			bed: 2,
			bath: 2,
		},
		floorArea: ['872 sqft', 'S$ 8.26 psf'],
		propertyType: ['New Project: 2021', 'Apartment', 'Partially Furnished'],
		walk: '7 mins (510 m) to TE15 Great World MRT',
	},
	{
		desc: {},
		imgSrc:
			'https://sg2-cdn.pgimgs.com/listing/23977243/UPHO.135022499.V800/Heritage-View-Buona-Vista-West-Coast-Clementi-New-Town-Singapore.jpg',
		title: 'Heritage View6 Dover Rise',
		address: '6 Dover Rise',
		price: 'S$ 5,200 /mo',
		availability: 'Available from 29 Jun',
		rooms: {
			bed: 3,
			bath: 2,
		},
		floorArea: ['1163 sqft', 'S$ 4.47 psf'],
		propertyType: ['Condominium', 'Partially Furnished', 'Built: 2000'],
		walk: '8 mins (570 m) to CC23 One-North MRT',
	},
	{
		desc: {},
		imgSrc:
			'https://sg1-cdn.pgimgs.com/listing/23987357/UPHO.135157152.V800/Aquarius-By-The-Park-Bedok-Upper-East-Coast-Singapore.jpg',
		title: 'Aquarius By The Park13 Bedok Reservoir View',
		address: '13 Bedok Reservoir View',
		price: 'S$ 1,680 /mo',
		availability: '',
		rooms: {
			'room-rental': null,
		},
		floorArea: ['150 sqft', 'S$ 11.20 psf'],
		propertyType: ['Condominium', 'Built: 2000'],
		walk: '5 mins (370 m) to DT30 Bedok Reservoir MRT',
	},
	{
		desc: {},
		imgSrc:
			'https://sg2-cdn.pgimgs.com/listing/23491745/UPHO.131183855.V800/Orchard-Scotts-Orchard-River-Valley-Singapore.jpg',
		title: 'Orchard Scotts11 Anthony Road',
		address: '11 Anthony Road',
		price: 'S$ 15,300 /mo',
		availability: 'Available from 5 Jul',
		rooms: {
			bed: 4,
			bath: 4,
		},
		floorArea: ['3100 sqft', 'S$ 4.94 psf'],
		propertyType: ['Condominium', 'Partially Furnished', 'Built: 2007'],
		walk: '6 mins (450 m) to NS21 Newton MRT',
	},
	{
		desc: {},
		imgSrc:
			'https://sg1-cdn.pgimgs.com/listing/23978380/UPHO.135036840.V800/Lloyd-SixtyFive-Orchard-River-Valley-Singapore.jpg',
		title: 'Lloyd SixtyFive65 Lloyd Road',
		address: '65 Lloyd Road',
		price: 'S$ 9,500 /mo',
		availability: '',
		rooms: {
			bed: 2,
			bath: 2,
		},
		floorArea: ['1830 sqft', 'S$ 5.19 psf'],
		propertyType: ['Condominium', 'Partially Furnished', 'Built: 2016'],
		walk: '5 mins (360 m) to NS23 Somerset MRT',
	},
	{
		desc: {},
		imgSrc:
			'https://sg2-cdn.pgimgs.com/listing/23986368/UPHO.135145133.V800/Park-Colonial-Macpherson-Potong-Pasir-Singapore.jpg',
		title: 'Park Colonial2 Woodleigh Lane',
		address: '2 Woodleigh Lane',
		price: 'S$ 6,500 /mo',
		availability: 'Ready to move',
		rooms: {
			bed: 3,
			bath: 2,
		},
		floorArea: ['980 sqft', 'S$ 6.63 psf'],
		propertyType: ['New Project: 2022', 'Condominium', 'Partially Furnished'],
		walk: '3 mins (220 m) to NE11 Woodleigh MRT',
	},
	{
		desc: {},
		imgSrc:
			'https://sg2-cdn.pgimgs.com/listing/23987345/UPHO.135156959.V800/Aquarius-By-The-Park-Bedok-Upper-East-Coast-Singapore.jpg',
		title: 'Aquarius By The Park13 Bedok Reservoir View',
		address: '13 Bedok Reservoir View',
		price: 'S$ 2,480 /mo',
		availability: '',
		rooms: {
			'room-rental': null,
		},
		floorArea: ['200 sqft', 'S$ 12.40 psf'],
		propertyType: ['Condominium', 'Built: 2000'],
		walk: '5 mins (370 m) to DT30 Bedok Reservoir MRT',
	},
	{
		desc: {},
		imgSrc:
			'https://sg1-cdn.pgimgs.com/listing/16632772/UPHO.112548014.V800/Sentosa-Cove-Harbourfront-Telok-Blangah-Singapore.jpg',
		title: 'Sentosa CoveOcean Drive',
		address: 'Ocean Drive',
		price: 'S$ 40,000 /mo',
		availability: 'Available from 12 May',
		rooms: {
			bed: 5,
			bath: 6,
		},
		floorArea: ['8500 sqft (floor), 8000 sqft (land)', 'S$ 5.00 psf'],
		propertyType: ['Detached House', 'Partially Furnished', 'Built: 2011'],
		walk: '',
	},
	{
		desc: {},
		imgSrc:
			'https://sg2-cdn.pgimgs.com/listing/12167913/UPHO.135145763.V800/Marina-Bay-Residences-Boat-Quay-Raffles-Place-Marina-Singapore.jpg',
		title: 'Marina Bay Residences18 Marina Boulevard',
		address: '18 Marina Boulevard',
		price: 'S$ 14,800 /mo',
		availability: 'Ready to move',
		rooms: {
			bed: 3,
			bath: 3,
		},
		floorArea: ['1970 sqft', 'S$ 7.51 psf'],
		propertyType: ['Condominium', 'Partially Furnished', 'Built: 2010'],
		walk: '2 mins (140 m) to DT17 Downtown MRT',
	},
	{
		desc: {},
		imgSrc:
			'https://sg1-cdn.pgimgs.com/listing/23982073/UPHO.135084494.V800/RoyalGreen-Tanglin-Holland-Bukit-Timah-Singapore.jpg',
		title: 'RoyalGreen2 Anamalai Avenue',
		address: '2 Anamalai Avenue',
		price: 'S$ 4,999 /mo',
		availability: 'Available from 15 May',
		rooms: {
			bed: 2,
			bath: 2,
		},
		floorArea: ['667 sqft', 'S$ 7.49 psf'],
		propertyType: ['New Project: 2025', 'Condominium', 'Fully Furnished'],
		walk: '4 mins (320 m) to DT7 Sixth Avenue MRT',
	},
	{
		desc: {},
		imgSrc:
			'https://sg1-cdn.pgimgs.com/listing/23447337/UPHO.135154668.V800/Simei-Green-Condominium-Pasir-Ris-Tampines-Singapore.jpg',
		title: 'Simei Green Condominium9 Simei Street 4',
		address: '9 Simei Street 4',
		price: 'S$ 1,150 /mo',
		availability: 'Ready to move',
		rooms: {
			'room-rental': null,
		},
		floorArea: ['100 sqft', 'S$ 11.50 psf'],
		propertyType: ['Condominium', 'Fully Furnished', 'Built: 1999'],
		walk: '5 mins (360 m) to DT34 Upper Changi MRT',
	},
	{
		desc: {},
		imgSrc:
			'https://sg1-cdn.pgimgs.com/listing/23177178/UPHO.134874864.V800/Central-Green-Alexandra-Commonwealth-Singapore.jpg',
		title: 'Central Green1 Jalan Membina',
		address: '1 Jalan Membina',
		price: 'S$ 1,190 /mo',
		availability: 'Available from 5 Jun',
		rooms: {
			'room-rental': null,
		},
		floorArea: ['100 sqft', 'S$ 11.90 psf'],
		propertyType: ['Condominium', 'Fully Furnished', 'Built: 1995'],
		walk: '2 mins (170 m) to EW17 Tiong Bahru MRT',
	},
	{
		desc: {},
		imgSrc:
			'https://sg2-cdn.pgimgs.com/listing/22394411/UPHO.135121355.V800/Kim-Keat-House-Balestier-Toa-Payoh-Singapore.jpg',
		title: 'Kim Keat House60 Kim Keat Road',
		address: '60 Kim Keat Road',
		price: 'S$ 1,090 /mo',
		availability: 'Available from 6 May',
		rooms: {
			'room-rental': null,
		},
		floorArea: ['150 sqft', 'S$ 7.27 psf'],
		propertyType: ['Apartment', 'Fully Furnished', 'Built: 1999'],
		walk: '',
	},
	{
		desc: {},
		imgSrc:
			'https://sg2-cdn.pgimgs.com/listing/23626331/UPHO.135119679.V800/Burlington-Square-Beach-Road-Bugis-Rochor-Singapore.jpg',
		title: 'Burlington Square175 Bencoolen Street',
		address: '175 Bencoolen Street',
		price: 'S$ 2,000 /mo',
		availability: 'Available from 6 May',
		rooms: {
			'room-rental': null,
		},
		floorArea: ['120 sqft', 'S$ 16.67 psf'],
		propertyType: ['Apartment', 'Fully Furnished', 'Built: 1998'],
		walk: '2 mins (150 m) to DT13 Rochor MRT',
	},
	{
		desc: {},
		imgSrc:
			'https://sg2-cdn.pgimgs.com/listing/23953002/UPHO.135119425.V800/Casa-Merah-Bedok-Upper-East-Coast-Singapore.jpg',
		title: 'Casa Merah66 Tanah Merah Kechil Avenue',
		address: '66 Tanah Merah Kechil Avenue',
		price: 'S$ 1,290 /mo',
		availability: 'Available from 6 May',
		rooms: {
			'room-rental': null,
		},
		floorArea: ['150 sqft', 'S$ 8.60 psf'],
		propertyType: ['Condominium', 'Fully Furnished', 'Built: 2009'],
		walk: '4 mins (280 m) to CG Tanah Merah MRT',
	},
	{
		desc: {},
		imgSrc:
			'https://sg1-cdn.pgimgs.com/listing/23500349/UPHO.135157358.V800/Nassim-Jade-Tanglin-Holland-Bukit-Timah-Singapore.jpg',
		title: 'Nassim Jade3 Nassim Road',
		address: '3 Nassim Road',
		price: 'S$ 18,800 /mo',
		availability: 'Ready to move',
		rooms: {
			bed: 6,
			bath: 5,
		},
		floorArea: ['3300 sqft', 'S$ 5.70 psf'],
		propertyType: ['Condominium', 'Partially Furnished', 'Built: 1999'],
		walk: '7 mins (540 m) to TE13 Orchard Boulevard MRT',
	},
	{
		desc: {},
		imgSrc:
			'https://sg2-cdn.pgimgs.com/listing/20642645/UPHO.98818701.V800/The-Peak-Cairnhill-II-Orchard-River-Valley-Singapore.jpg',
		title: 'The Peak @ Cairnhill II61 Cairnhill Circle',
		address: '61 Cairnhill Circle',
		price: 'S$ 6,600 /mo',
		availability: 'Available from 8 May',
		rooms: {
			bed: 2,
			bath: 2,
		},
		floorArea: ['829 sqft', 'S$ 7.96 psf'],
		propertyType: ['Apartment', 'Fully Furnished', 'Built: 2015'],
		walk: '9 mins (640 m) to NS21 Newton MRT',
	},
	{
		desc: {},
		imgSrc:
			'https://sg2-cdn.pgimgs.com/listing/23535893/UPHO.129298599.V800/450A-Fernvale-Crest-Seletar-Yio-Chu-Kang-Singapore.jpg',
		title: '450A Fernvale Crest450A Sengkang West Way',
		address: '450A Sengkang West Way',
		price: 'S$ 3,480 /mo',
		availability: 'Available from 15 May',
		rooms: {
			bed: 3,
			bath: 2,
		},
		floorArea: ['1000 sqft', 'S$ 3.48 psf'],
		propertyType: ['HDB Flat', 'Fully Furnished', 'Built: 2012'],
		walk: '5 mins (400 m) to SW4 Thanggam LRT',
	},
	{
		desc: {},
		imgSrc:
			'https://sg2-cdn.pgimgs.com/listing/23987360/UPHO.135157149.V800/Martin-Modern-Orchard-River-Valley-Singapore.jpg',
		title: 'Martin Modern8 Martin Place',
		address: '8 Martin Place',
		price: 'S$ 7,200 /mo',
		availability: 'Available from 1 Jul',
		rooms: {
			bed: 2,
			bath: 2,
		},
		floorArea: ['872 sqft', 'S$ 8.26 psf'],
		propertyType: ['New Project: 2021', 'Apartment', 'Partially Furnished'],
		walk: '7 mins (510 m) to TE15 Great World MRT',
	},
	{
		desc: {},
		imgSrc:
			'https://sg2-cdn.pgimgs.com/listing/23977243/UPHO.135022499.V800/Heritage-View-Buona-Vista-West-Coast-Clementi-New-Town-Singapore.jpg',
		title: 'Heritage View6 Dover Rise',
		address: '6 Dover Rise',
		price: 'S$ 5,200 /mo',
		availability: 'Available from 29 Jun',
		rooms: {
			bed: 3,
			bath: 2,
		},
		floorArea: ['1163 sqft', 'S$ 4.47 psf'],
		propertyType: ['Condominium', 'Partially Furnished', 'Built: 2000'],
		walk: '8 mins (570 m) to CC23 One-North MRT',
	},
	{
		desc: {},
		imgSrc:
			'https://sg1-cdn.pgimgs.com/listing/23987357/UPHO.135157152.V800/Aquarius-By-The-Park-Bedok-Upper-East-Coast-Singapore.jpg',
		title: 'Aquarius By The Park13 Bedok Reservoir View',
		address: '13 Bedok Reservoir View',
		price: 'S$ 1,680 /mo',
		availability: '',
		rooms: {
			'room-rental': null,
		},
		floorArea: ['150 sqft', 'S$ 11.20 psf'],
		propertyType: ['Condominium', 'Built: 2000'],
		walk: '5 mins (370 m) to DT30 Bedok Reservoir MRT',
	},
	{
		desc: {},
		imgSrc:
			'https://sg2-cdn.pgimgs.com/listing/23491745/UPHO.131183855.V800/Orchard-Scotts-Orchard-River-Valley-Singapore.jpg',
		title: 'Orchard Scotts11 Anthony Road',
		address: '11 Anthony Road',
		price: 'S$ 15,300 /mo',
		availability: 'Available from 5 Jul',
		rooms: {
			bed: 4,
			bath: 4,
		},
		floorArea: ['3100 sqft', 'S$ 4.94 psf'],
		propertyType: ['Condominium', 'Partially Furnished', 'Built: 2007'],
		walk: '6 mins (450 m) to NS21 Newton MRT',
	},
	{
		desc: {},
		imgSrc:
			'https://sg1-cdn.pgimgs.com/listing/23978380/UPHO.135036840.V800/Lloyd-SixtyFive-Orchard-River-Valley-Singapore.jpg',
		title: 'Lloyd SixtyFive65 Lloyd Road',
		address: '65 Lloyd Road',
		price: 'S$ 9,500 /mo',
		availability: '',
		rooms: {
			bed: 2,
			bath: 2,
		},
		floorArea: ['1830 sqft', 'S$ 5.19 psf'],
		propertyType: ['Condominium', 'Partially Furnished', 'Built: 2016'],
		walk: '5 mins (360 m) to NS23 Somerset MRT',
	},
	{
		desc: {},
		imgSrc:
			'https://sg2-cdn.pgimgs.com/listing/23986368/UPHO.135145133.V800/Park-Colonial-Macpherson-Potong-Pasir-Singapore.jpg',
		title: 'Park Colonial2 Woodleigh Lane',
		address: '2 Woodleigh Lane',
		price: 'S$ 6,500 /mo',
		availability: 'Ready to move',
		rooms: {
			bed: 3,
			bath: 2,
		},
		floorArea: ['980 sqft', 'S$ 6.63 psf'],
		propertyType: ['New Project: 2022', 'Condominium', 'Partially Furnished'],
		walk: '3 mins (220 m) to NE11 Woodleigh MRT',
	},
	{
		desc: {},
		imgSrc:
			'https://sg2-cdn.pgimgs.com/listing/23987345/UPHO.135156959.V800/Aquarius-By-The-Park-Bedok-Upper-East-Coast-Singapore.jpg',
		title: 'Aquarius By The Park13 Bedok Reservoir View',
		address: '13 Bedok Reservoir View',
		price: 'S$ 2,480 /mo',
		availability: '',
		rooms: {
			'room-rental': null,
		},
		floorArea: ['200 sqft', 'S$ 12.40 psf'],
		propertyType: ['Condominium', 'Built: 2000'],
		walk: '5 mins (370 m) to DT30 Bedok Reservoir MRT',
	},
	{
		desc: {},
		imgSrc:
			'https://sg1-cdn.pgimgs.com/listing/16632772/UPHO.112548014.V800/Sentosa-Cove-Harbourfront-Telok-Blangah-Singapore.jpg',
		title: 'Sentosa CoveOcean Drive',
		address: 'Ocean Drive',
		price: 'S$ 40,000 /mo',
		availability: 'Available from 12 May',
		rooms: {
			bed: 5,
			bath: 6,
		},
		floorArea: ['8500 sqft (floor), 8000 sqft (land)', 'S$ 5.00 psf'],
		propertyType: ['Detached House', 'Partially Furnished', 'Built: 2011'],
		walk: '',
	},
	{
		desc: {},
		imgSrc:
			'https://sg2-cdn.pgimgs.com/listing/12167913/UPHO.135145763.V800/Marina-Bay-Residences-Boat-Quay-Raffles-Place-Marina-Singapore.jpg',
		title: 'Marina Bay Residences18 Marina Boulevard',
		address: '18 Marina Boulevard',
		price: 'S$ 14,800 /mo',
		availability: 'Ready to move',
		rooms: {
			bed: 3,
			bath: 3,
		},
		floorArea: ['1970 sqft', 'S$ 7.51 psf'],
		propertyType: ['Condominium', 'Partially Furnished', 'Built: 2010'],
		walk: '2 mins (140 m) to DT17 Downtown MRT',
	},
	{
		desc: {},
		imgSrc:
			'https://sg1-cdn.pgimgs.com/listing/23982073/UPHO.135084494.V800/RoyalGreen-Tanglin-Holland-Bukit-Timah-Singapore.jpg',
		title: 'RoyalGreen2 Anamalai Avenue',
		address: '2 Anamalai Avenue',
		price: 'S$ 4,999 /mo',
		availability: 'Available from 15 May',
		rooms: {
			bed: 2,
			bath: 2,
		},
		floorArea: ['667 sqft', 'S$ 7.49 psf'],
		propertyType: ['New Project: 2025', 'Condominium', 'Fully Furnished'],
		walk: '4 mins (320 m) to DT7 Sixth Avenue MRT',
	},
	{
		desc: {},
		imgSrc:
			'https://sg1-cdn.pgimgs.com/listing/23447337/UPHO.135154668.V800/Simei-Green-Condominium-Pasir-Ris-Tampines-Singapore.jpg',
		title: 'Simei Green Condominium9 Simei Street 4',
		address: '9 Simei Street 4',
		price: 'S$ 1,150 /mo',
		availability: 'Ready to move',
		rooms: {
			'room-rental': null,
		},
		floorArea: ['100 sqft', 'S$ 11.50 psf'],
		propertyType: ['Condominium', 'Fully Furnished', 'Built: 1999'],
		walk: '5 mins (360 m) to DT34 Upper Changi MRT',
	},
	{
		desc: {},
		imgSrc:
			'https://sg1-cdn.pgimgs.com/listing/23177178/UPHO.134874864.V800/Central-Green-Alexandra-Commonwealth-Singapore.jpg',
		title: 'Central Green1 Jalan Membina',
		address: '1 Jalan Membina',
		price: 'S$ 1,190 /mo',
		availability: 'Available from 5 Jun',
		rooms: {
			'room-rental': null,
		},
		floorArea: ['100 sqft', 'S$ 11.90 psf'],
		propertyType: ['Condominium', 'Fully Furnished', 'Built: 1995'],
		walk: '2 mins (170 m) to EW17 Tiong Bahru MRT',
	},
	{
		desc: {},
		imgSrc:
			'https://sg2-cdn.pgimgs.com/listing/22394411/UPHO.135121355.V800/Kim-Keat-House-Balestier-Toa-Payoh-Singapore.jpg',
		title: 'Kim Keat House60 Kim Keat Road',
		address: '60 Kim Keat Road',
		price: 'S$ 1,090 /mo',
		availability: 'Available from 6 May',
		rooms: {
			'room-rental': null,
		},
		floorArea: ['150 sqft', 'S$ 7.27 psf'],
		propertyType: ['Apartment', 'Fully Furnished', 'Built: 1999'],
		walk: '',
	},
	{
		desc: {},
		imgSrc:
			'https://sg2-cdn.pgimgs.com/listing/23626331/UPHO.135119679.V800/Burlington-Square-Beach-Road-Bugis-Rochor-Singapore.jpg',
		title: 'Burlington Square175 Bencoolen Street',
		address: '175 Bencoolen Street',
		price: 'S$ 2,000 /mo',
		availability: 'Available from 6 May',
		rooms: {
			'room-rental': null,
		},
		floorArea: ['120 sqft', 'S$ 16.67 psf'],
		propertyType: ['Apartment', 'Fully Furnished', 'Built: 1998'],
		walk: '2 mins (150 m) to DT13 Rochor MRT',
	},
	{
		desc: {},
		imgSrc:
			'https://sg2-cdn.pgimgs.com/listing/23953002/UPHO.135119425.V800/Casa-Merah-Bedok-Upper-East-Coast-Singapore.jpg',
		title: 'Casa Merah66 Tanah Merah Kechil Avenue',
		address: '66 Tanah Merah Kechil Avenue',
		price: 'S$ 1,290 /mo',
		availability: 'Available from 6 May',
		rooms: {
			'room-rental': null,
		},
		floorArea: ['150 sqft', 'S$ 8.60 psf'],
		propertyType: ['Condominium', 'Fully Furnished', 'Built: 2009'],
		walk: '4 mins (280 m) to CG Tanah Merah MRT',
	},
	{
		desc: {},
		imgSrc:
			'https://sg2-cdn.pgimgs.com/listing/23983825/UPHO.135109907.V800/East-Meadows-Bedok-Upper-East-Coast-Singapore.jpg',
		title: 'East Meadows34 Tanah Merah Kechil Road',
		address: '34 Tanah Merah Kechil Road',
		price: 'S$ 1,290 /mo',
		availability: 'Available from 1 Jun',
		rooms: {
			'room-rental': null,
		},
		floorArea: ['150 sqft', 'S$ 8.60 psf'],
		propertyType: ['Condominium', 'Fully Furnished', 'Built: 2001'],
		walk: '4 mins (320 m) to CG Tanah Merah MRT',
	},
	{
		desc: {},
		imgSrc:
			'https://sg1-cdn.pgimgs.com/listing/23828816/UPHO.135107486.V800/Castle-Green-Mandai-Upper-Thomson-Singapore.jpg',
		title: 'Castle Green485 Yio Chu Kang Road',
		address: '485 Yio Chu Kang Road',
		price: 'S$ 1,190 /mo',
		availability: 'Available from 1 Jun',
		rooms: {
			'room-rental': null,
		},
		floorArea: ['150 sqft', 'S$ 7.93 psf'],
		propertyType: ['Condominium', 'Fully Furnished', 'Built: 1997'],
		walk: '7 mins (560 m) to TE5 Lentor MRT',
	},
	{
		desc: {},
		imgSrc:
			'https://sg1-cdn.pgimgs.com/listing/23828816/UPHO.135107486.V800/Castle-Green-Mandai-Upper-Thomson-Singapore.jpg',
		title: 'Castle Green485 Yio Chu Kang Road',
		address: '485 Yio Chu Kang Road',
		price: 'S$ 1,190 /mo',
		availability: 'Available from 1 Jun',
		rooms: {
			'room-rental': null,
		},
		floorArea: ['150 sqft', 'S$ 7.93 psf'],
		propertyType: ['Condominium', 'Fully Furnished', 'Built: 1997'],
		walk: '7 mins (560 m) to TE5 Lentor MRT',
	},
	{
		desc: {},
		imgSrc:
			'https://sg2-cdn.pgimgs.com/listing/23941401/UPHO.134628721.V800/Northvale-Dairy-Farm-Bukit-Panjang-Choa-Chu-Kang-Singapore.jpg',
		title: 'Northvale73 Choa Chu Kang Loop',
		address: '73 Choa Chu Kang Loop',
		price: 'S$ 1,190 /mo',
		availability: 'Ready to move',
		rooms: {
			'room-rental': null,
		},
		floorArea: ['100 sqft', 'S$ 11.90 psf'],
		propertyType: ['Condominium', 'Fully Furnished', 'Built: 1998'],
		walk: '4 mins (290 m) to JS1 Choa Chu Kang MRT',
	},
	{
		desc: {},
		imgSrc:
			'https://sg2-cdn.pgimgs.com/listing/23834752/UPHO.134564053.V800/J-Gateway-Boon-Lay-Jurong-Tuas-Singapore.jpg',
		title: 'J Gateway2 Gateway Drive',
		address: '2 Gateway Drive',
		price: 'S$ 1,490 /mo',
		availability: 'Ready to move',
		rooms: {
			'room-rental': null,
		},
		floorArea: ['150 sqft', 'S$ 9.93 psf'],
		propertyType: ['Condominium', 'Fully Furnished', 'Built: 2017'],
		walk: '3 mins (260 m) to NS1 Jurong East MRT',
	},
	{
		desc: {},
		imgSrc:
			'https://sg1-cdn.pgimgs.com/listing/23873011/UPHO.135106674.V800/International-Plaza-Chinatown-Tanjong-Pagar-Singapore.jpg',
		title: 'International Plaza10 Anson Road',
		address: '10 Anson Road',
		price: 'S$ 1,390 /mo',
		availability: 'Available from 1 Jun',
		rooms: {
			'room-rental': null,
		},
		floorArea: ['150 sqft', 'S$ 9.27 psf'],
		propertyType: ['Condominium', 'Fully Furnished', 'Built: 1976'],
		walk: '1 mins (110 m) to EW15 Tanjong Pagar MRT',
	},
	{
		desc: {},
		imgSrc:
			'https://sg2-cdn.pgimgs.com/listing/23732615/UPHO.135106211.V800/Lakepoint-Condo-Boon-Lay-Jurong-Tuas-Singapore.jpg',
		title: 'Lakepoint Condo2 Lakepoint Drive',
		address: '2 Lakepoint Drive',
		price: 'S$ 1,090 /mo',
		availability: 'Available from 1 Jun',
		rooms: {
			'room-rental': null,
		},
		floorArea: ['150 sqft', 'S$ 7.27 psf'],
		propertyType: ['Condominium', 'Fully Furnished', 'Built: 1983'],
		walk: '6 mins (440 m) to EW26 Lakeside MRT',
	},
	{
		desc: {},
		imgSrc:
			'https://sg2-cdn.pgimgs.com/listing/23983514/UPHO.135105957.V800/The-Centris-Boon-Lay-Jurong-Tuas-Singapore.jpg',
		title: 'The Centris69 Jurong West Central 3',
		address: '69 Jurong West Central 3',
		price: 'S$ 1,390 /mo',
		availability: 'Available from 31 May',
		rooms: {
			'room-rental': null,
		},
		floorArea: ['150 sqft', 'S$ 9.27 psf'],
		propertyType: ['Condominium', 'Fully Furnished', 'Built: 2009'],
		walk: '2 mins (120 m) to EW27 Boon Lay MRT',
	},
	{
		desc: {},
		imgSrc:
			'https://sg2-cdn.pgimgs.com/listing/23885631/UPHO.135104003.V800/Casa-Sarina-Eunos-Geylang-Paya-Lebar-Singapore.jpg',
		title: 'Casa Sarina101 Lorong Sarina',
		address: '101 Lorong Sarina',
		price: 'S$ 1,090 /mo',
		availability: 'Available from 1 Jun',
		rooms: {
			'room-rental': null,
		},
		floorArea: ['150 sqft', 'S$ 7.27 psf'],
		propertyType: ['Condominium', 'Fully Furnished', 'Built: 1998'],
		walk: '6 mins (460 m) to EW7 Eunos MRT',
	},
	{
		desc: {},
		imgSrc:
			'https://sg1-cdn.pgimgs.com/listing/23977504/UPHO.135025724.V800/Guilin-View-Dairy-Farm-Bukit-Panjang-Choa-Chu-Kang-Singapore.jpg',
		title: 'Guilin View20 Bukit Batok Street 52',
		address: '20 Bukit Batok Street 52',
		price: 'S$ 1,090 /mo',
		availability: 'Available from 27 May',
		rooms: {
			'room-rental': null,
		},
		floorArea: ['150 sqft', 'S$ 7.27 psf'],
		propertyType: ['Condominium', 'Fully Furnished', 'Built: 2000'],
		walk: '5 mins (340 m) to NS3 Bukit Gombak MRT',
	},
	{
		desc: {},
		imgSrc:
			'https://sg2-cdn.pgimgs.com/listing/23937085/UPHO.134491355.V800/Westcove-Condo-Buona-Vista-West-Coast-Clementi-New-Town-Singapore.jpg',
		title: 'Westcove Condo10 West Coast Crescent',
		address: '10 West Coast Crescent',
		price: 'S$ 1,290 /mo',
		availability: 'Ready to move',
		rooms: {
			'room-rental': null,
		},
		floorArea: ['150 sqft', 'S$ 8.60 psf'],
		propertyType: ['Condominium', 'Fully Furnished', 'Built: 2000'],
		walk: '',
	},
	{
		desc: {},
		imgSrc:
			'https://sg2-cdn.pgimgs.com/listing/23977445/UPHO.135025087.V800/East-Meadows-Bedok-Upper-East-Coast-Singapore.jpg',
		title: 'East Meadows30 Tanah Merah Kechil Road',
		address: '30 Tanah Merah Kechil Road',
		price: 'S$ 1,190 /mo',
		availability: 'Available from 28 May',
		rooms: {
			'room-rental': null,
		},
		floorArea: ['150 sqft', 'S$ 7.93 psf'],
		propertyType: ['Condominium', 'Fully Furnished', 'Built: 2001'],
		walk: '4 mins (320 m) to CG Tanah Merah MRT',
	},
	{
		desc: {},
		imgSrc:
			'https://sg1-cdn.pgimgs.com/listing/23900820/UPHO.134483040.V800/Centro-Residences-Ang-Mo-Kio-Bishan-Thomson-Singapore.jpg',
		title: 'Centro Residences59 Ang Mo Kio Avenue 8',
		address: '59 Ang Mo Kio Avenue 8',
		price: 'S$ 1,090 /mo',
		availability: 'Ready to move',
		rooms: {
			'room-rental': null,
		},
		floorArea: ['150 sqft', 'S$ 7.27 psf'],
		propertyType: ['Condominium', 'Fully Furnished', 'Built: 2014'],
		walk: '1 mins (90 m) to CR11 Ang Mo Kio MRT',
	},
	{
		desc: {},
		imgSrc:
			'https://sg2-cdn.pgimgs.com/listing/23735081/UPHO.134526535.V800/Sunshine-Plaza-Beach-Road-Bugis-Rochor-Singapore.jpg',
		title: 'Sunshine Plaza10 Prinsep Link',
		address: '10 Prinsep Link',
		price: 'S$ 1,490 /mo',
		availability: 'Ready to move',
		rooms: {
			'room-rental': null,
		},
		floorArea: ['150 sqft', 'S$ 9.93 psf'],
		propertyType: ['Condominium', 'Fully Furnished', 'Built: 2001'],
		walk: '3 mins (210 m) to DT21 Bencoolen MRT',
	},
	{
		desc: {},
		imgSrc:
			'https://sg1-cdn.pgimgs.com/listing/23976878/UPHO.135017396.V800/Parc-Oasis-Boon-Lay-Jurong-Tuas-Singapore.jpg',
		title: 'Parc Oasis53 Jurong East Avenue 1',
		address: '53 Jurong East Avenue 1',
		price: 'S$ 1,690 /mo',
		availability: 'Available from 19 May',
		rooms: {
			'room-rental': null,
		},
		floorArea: ['150 sqft', 'S$ 11.27 psf'],
		propertyType: ['Condominium', 'Fully Furnished', 'Built: 1995'],
		walk: '3 mins (240 m) to EW25 Chinese Garden MRT',
	},
	{
		desc: {},
		imgSrc:
			'https://sg2-cdn.pgimgs.com/listing/23860405/UPHO.135017149.V800/Simsville-Eunos-Geylang-Paya-Lebar-Singapore.jpg',
		title: 'Simsville10 Geylang East Avenue 2',
		address: '10 Geylang East Avenue 2',
		price: 'S$ 1,190 /mo',
		availability: 'Available from 3 Jun',
		rooms: {
			'room-rental': null,
		},
		floorArea: ['150 sqft', 'S$ 7.93 psf'],
		propertyType: ['Condominium', 'Fully Furnished', 'Built: 1998'],
		walk: '5 mins (400 m) to EW8 Paya Lebar MRT',
	},
	{
		desc: {},
		imgSrc:
			'https://sg2-cdn.pgimgs.com/listing/23815034/UPHO.134863971.V800/East-Meadows-Bedok-Upper-East-Coast-Singapore.jpg',
		title: 'East Meadows34 Tanah Merah Kechil Road',
		address: '34 Tanah Merah Kechil Road',
		price: 'S$ 1,440 /mo',
		availability: 'Ready to move',
		rooms: {
			'room-rental': null,
		},
		floorArea: ['150 sqft', 'S$ 9.60 psf'],
		propertyType: ['Condominium', 'Fully Furnished', 'Built: 2001'],
		walk: '4 mins (320 m) to CG Tanah Merah MRT',
	},
	{
		desc: {},
		imgSrc:
			'https://sg1-cdn.pgimgs.com/listing/23976571/UPHO.135013780.V800/Heritage-View-Buona-Vista-West-Coast-Clementi-New-Town-Singapore.jpg',
		title: 'Heritage View6 Dover Rise',
		address: '6 Dover Rise',
		price: 'S$ 1,450 /mo',
		availability: 'Ready to move',
		rooms: {
			'room-rental': null,
		},
		floorArea: ['150 sqft', 'S$ 9.67 psf'],
		propertyType: ['Condominium', 'Fully Furnished', 'Built: 2000'],
		walk: '8 mins (570 m) to CC23 One-North MRT',
	},
	{
		desc: {},
		imgSrc:
			'https://sg2-cdn.pgimgs.com/listing/23890298/UPHO.135014063.V800/East-Meadows-Bedok-Upper-East-Coast-Singapore.jpg',
		title: 'East Meadows30 Tanah Merah Kechil Road',
		address: '30 Tanah Merah Kechil Road',
		price: 'S$ 1,100 /mo',
		availability: 'Ready to move',
		rooms: {
			'room-rental': null,
		},
		floorArea: ['100 sqft', 'S$ 11.00 psf'],
		propertyType: ['Condominium', 'Fully Furnished', 'Built: 2001'],
		walk: '4 mins (320 m) to CG Tanah Merah MRT',
	},
	{
		desc: {},
		imgSrc:
			'https://sg1-cdn.pgimgs.com/listing/23974845/UPHO.135119150.V800/Pine-Grove-Clementi-Park-Upper-Bukit-Timah-Singapore.jpg',
		title: 'Pine Grove1F Pine Grove',
		address: '1F Pine Grove',
		price: 'S$ 1,290 /mo',
		availability: 'Ready to move',
		rooms: {
			'room-rental': null,
		},
		floorArea: ['150 sqft', 'S$ 8.60 psf'],
		propertyType: ['Condominium', 'Fully Furnished', 'Built: 1984'],
		walk: '13 mins (970 m) to EW23 Clementi MRT',
	},
	{
		desc: {},
		imgSrc:
			'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
		title: 'Avon Park1 Youngberg Terrace',
		address: '1 Youngberg Terrace',
		price: 'S$ 1,790 /mo',
		availability: 'Ready to move',
		rooms: {
			'room-rental': null,
		},
		floorArea: ['150 sqft', 'S$ 11.93 psf'],
		propertyType: ['Condominium', 'Fully Furnished', 'Built: 1991'],
		walk: '2 mins (140 m) to NE11 Woodleigh MRT',
	},
	{
		desc: {},
		imgSrc:
			'https://sg2-cdn.pgimgs.com/listing/23410062/UPHO.134955657.V800/The-Quintet-Dairy-Farm-Bukit-Panjang-Choa-Chu-Kang-Singapore.jpg',
		title: 'The Quintet42 Choa Chu Kang Street 64',
		address: '42 Choa Chu Kang Street 64',
		price: 'S$ 990 /mo',
		availability: 'Available from 8 May',
		rooms: {
			'room-rental': null,
		},
		floorArea: ['100 sqft', 'S$ 9.90 psf'],
		propertyType: ['Condominium', 'Fully Furnished', 'Built: 2006'],
		walk: '5 mins (400 m) to NS5 Yew Tee MRT',
	},
	{
		desc: {},
		imgSrc:
			'https://sg1-cdn.pgimgs.com/listing/23858545/UPHO.134769536.V800/A-Treasure-Trove-Hougang-Punggol-Sengkang-Singapore.jpg',
		title: 'A Treasure Trove70 Punggol Walk',
		address: '70 Punggol Walk',
		price: 'S$ 1,390 /mo',
		availability: 'Available from 12 May',
		rooms: {
			'room-rental': null,
		},
		floorArea: ['150 sqft', 'S$ 9.27 psf'],
		propertyType: ['Condominium', 'Fully Furnished', 'Built: 2015'],
		walk: '4 mins (270 m) to NE17 Punggol MRT',
	},
	{
		desc: {},
		imgSrc:
			'https://sg1-cdn.pgimgs.com/listing/23828660/UPHO.133072304.V800/Bukit-View-Clementi-Park-Upper-Bukit-Timah-Singapore.jpg',
		title: 'Bukit View144 Upper Bukit Timah Road',
		address: '144 Upper Bukit Timah Road',
		price: 'S$ 1,090 /mo',
		availability: 'Available from 16 May',
		rooms: {
			'room-rental': null,
		},
		floorArea: ['100 sqft', 'S$ 10.90 psf'],
		propertyType: ['Condominium', 'Fully Furnished', 'Built: 1979'],
		walk: '2 mins (120 m) to DT5 Beauty World MRT',
	},
	{
		desc: {},
		imgSrc:
			'https://sg1-cdn.pgimgs.com/listing/23958341/UPHO.134768576.V800/Parc-Oasis-Boon-Lay-Jurong-Tuas-Singapore.jpg',
		title: 'Parc Oasis37 Jurong East Avenue 1',
		address: '37 Jurong East Avenue 1',
		price: 'S$ 1,250 /mo',
		availability: 'Available from 10 May',
		rooms: {
			'room-rental': null,
		},
		floorArea: ['150 sqft', 'S$ 8.33 psf'],
		propertyType: ['Condominium', 'Fully Furnished', 'Built: 1995'],
		walk: '3 mins (240 m) to EW25 Chinese Garden MRT',
	},
	{
		desc: {},
		imgSrc:
			'https://sg1-cdn.pgimgs.com/listing/23768958/UPHO.134768366.V800/Jervois-Lodge-Tanglin-Holland-Bukit-Timah-Singapore.jpg',
		title: 'Jervois Lodge32 Jervois Road',
		address: '32 Jervois Road',
		price: 'S$ 1,190 /mo',
		availability: 'Available from 10 May',
		rooms: {
			'room-rental': null,
		},
		floorArea: ['150 sqft', 'S$ 7.93 psf'],
		propertyType: ['Condominium', 'Fully Furnished', 'Built: 1997'],
		walk: '12 mins (890 m) to EW18 Redhill MRT',
	},
	{
		desc: {},
		imgSrc:
			'https://sg2-cdn.pgimgs.com/listing/23953424/UPHO.134756073.V800/Heritage-View-Buona-Vista-West-Coast-Clementi-New-Town-Singapore.jpg',
		title: 'Heritage View10 Dover Rise',
		address: '10 Dover Rise',
		price: 'S$ 1,340 /mo',
		availability: 'Available from 8 May',
		rooms: {
			'room-rental': null,
		},
		floorArea: ['150 sqft', 'S$ 8.93 psf'],
		propertyType: ['Condominium', 'Fully Furnished', 'Built: 2000'],
		walk: '8 mins (570 m) to CC23 One-North MRT',
	},
	{
		desc: {},
		imgSrc:
			'https://sg1-cdn.pgimgs.com/listing/23931797/UPHO.134747330.V800/Melville-Park-Pasir-Ris-Tampines-Singapore.jpg',
		title: 'Melville Park28 Simei Street 1',
		address: '28 Simei Street 1',
		price: 'S$ 1,090 /mo',
		availability: 'Ready to move',
		rooms: {
			'room-rental': null,
		},
		floorArea: ['150 sqft', 'S$ 7.27 psf'],
		propertyType: ['Condominium', 'Fully Furnished', 'Built: 1996'],
		walk: '10 mins (750 m) to DT34 Upper Changi MRT',
	},
	{
		desc: {},
		imgSrc:
			'https://sg2-cdn.pgimgs.com/listing/23956301/UPHO.134742673.V800/Simsville-Eunos-Geylang-Paya-Lebar-Singapore.jpg',
		title: 'Simsville6 Geylang East Avenue 2',
		address: '6 Geylang East Avenue 2',
		price: 'S$ 1,100 /mo',
		availability: 'Available from 20 May',
		rooms: {
			'room-rental': null,
		},
		floorArea: ['100 sqft', 'S$ 11.00 psf'],
		propertyType: ['Condominium', 'Fully Furnished', 'Built: 1998'],
		walk: '5 mins (400 m) to EW8 Paya Lebar MRT',
	},
	{
		desc: {},
		imgSrc:
			'https://sg1-cdn.pgimgs.com/listing/23953405/UPHO.134701736.V800/Le-Crescendo-Eunos-Geylang-Paya-Lebar-Singapore.jpg',
		title: 'Le Crescendo233 Paya Lebar Road',
		address: '233 Paya Lebar Road',
		price: 'S$ 1,290 /mo',
		availability: 'Ready to move',
		rooms: {
			'room-rental': null,
		},
		floorArea: ['150 sqft', 'S$ 8.60 psf'],
		propertyType: ['Condominium', 'Fully Furnished', 'Built: 2006'],
		walk: '6 mins (420 m) to CC10 MacPherson MRT',
	},
	{
		desc: {},
		imgSrc:
			'https://sg2-cdn.pgimgs.com/listing/22207202/UPHO.134660697.V800/Commonwealth-Towers-Alexandra-Commonwealth-Singapore.jpg',
		title: 'Commonwealth Towers230 Commonwealth Avenue',
		address: '230 Commonwealth Avenue',
		price: 'S$ 1,590 /mo',
		availability: 'Ready to move',
		rooms: {
			'room-rental': null,
		},
		floorArea: ['150 sqft', 'S$ 10.60 psf'],
		propertyType: ['Condominium', 'Fully Furnished', 'Built: 2017'],
		walk: '2 mins (180 m) to EW19 Queenstown MRT',
	},
	{
		desc: {},
		imgSrc:
			'https://sg1-cdn.pgimgs.com/listing/23949585/UPHO.134652206.V800/Parc-Oasis-Boon-Lay-Jurong-Tuas-Singapore.jpg',
		title: 'Parc Oasis35 Jurong East Avenue 1',
		address: '35 Jurong East Avenue 1',
		price: 'S$ 1,290 /mo',
		availability: 'Ready to move',
		rooms: {
			'room-rental': null,
		},
		floorArea: ['150 sqft', 'S$ 8.60 psf'],
		propertyType: ['Condominium', 'Fully Furnished', 'Built: 1995'],
		walk: '3 mins (240 m) to EW25 Chinese Garden MRT',
	},
	{
		desc: {},
		imgSrc:
			'https://sg2-cdn.pgimgs.com/listing/23934396/UPHO.134453769.V800/Stirling-Residences-Alexandra-Commonwealth-Singapore.jpg',
		title: 'Stirling Residences21 Stirling Road',
		address: '21 Stirling Road',
		price: 'S$ 4,300 /mo',
		availability: 'Available from 1 Jun',
		rooms: {
			bed: 2,
			bath: 2,
		},
		floorArea: ['689 sqft', 'S$ 6.24 psf'],
		propertyType: ['New Project: 2022', 'Apartment'],
		walk: '4 mins (290 m) to EW19 Queenstown MRT',
	},
	{
		desc: {},
		imgSrc:
			'https://sg1-cdn.pgimgs.com/listing/22739482/UPHO.122711452.V800/City-Gate-Beach-Road-Bugis-Rochor-Singapore.jpg',
		title: 'City Gate371 Beach Road',
		address: '371 Beach Road',
		price: 'S$ 4,000 /mo',
		availability: 'Available from 15 Jun',
		rooms: {
			bed: 2,
			bath: 1,
		},
		floorArea: ['570 sqft', 'S$ 7.02 psf'],
		propertyType: ['Apartment', 'Built: 2019'],
		walk: '4 mins (310 m) to CC5 Nicoll Highway MRT',
	},
	{
		desc: {},
		imgSrc:
			'https://sg1-cdn.pgimgs.com/listing/21868632/UPHO.112601602.V800/LOTUS-AT-PAYA-LEBAR-IS-3-MINUTES-TO-PLQ-MALL-AND-MRT-%21-SHEER-CONVENIENCE-%21-WOW-%21-Eunos-Geylang-Paya-Lebar-Singapore.jpg',
		title:
			'LOTUS AT PAYA LEBAR IS 3 MINUTES TO PLQ MALL AND MRT ! SHEER CONVENIENCE ! WOW !Paya Lebar MRT / Guillemard Road / Sims Avenue /',
		address: 'Paya Lebar MRT / Guillemard Road / Sims Avenue /',
		price: 'S$ 3,460 /mo',
		availability: 'Ready to move',
		rooms: {
			bed: 1,
			bath: 1,
		},
		floorArea: ['538 sqft'],
		propertyType: ['Conservation House', 'Fully Furnished'],
		walk: '3 mins (260 m) to EW8 Paya Lebar MRT',
	},
	{
		desc: {},
		imgSrc:
			'https://sg1-cdn.pgimgs.com/listing/23966397/UPHO.135138968.V800/Park-Colonial-Macpherson-Potong-Pasir-Singapore.jpg',
		title: 'Park Colonial2 Woodleigh Lane',
		address: '2 Woodleigh Lane',
		price: 'S$ 3,000 /mo',
		availability: 'Available from 1 Jun',
		rooms: {
			bed: 1,
			bath: 1,
		},
		floorArea: ['461 sqft', 'S$ 6.51 psf'],
		propertyType: ['New Project: 2022', 'Condominium', 'Partially Furnished'],
		walk: '3 mins (220 m) to NE11 Woodleigh MRT',
	},
	{
		desc: {},
		imgSrc:
			'https://sg1-cdn.pgimgs.com/listing/23879192/UPHO.134078556.V800/Park-Colonial-Macpherson-Potong-Pasir-Singapore.jpg',
		title: 'Park Colonial2 Woodleigh Lane',
		address: '2 Woodleigh Lane',
		price: 'S$ 4,000 /mo',
		availability: 'Available from 1 Jun',
		rooms: {
			bed: 2,
			bath: 1,
		},
		floorArea: ['624 sqft', 'S$ 6.41 psf'],
		propertyType: ['New Project: 2022', 'Condominium', 'Partially Furnished'],
		walk: '3 mins (220 m) to NE11 Woodleigh MRT',
	},
	{
		desc: {},
		imgSrc:
			'https://sg2-cdn.pgimgs.com/listing/20874869/UPHO.110347265.V800/River-Place-Alexandra-Commonwealth-Singapore.jpg',
		title: 'River Place60 Havelock Road',
		address: '60 Havelock Road',
		price: 'S$ 4,850 /mo',
		availability: 'Ready to move',
		rooms: {
			bed: 2,
			bath: 2,
		},
		floorArea: ['990 sqft', 'S$ 4.90 psf'],
		propertyType: ['Condominium', 'Partially Furnished', 'Built: 2000'],
		walk: '6 mins (480 m) to DT20 Fort Canning MRT',
	},
	{
		desc: {},
		imgSrc:
			'https://sg1-cdn.pgimgs.com/listing/23744282/UPHO.132032268.V800/Cuscaden-Residences-Tanglin-Holland-Bukit-Timah-Singapore.jpg',
		title: 'Cuscaden Residences26 Cuscaden Road',
		address: '26 Cuscaden Road',
		price: 'S$ 9,200 /mo',
		availability: '',
		rooms: {
			bed: 3,
			bath: 3,
		},
		floorArea: ['1485 sqft', 'S$ 6.20 psf'],
		propertyType: ['Condominium', 'Partially Furnished', 'Built: 2002'],
		walk: '5 mins (400 m) to TE13 Orchard Boulevard MRT',
	},
	{
		desc: {},
		imgSrc:
			'https://sg2-cdn.pgimgs.com/listing/23978430/UPHO.135037523.V800/Binjai-vicinity-Tanglin-Holland-Bukit-Timah-Singapore.jpg',
		title: 'Binjai vicinityJalan jambu mawar',
		address: 'Jalan jambu mawar',
		price: 'S$ 11,000 /mo',
		availability: 'Available from 15 Jul',
		rooms: {
			bed: 4,
			bath: 3,
		},
		floorArea: ['3000 sqft (floor), 3000 sqft (land)', 'S$ 3.67 psf'],
		propertyType: ['Semi-Detached House', 'Partially Furnished', 'Built: 1980'],
		walk: '',
	},
	{
		desc: {},
		imgSrc:
			'https://sg1-cdn.pgimgs.com/listing/23872269/UPHO.135137846.V800/The-Scotts-Tower-Orchard-River-Valley-Singapore.jpg',
		title: 'The Scotts Tower38 Scotts Road',
		address: '38 Scotts Road',
		price: 'S$ 16,300 /mo',
		availability: 'Ready to move',
		rooms: {
			bed: 3,
			bath: 2,
		},
		floorArea: ['3003 sqft', 'S$ 5.43 psf'],
		propertyType: ['Condominium', 'Partially Furnished', 'Built: 2016'],
		walk: '7 mins (510 m) to NS21 Newton MRT',
	},
	{
		desc: {},
		imgSrc:
			'https://sg2-cdn.pgimgs.com/listing/23898979/UPHO.134095971.V800/Labu-Ayer-Hougang-Punggol-Sengkang-Singapore.jpg',
		title: 'Labu AyerJalan Labu Ayer',
		address: 'Jalan Labu Ayer',
		price: 'S$ 4,500 /mo',
		availability: 'Ready to move',
		rooms: {
			bed: 3,
			bath: 3,
		},
		floorArea: ['1486 sqft', 'S$ 3.03 psf'],
		propertyType: ['Apartment', 'Fully Furnished'],
		walk: '8 mins (610 m) to CC12 Bartley MRT',
	},
	{
		desc: {},
		imgSrc:
			'https://sg1-cdn.pgimgs.com/listing/23872269/UPHO.135137846.V800/The-Scotts-Tower-Orchard-River-Valley-Singapore.jpg',
		title: 'The Scotts Tower38 Scotts Road',
		address: '38 Scotts Road',
		price: 'S$ 16,300 /mo',
		availability: 'Ready to move',
		rooms: {
			bed: 3,
			bath: 2,
		},
		floorArea: ['3003 sqft', 'S$ 5.43 psf'],
		propertyType: ['Condominium', 'Partially Furnished', 'Built: 2016'],
		walk: '7 mins (510 m) to NS21 Newton MRT',
	},
	{
		desc: {},
		imgSrc:
			'https://sg2-cdn.pgimgs.com/listing/23898979/UPHO.134095971.V800/Labu-Ayer-Hougang-Punggol-Sengkang-Singapore.jpg',
		title: 'Labu AyerJalan Labu Ayer',
		address: 'Jalan Labu Ayer',
		price: 'S$ 4,500 /mo',
		availability: 'Ready to move',
		rooms: {
			bed: 3,
			bath: 3,
		},
		floorArea: ['1486 sqft', 'S$ 3.03 psf'],
		propertyType: ['Apartment', 'Fully Furnished'],
		walk: '8 mins (610 m) to CC12 Bartley MRT',
	},
	{
		desc: {},
		imgSrc:
			'https://sg2-cdn.pgimgs.com/listing/23945090/UPHO.134592399.V800/Mera-Gardens-Dairy-Farm-Bukit-Panjang-Choa-Chu-Kang-Singapore.jpg',
		title: 'Mera GardensAlmond Avenue',
		address: 'Almond Avenue',
		price: 'S$ 14,800 /mo',
		availability: 'Available from 1 Jun',
		rooms: {
			bed: 6,
			bath: 5,
		},
		floorArea: ['4000 sqft (floor), 6261 sqft (land)', 'S$ 2.36 psf'],
		propertyType: ['Detached House', 'Unfurnished', 'Built: 1998'],
		walk: '5 mins (390 m) to BP8 Pending LRT',
	},
	{
		desc: {},
		imgSrc:
			'https://sg2-cdn.pgimgs.com/listing/23977688/UPHO.135028731.V800/Villas-Holland-Tanglin-Holland-Bukit-Timah-Singapore.jpg',
		title: 'Villas HollandBukit Sedap Road',
		address: 'Bukit Sedap Road',
		price: 'S$ 60,000 /mo',
		availability: 'Available from 16 Jun',
		rooms: {
			bed: 6,
			bath: 9,
		},
		floorArea: ['11076 sqft (floor), 16269 sqft (land)', 'S$ 3.69 psf'],
		propertyType: ['Detached House', 'Partially Furnished'],
		walk: '',
	},
	{
		desc: {},
		imgSrc:
			'https://sg1-cdn.pgimgs.com/listing/23987439/UPHO.135158254.V800/267-Pasir-Ris-Street-21-Pasir-Ris-Tampines-Singapore.jpg',
		title: '267 Pasir Ris Street 21267 Pasir Ris Street 21',
		address: '267 Pasir Ris Street 21',
		price: 'S$ 3,600 /mo',
		availability: 'Available from 1 Jun',
		rooms: {
			bed: 3,
			bath: 2,
		},
		floorArea: ['1539 sqft', 'S$ 2.34 psf'],
		propertyType: ['HDB Flat', 'Built: 1993'],
		walk: '6 mins (440 m) to CR4 Pasir Ris East MRT',
	},
	{
		desc: {},
		imgSrc:
			'https://sg1-cdn.pgimgs.com/listing/23978354/UPHO.135124718.V800/304-Woodlands-Street-31-Admiralty-Woodlands-Singapore.jpg',
		title: '304 Woodlands Street 31304 Woodlands Street 31',
		address: '304 Woodlands Street 31',
		price: 'S$ 700 /mo',
		availability: '',
		rooms: {
			'room-rental': null,
		},
		floorArea: ['150 sqft', 'S$ 4.67 psf'],
		propertyType: ['HDB Flat', 'Fully Furnished', 'Built: 1993'],
		walk: '4 mins (290 m) to NS8 Marsiling MRT',
	},
	{
		desc: {},
		imgSrc:
			'https://sg1-cdn.pgimgs.com/listing/23981098/UPHO.135071462.V800/Emerald-Hill-Conservation-Area-Orchard-River-Valley-Singapore.jpg',
		title: 'Emerald Hill Conservation AreaSaunders Road',
		address: 'Saunders Road',
		price: 'S$ 10,000 /mo',
		availability: 'Ready to move',
		rooms: {
			bed: 2,
			bath: 2,
		},
		floorArea: ['1539 sqft'],
		propertyType: ['Terraced House', 'Unfurnished'],
		walk: '3 mins (260 m) to TE14 Orchard MRT',
	},
	{
		desc: {},
		imgSrc:
			'https://sg2-cdn.pgimgs.com/listing/23986454/UPHO.135145519.V800/339-Jurong-East-Avenue-1-Boon-Lay-Jurong-Tuas-Singapore.jpg',
		title: '339 Jurong East Avenue 1339 Jurong East Avenue 1',
		address: '339 Jurong East Avenue 1',
		price: 'S$ 700 /mo',
		availability: 'Ready to move',
		rooms: {
			'room-rental': null,
		},
		floorArea: ['120 sqft', 'S$ 5.83 psf'],
		propertyType: ['HDB Flat', 'Partially Furnished', 'Built: 1982'],
		walk: '9 mins (700 m) to JE2 Tengah Park MRT',
	},
	{
		desc: {},
		imgSrc:
			'https://sg2-cdn.pgimgs.com/listing/23889793/UPHO.133879173.V800/Holland-Modern-Tropical-Good-Class-Bungalow-Tanglin-Holland-Bukit-Timah-Singapore.jpg',
		title: 'Holland Modern Tropical Good Class Bungalow',
		address: '',
		price: 'S$ 80,000 /mo',
		availability: 'Ready to move',
		rooms: {
			bed: 4,
			bath: 6,
		},
		floorArea: ['7000 sqft (floor), 24000 sqft (land)', 'S$ 3.33 psf'],
		propertyType: ['Good Class Bungalow', 'Partially Furnished'],
		walk: '7 mins (490 m) to CC21 Holland Village MRT',
	},
	{
		desc: {},
		imgSrc:
			'https://sg2-cdn.pgimgs.com/listing/23984522/UPHO.135150077.V800/Park-Colonial-Macpherson-Potong-Pasir-Singapore.jpg',
		title: 'Park Colonial2 Woodleigh Lane',
		address: '2 Woodleigh Lane',
		price: 'S$ 2,990 /mo',
		availability: 'Ready to move',
		rooms: {
			bed: 1,
			bath: 1,
		},
		floorArea: ['463 sqft', 'S$ 6.46 psf'],
		propertyType: ['New Project: 2022', 'Condominium', 'Partially Furnished'],
		walk: '3 mins (220 m) to NE11 Woodleigh MRT',
	},
	{
		desc: {},
		imgSrc:
			'https://sg2-cdn.pgimgs.com/listing/23949080/UPHO.134691583.V800/Park-Colonial-Macpherson-Potong-Pasir-Singapore.jpg',
		title: 'Park Colonial2 Woodleigh Lane',
		address: '2 Woodleigh Lane',
		price: 'S$ 3,950 /mo',
		availability: 'Ready to move',
		rooms: {
			bed: 2,
			bath: 1,
		},
		floorArea: ['603 sqft', 'S$ 6.55 psf'],
		propertyType: ['New Project: 2022', 'Condominium', 'Partially Furnished'],
		walk: '3 mins (220 m) to NE11 Woodleigh MRT',
	},
	{
		desc: {},
		imgSrc:
			'https://sg1-cdn.pgimgs.com/listing/22321791/UPHO.116417264.V800/Parc-Riviera-Buona-Vista-West-Coast-Clementi-New-Town-Singapore.jpg',
		title: 'Parc Riviera101 West Coast Vale',
		address: '101 West Coast Vale',
		price: 'S$ 3,400 /mo',
		availability: 'Ready to move',
		rooms: {
			bed: 2,
			bath: 1,
		},
		floorArea: ['603 sqft', 'S$ 5.64 psf'],
		propertyType: ['Condominium', 'Partially Furnished', 'Built: 2020'],
		walk: '12 mins (930 m) to JE7 Pandan Reservoir MRT',
	},
	{
		desc: {},
		imgSrc:
			'https://sg1-cdn.pgimgs.com/listing/22976291/UPHO.135134014.V800/Waterfront-Waves-Bedok-Upper-East-Coast-Singapore.jpg',
		title: 'Waterfront Waves766 Bedok Reservoir Road',
		address: '766 Bedok Reservoir Road',
		price: 'S$ 6,500 /mo',
		availability: 'Available from 1 Aug',
		rooms: {
			bed: 4,
			bath: 3,
		},
		floorArea: ['1518 sqft', 'S$ 4.28 psf'],
		propertyType: ['Condominium', 'Fully Furnished', 'Built: 2011'],
		walk: '5 mins (380 m) to DT30 Bedok Reservoir MRT',
	},
	{
		desc: {},
		imgSrc:
			'https://sg2-cdn.pgimgs.com/listing/23987250/UPHO.135155839.V800/Dakota-Residences-Eunos-Geylang-Paya-Lebar-Singapore.jpg',
		title: 'Dakota Residences38 Dakota Crescent',
		address: '38 Dakota Crescent',
		price: 'S$ 4,800 /mo',
		availability: 'Available from 1 Jul',
		rooms: {
			bed: 2,
			bath: 2,
		},
		floorArea: ['1023 sqft', 'S$ 4.69 psf'],
		propertyType: ['Condominium', 'Fully Furnished', 'Built: 2010'],
		walk: '4 mins (320 m) to CC8 Dakota MRT',
	},
	{
		desc: {},
		imgSrc:
			'https://sg1-cdn.pgimgs.com/listing/23984021/UPHO.135115092.V800/Wilmer-House-Orchard-River-Valley-Singapore.jpg',
		title: 'Wilmer House1 Saint Thomas Walk',
		address: '1 Saint Thomas Walk',
		price: 'S$ 7,500 /mo',
		availability: 'Available from 8 Jul',
		rooms: {
			bed: 4,
			bath: 3,
		},
		floorArea: ['2517 sqft', 'S$ 2.98 psf'],
		propertyType: ['Condominium', 'Partially Furnished'],
		walk: '4 mins (300 m) to TE15 Great World MRT',
	},
	{
		desc: {},
		imgSrc:
			'https://sg2-cdn.pgimgs.com/listing/23983619/UPHO.135107299.V800/Robertson-Edge-Orchard-River-Valley-Singapore.jpg',
		title: 'Robertson Edge18 Tong Watt Road',
		address: '18 Tong Watt Road',
		price: 'S$ 3,500 /mo',
		availability: 'Available from 1 Jul',
		rooms: {
			bed: 1,
			bath: 1,
		},
		floorArea: ['495 sqft', 'S$ 7.07 psf'],
		propertyType: ['Apartment', 'Fully Furnished', 'Built: 2008'],
		walk: '6 mins (460 m) to DT20 Fort Canning MRT',
	},
	{
		desc: {},
		imgSrc:
			'https://sg1-cdn.pgimgs.com/listing/22243049/UPHO.113721760.V800/Hilltops-Orchard-River-Valley-Singapore.jpg',
		title: 'Hilltops101 Cairnhill Circle',
		address: '101 Cairnhill Circle',
		price: 'S$ 11,500 /mo',
		availability: 'Available from 23 May',
		rooms: {
			bed: 3,
			bath: 3,
		},
		floorArea: ['1550 sqft', 'S$ 7.42 psf'],
		propertyType: ['Condominium', 'Partially Furnished', 'Built: 2011'],
		walk: '9 mins (640 m) to TE14 Orchard MRT',
	},
	{
		desc: {},
		imgSrc:
			'https://sg2-cdn.pgimgs.com/listing/23506379/UPHO.128906277.V800/PAYA-LEBAR-MRT-RENOVATED-WITH-PATIO-Eunos-Geylang-Paya-Lebar-Singapore.jpg',
		title:
			'PAYA LEBAR MRT - RENOVATED WITH PATIOALJUNIED, PAYA LEBAR ROAD, PAYA LEBAR MRT',
		address: 'ALJUNIED, PAYA LEBAR ROAD, PAYA LEBAR MRT',
		price: 'S$ 3,400 /mo',
		availability: '',
		rooms: {
			bed: 1,
			bath: 1,
		},
		floorArea: ['600 sqft', 'S$ 5.67 psf'],
		propertyType: ['Condominium', 'Partially Furnished'],
		walk: '5 mins (340 m) to EW8 Paya Lebar MRT',
	},
	{
		desc: {},
		imgSrc:
			'https://sg1-cdn.pgimgs.com/listing/23389140/UPHO.127368576.V800/172-Gangsa-Road-Dairy-Farm-Bukit-Panjang-Choa-Chu-Kang-Singapore.jpg',
		title: '172 Gangsa Road172 Gangsa Road',
		address: '172 Gangsa Road',
		price: 'S$ 800 /mo',
		availability: 'Ready to move',
		rooms: {
			'room-rental': null,
		},
		floorArea: ['86 sqft', 'S$ 9.30 psf'],
		propertyType: ['HDB Flat', 'Partially Furnished', 'Built: 1996'],
		walk: '3 mins (200 m) to BP7 Petir LRT',
	},
	{
		desc: {},
		imgSrc:
			'https://sg1-cdn.pgimgs.com/listing/21773406/UPHO.107331450.V800/Semi-D-at-Serangoon-Garden-Hougang-Punggol-Sengkang-Singapore.jpg',
		title: 'Semi-D at Serangoon GardenBridport Avenue',
		address: 'Bridport Avenue',
		price: 'S$ 12,000 /mo',
		availability: '',
		rooms: {
			bed: 5,
			bath: 6,
		},
		floorArea: ['3400 sqft (floor), 2560 sqft (land)', 'S$ 4.69 psf'],
		propertyType: ['Semi-Detached House', 'Partially Furnished'],
		walk: '12 mins (930 m) to CC14 Lorong Chuan MRT',
	},
	{
		desc: {},
		imgSrc:
			'https://sg2-cdn.pgimgs.com/listing/23975888/UPHO.135016243.V800/Bungalow-at-Serangoon-Gardens-Estate-Hougang-Punggol-Sengkang-Singapore.jpg',
		title: 'Bungalow at Serangoon Gardens Estate',
		address: '',
		price: 'S$ 19,500 /mo',
		availability: '',
		rooms: {
			bed: 7,
			bath: 6,
		},
		floorArea: ['8800 sqft (floor), 4750 sqft (land)', 'S$ 4.11 psf'],
		propertyType: ['Bungalow House', 'Partially Furnished'],
		walk: '',
	},
	{
		desc: {},
		imgSrc:
			'https://sg2-cdn.pgimgs.com/listing/23666881/UPHO.134902707.V800/166B-Yung-Kuang-Road-Boon-Lay-Jurong-Tuas-Singapore.jpg',
		title: '166B Yung Kuang Road166B Yung Kuang Road',
		address: '166B Yung Kuang Road',
		price: 'S$ 1,100 /mo',
		availability: 'Ready to move',
		rooms: {
			'room-rental': null,
		},
		floorArea: ['120 sqft', 'S$ 9.17 psf'],
		propertyType: ['HDB Flat', 'Fully Furnished', 'Built: 2017'],
		walk: '',
	},
	{
		desc: {},
		imgSrc:
			'https://sg1-cdn.pgimgs.com/listing/21080025/UPHO.109534078.V800/Stunning-Luxury-Just-a-Stroll-from-Orchard-Tanglin-Holland-Bukit-Timah-Singapore.jpg',
		title: 'Stunning Luxury Just a Stroll from OrchardArdmore',
		address: 'Ardmore',
		price: 'S$ 28,000 /mo',
		availability: 'Ready to move',
		rooms: {
			bed: 4,
			bath: 5,
		},
		floorArea: ['3185 sqft', 'S$ 8.79 psf'],
		propertyType: ['Apartment', 'Partially Furnished', 'Built: 2013'],
		walk: '1 mins (70 m) to CC19 Botanic Gardens MRT',
	},
	{
		desc: {},
		imgSrc:
			'https://sg2-cdn.pgimgs.com/listing/23975365/UPHO.134997975.V800/Suites-at-Orchard-Orchard-River-Valley-Singapore.jpg',
		title:
			'Suites at Orchard38 Handy Road\n\n                      Great Price',
		address: '38 Handy Road',
		price: 'S$ 4,300 /mo',
		availability: 'Available from 1 Jul',
		rooms: {
			bed: 2,
			bath: 1,
		},
		floorArea: ['549 sqft', 'S$ 7.83 psf'],
		propertyType: ['Condominium', 'Partially Furnished', 'Built: 2015'],
		walk: '1 mins (100 m) to NS24 Dhoby Ghaut MRT',
	},
	{
		desc: {},
		imgSrc:
			'https://sg1-cdn.pgimgs.com/listing/22977526/UPHO.121749698.V800/301-Clementi-Avenue-4-Buona-Vista-West-Coast-Clementi-New-Town-Singapore.jpg',
		title: '301 Clementi Avenue 4301 Clementi Avenue 4',
		address: '301 Clementi Avenue 4',
		price: 'S$ 900 /mo',
		availability: 'Available from 15 May',
		rooms: {
			'room-rental': null,
		},
		floorArea: ['86 sqft', 'S$ 10.47 psf'],
		propertyType: ['HDB Flat', 'Partially Furnished', 'Built: 1978'],
		walk: '11 mins (810 m) to EW23 Clementi MRT',
	},
	{
		desc: {},
		imgSrc:
			'https://sg1-cdn.pgimgs.com/listing/23971901/UPHO.134949694.V800/28-Imperial-Residences-Eunos-Geylang-Paya-Lebar-Singapore.jpg',
		title: '28 Imperial Residences28 Lorong 26 Geylang',
		address: '28 Lorong 26 Geylang',
		price: 'S$ 1,600 /mo',
		availability: 'Available from 1 Jun',
		rooms: {
			'room-rental': null,
		},
		floorArea: ['150 sqft', 'S$ 10.67 psf'],
		propertyType: ['Condominium', 'Partially Furnished', 'Built: 2016'],
		walk: '8 mins (570 m) to EW9 Aljunied MRT',
	},
	{
		desc: {},
		imgSrc:
			'https://sg1-cdn.pgimgs.com/listing/23984272/UPHO.135115544.V800/Dakota-Residences-Eunos-Geylang-Paya-Lebar-Singapore.jpg',
		title: 'Dakota Residences38 Dakota Crescent',
		address: '38 Dakota Crescent',
		price: 'S$ 4,800 /mo',
		availability: 'Available from 29 Jun',
		rooms: {
			bed: 2,
			bath: 2,
		},
		floorArea: ['1023 sqft', 'S$ 4.69 psf'],
		propertyType: ['Condominium', 'Fully Furnished', 'Built: 2010'],
		walk: '4 mins (320 m) to CC8 Dakota MRT',
	},
	{
		desc: {},
		imgSrc:
			'https://sg1-cdn.pgimgs.com/listing/23869422/UPHO.135129906.V800/The-Scotts-Tower-Orchard-River-Valley-Singapore.jpg',
		title: 'The Scotts Tower38 Scotts Road',
		address: '38 Scotts Road',
		price: 'S$ 4,800 /mo',
		availability: 'Available from 15 Jul',
		rooms: {
			bed: 1,
			bath: 1,
		},
		floorArea: ['797 sqft', 'S$ 6.02 psf'],
		propertyType: ['Condominium', 'Partially Furnished', 'Built: 2016'],
		walk: '7 mins (510 m) to NS21 Newton MRT',
	},
	{
		desc: {},
		imgSrc:
			'https://sg2-cdn.pgimgs.com/listing/23932963/UPHO.134435721.V800/Havelock-II-Boat-Quay-Raffles-Place-Marina-Singapore.jpg',
		title: 'Havelock II2 Havelock Road',
		address: '2 Havelock Road',
		price: 'S$ 2,500 /mo',
		availability: '',
		rooms: {
			bed: 1,
			bath: 1,
		},
		floorArea: ['322 sqft', 'S$ 7.76 psf'],
		propertyType: ['Apartment'],
		walk: '3 mins (210 m) to NE5 Clarke Quay MRT',
	},
	{
		desc: {},
		imgSrc:
			'https://sg1-cdn.pgimgs.com/listing/20728663/UPHO.90178176.V800/VA-Residences-Balestier-Toa-Payoh-Singapore.jpg',
		title: 'VA Residences9 Boon Teck Road',
		address: '9 Boon Teck Road',
		price: 'S$ 5,500 /mo',
		availability: 'Ready to move',
		rooms: {
			bed: 3,
			bath: 2,
		},
		floorArea: ['1690 sqft', 'S$ 3.25 psf'],
		propertyType: ['Condominium', 'Partially Furnished', 'Built: 2016'],
		walk: '9 mins (660 m) to NS19 Toa Payoh MRT',
	},
	{
		desc: {},
		imgSrc:
			'https://sg1-cdn.pgimgs.com/listing/23948888/UPHO.134946792.V800/Emerald-Hill-Conservation-Area-Orchard-River-Valley-Singapore.jpg',
		title: 'Emerald Hill Conservation AreaEmerald Hill Road',
		address: 'Emerald Hill Road',
		price: 'S$ 18,800 /mo',
		availability: 'Ready to move',
		rooms: {
			bed: 4,
			bath: 4,
		},
		floorArea: ['3845 sqft (floor), 1331 sqft (land)', 'S$ 14.12 psf'],
		propertyType: ['Conservation House', 'Partially Furnished'],
		walk: '1 mins (90 m) to TE14 Orchard MRT',
	},
	{
		desc: {},
		imgSrc:
			'https://sg2-cdn.pgimgs.com/listing/23875063/UPHO.134948941.V800/Park-Colonial-Macpherson-Potong-Pasir-Singapore.jpg',
		title: 'Park Colonial2 Woodleigh Lane',
		address: '2 Woodleigh Lane',
		price: 'S$ 3,088 /mo',
		availability: 'Available from 30 Jun',
		rooms: {
			bed: 1,
			bath: 1,
		},
		floorArea: ['463 sqft', 'S$ 6.67 psf'],
		propertyType: ['New Project: 2022', 'Condominium', 'Partially Furnished'],
		walk: '3 mins (220 m) to NE11 Woodleigh MRT',
	},
	{
		desc: {},
		imgSrc:
			'https://sg1-cdn.pgimgs.com/listing/23966343/UPHO.134877144.V800/Rochelle-At-Newton-Newton-Novena-Singapore.jpg',
		title: 'Rochelle At Newton188 Keng Lee Road',
		address: '188 Keng Lee Road',
		price: 'S$ 8,500 /mo',
		availability: 'Available from 1 Jun',
		rooms: {
			bed: 4,
			bath: 3,
		},
		floorArea: ['1861 sqft', 'S$ 4.57 psf'],
		propertyType: ['Condominium', 'Partially Furnished', 'Built: 2013'],
		walk: '5 mins (350 m) to DT11 Newton MRT',
	},
	{
		desc: {},
		imgSrc:
			'https://sg1-cdn.pgimgs.com/listing/23959894/UPHO.135128240.V800/Park-Colonial-Macpherson-Potong-Pasir-Singapore.jpg',
		title: 'Park Colonial2 Woodleigh Lane',
		address: '2 Woodleigh Lane',
		price: 'S$ 4,499 /mo',
		availability: 'Available from 25 Jun',
		rooms: {
			bed: 2,
			bath: 1,
		},
		floorArea: ['818 sqft', 'S$ 5.50 psf'],
		propertyType: ['New Project: 2022', 'Condominium', 'Partially Furnished'],
		walk: '3 mins (220 m) to NE11 Woodleigh MRT',
	},
	{
		desc: {},
		imgSrc:
			'https://sg2-cdn.pgimgs.com/listing/23865764/UPHO.134935077.V800/Park-Colonial-Macpherson-Potong-Pasir-Singapore.jpg',
		title: 'Park Colonial2 Woodleigh Lane',
		address: '2 Woodleigh Lane',
		price: 'S$ 3,299 /mo',
		availability: 'Ready to move',
		rooms: {
			bed: 1,
			bath: 1,
		},
		floorArea: ['463 sqft', 'S$ 7.13 psf'],
		propertyType: ['New Project: 2022', 'Condominium'],
		walk: '3 mins (220 m) to NE11 Woodleigh MRT',
	},
	{
		desc: {},
		imgSrc:
			'https://sg2-cdn.pgimgs.com/listing/23987172/UPHO.135154947.V800/707-Jurong-West-Street-71-Boon-Lay-Jurong-Tuas-Singapore.jpg',
		title: '707 Jurong West Street 71707 Jurong West Street 71',
		address: '707 Jurong West Street 71',
		price: 'S$ 900 /mo',
		availability: 'Available from 1 Jun',
		rooms: {
			'room-rental': null,
		},
		floorArea: ['120 sqft', 'S$ 7.50 psf'],
		propertyType: ['HDB Flat', 'Fully Furnished', 'Built: 1994'],
		walk: '8 mins (580 m) to EW28 Pioneer MRT',
	},
	{
		desc: {},
		imgSrc:
			'https://sg2-cdn.pgimgs.com/listing/23985512/UPHO.135133399.V800/Dakota-Residences-Eunos-Geylang-Paya-Lebar-Singapore.jpg',
		title: 'Dakota Residences34 Dakota Crescent',
		address: '34 Dakota Crescent',
		price: 'S$ 4,800 /mo',
		availability: 'Available from 15 Jun',
		rooms: {
			bed: 2,
			bath: 2,
		},
		floorArea: ['1025 sqft', 'S$ 4.68 psf'],
		propertyType: ['Condominium', 'Fully Furnished', 'Built: 2010'],
		walk: '4 mins (320 m) to CC8 Dakota MRT',
	},
	{
		desc: {},
		imgSrc:
			'https://sg1-cdn.pgimgs.com/listing/22482847/UPHO.116302738.V800/Waterfront-Waves-Bedok-Upper-East-Coast-Singapore.jpg',
		title: 'Waterfront Waves766 Bedok Reservoir Road',
		address: '766 Bedok Reservoir Road',
		price: 'S$ 6,500 /mo',
		availability: 'Available from 1 Aug',
		rooms: {
			bed: 4,
			bath: 3,
		},
		floorArea: ['1518 sqft', 'S$ 4.28 psf'],
		propertyType: ['Condominium', 'Fully Furnished', 'Built: 2011'],
		walk: '5 mins (380 m) to DT30 Bedok Reservoir MRT',
	},
	{
		desc: {},
		imgSrc:
			'https://sg2-cdn.pgimgs.com/listing/23943705/UPHO.134574367.V800/Park-Colonial-Macpherson-Potong-Pasir-Singapore.jpg',
		title: 'Park Colonial2 Woodleigh Lane',
		address: '2 Woodleigh Lane',
		price: 'S$ 5,900 /mo',
		availability: 'Ready to move',
		rooms: {
			bed: 3,
			bath: 2,
		},
		floorArea: ['980 sqft', 'S$ 6.02 psf'],
		propertyType: ['New Project: 2022', 'Condominium', 'Partially Furnished'],
		walk: '3 mins (220 m) to NE11 Woodleigh MRT',
	},
	{
		desc: {},
		imgSrc:
			'https://sg2-cdn.pgimgs.com/listing/20491783/UPHO.108403291.V800/J-Gateway-Boon-Lay-Jurong-Tuas-Singapore.jpg',
		title: 'J Gateway2 Gateway Drive',
		address: '2 Gateway Drive',
		price: 'S$ 6,500 /mo',
		availability: 'Available from 9 Jul',
		rooms: {
			bed: 4,
			bath: 3,
		},
		floorArea: ['1206 sqft', 'S$ 5.39 psf'],
		propertyType: ['Condominium', 'Partially Furnished', 'Built: 2017'],
		walk: '3 mins (260 m) to NS1 Jurong East MRT',
	},
	{
		desc: {},
		imgSrc:
			'https://sg1-cdn.pgimgs.com/listing/20728663/UPHO.90178176.V800/VA-Residences-Balestier-Toa-Payoh-Singapore.jpg',
		title: 'VA Residences9 Boon Teck Road',
		address: '9 Boon Teck Road',
		price: 'S$ 5,500 /mo',
		availability: 'Ready to move',
		rooms: {
			bed: 3,
			bath: 2,
		},
		floorArea: ['1690 sqft', 'S$ 3.25 psf'],
		propertyType: ['Condominium', 'Partially Furnished', 'Built: 2016'],
		walk: '9 mins (660 m) to NS19 Toa Payoh MRT',
	},
	{
		desc: {},
		imgSrc:
			'https://sg1-cdn.pgimgs.com/listing/23948888/UPHO.134946792.V800/Emerald-Hill-Conservation-Area-Orchard-River-Valley-Singapore.jpg',
		title: 'Emerald Hill Conservation AreaEmerald Hill Road',
		address: 'Emerald Hill Road',
		price: 'S$ 18,800 /mo',
		availability: 'Ready to move',
		rooms: {
			bed: 4,
			bath: 4,
		},
		floorArea: ['3845 sqft (floor), 1331 sqft (land)', 'S$ 14.12 psf'],
		propertyType: ['Conservation House', 'Partially Furnished'],
		walk: '1 mins (90 m) to TE14 Orchard MRT',
	},
	{
		desc: {},
		imgSrc:
			'https://sg1-cdn.pgimgs.com/listing/23966343/UPHO.134877144.V800/Rochelle-At-Newton-Newton-Novena-Singapore.jpg',
		title: 'Rochelle At Newton188 Keng Lee Road',
		address: '188 Keng Lee Road',
		price: 'S$ 8,500 /mo',
		availability: 'Available from 1 Jun',
		rooms: {
			bed: 4,
			bath: 3,
		},
		floorArea: ['1861 sqft', 'S$ 4.57 psf'],
		propertyType: ['Condominium', 'Partially Furnished', 'Built: 2013'],
		walk: '5 mins (350 m) to DT11 Newton MRT',
	},
	{
		desc: {},
		imgSrc:
			'https://sg1-cdn.pgimgs.com/listing/23959894/UPHO.135128240.V800/Park-Colonial-Macpherson-Potong-Pasir-Singapore.jpg',
		title: 'Park Colonial2 Woodleigh Lane',
		address: '2 Woodleigh Lane',
		price: 'S$ 4,499 /mo',
		availability: 'Available from 25 Jun',
		rooms: {
			bed: 2,
			bath: 1,
		},
		floorArea: ['818 sqft', 'S$ 5.50 psf'],
		propertyType: ['New Project: 2022', 'Condominium', 'Partially Furnished'],
		walk: '3 mins (220 m) to NE11 Woodleigh MRT',
	},
	{
		desc: {},
		imgSrc:
			'https://sg2-cdn.pgimgs.com/listing/23865764/UPHO.134935077.V800/Park-Colonial-Macpherson-Potong-Pasir-Singapore.jpg',
		title: 'Park Colonial2 Woodleigh Lane',
		address: '2 Woodleigh Lane',
		price: 'S$ 3,299 /mo',
		availability: 'Ready to move',
		rooms: {
			bed: 1,
			bath: 1,
		},
		floorArea: ['463 sqft', 'S$ 7.13 psf'],
		propertyType: ['New Project: 2022', 'Condominium'],
		walk: '3 mins (220 m) to NE11 Woodleigh MRT',
	},
	{
		desc: {},
		imgSrc:
			'https://sg2-cdn.pgimgs.com/listing/23987172/UPHO.135154947.V800/707-Jurong-West-Street-71-Boon-Lay-Jurong-Tuas-Singapore.jpg',
		title: '707 Jurong West Street 71707 Jurong West Street 71',
		address: '707 Jurong West Street 71',
		price: 'S$ 900 /mo',
		availability: 'Available from 1 Jun',
		rooms: {
			'room-rental': null,
		},
		floorArea: ['120 sqft', 'S$ 7.50 psf'],
		propertyType: ['HDB Flat', 'Fully Furnished', 'Built: 1994'],
		walk: '8 mins (580 m) to EW28 Pioneer MRT',
	},
	{
		desc: {},
		imgSrc:
			'https://sg2-cdn.pgimgs.com/listing/23985512/UPHO.135133399.V800/Dakota-Residences-Eunos-Geylang-Paya-Lebar-Singapore.jpg',
		title: 'Dakota Residences34 Dakota Crescent',
		address: '34 Dakota Crescent',
		price: 'S$ 4,800 /mo',
		availability: 'Available from 15 Jun',
		rooms: {
			bed: 2,
			bath: 2,
		},
		floorArea: ['1025 sqft', 'S$ 4.68 psf'],
		propertyType: ['Condominium', 'Fully Furnished', 'Built: 2010'],
		walk: '4 mins (320 m) to CC8 Dakota MRT',
	},
	{
		desc: {},
		imgSrc:
			'https://sg1-cdn.pgimgs.com/listing/22482847/UPHO.116302738.V800/Waterfront-Waves-Bedok-Upper-East-Coast-Singapore.jpg',
		title: 'Waterfront Waves766 Bedok Reservoir Road',
		address: '766 Bedok Reservoir Road',
		price: 'S$ 6,500 /mo',
		availability: 'Available from 1 Aug',
		rooms: {
			bed: 4,
			bath: 3,
		},
		floorArea: ['1518 sqft', 'S$ 4.28 psf'],
		propertyType: ['Condominium', 'Fully Furnished', 'Built: 2011'],
		walk: '5 mins (380 m) to DT30 Bedok Reservoir MRT',
	},
	{
		desc: {},
		imgSrc:
			'https://sg2-cdn.pgimgs.com/listing/23943705/UPHO.134574367.V800/Park-Colonial-Macpherson-Potong-Pasir-Singapore.jpg',
		title: 'Park Colonial2 Woodleigh Lane',
		address: '2 Woodleigh Lane',
		price: 'S$ 5,900 /mo',
		availability: 'Ready to move',
		rooms: {
			bed: 3,
			bath: 2,
		},
		floorArea: ['980 sqft', 'S$ 6.02 psf'],
		propertyType: ['New Project: 2022', 'Condominium', 'Partially Furnished'],
		walk: '3 mins (220 m) to NE11 Woodleigh MRT',
	},
	{
		desc: {},
		imgSrc:
			'https://sg2-cdn.pgimgs.com/listing/20491783/UPHO.108403291.V800/J-Gateway-Boon-Lay-Jurong-Tuas-Singapore.jpg',
		title: 'J Gateway2 Gateway Drive',
		address: '2 Gateway Drive',
		price: 'S$ 6,500 /mo',
		availability: 'Available from 9 Jul',
		rooms: {
			bed: 4,
			bath: 3,
		},
		floorArea: ['1206 sqft', 'S$ 5.39 psf'],
		propertyType: ['Condominium', 'Partially Furnished', 'Built: 2017'],
		walk: '3 mins (260 m) to NS1 Jurong East MRT',
	},
	{
		desc: {},
		imgSrc:
			'https://sg2-cdn.pgimgs.com/listing/23956338/UPHO.135154851.V800/Luma-Orchard-River-Valley-Singapore.jpg',
		title: 'Luma6 River Valley Grove',
		address: '6 River Valley Grove',
		price: 'S$ 5,500 /mo',
		availability: 'Available from 10 May',
		rooms: {
			bed: 2,
			bath: 2,
		},
		floorArea: ['1173 sqft', 'S$ 4.69 psf'],
		propertyType: ['Condominium', 'Fully Furnished', 'Built: 2011'],
		walk: '3 mins (250 m) to TE15 Great World MRT',
	},
	{
		desc: {},
		imgSrc:
			'https://sg1-cdn.pgimgs.com/listing/18751517/UPHO.127762784.V800/Volari-Tanglin-Holland-Bukit-Timah-Singapore.jpg',
		title: 'Volari12 Balmoral Road',
		address: '12 Balmoral Road',
		price: 'S$ 6,500 /mo',
		availability: 'Ready to move',
		rooms: {
			bed: 2,
			bath: 2,
		},
		floorArea: ['1324 sqft', 'S$ 4.91 psf'],
		propertyType: ['Condominium', 'Partially Furnished', 'Built: 2014'],
		walk: '7 mins (510 m) to NS21 Newton MRT',
	},
	{
		desc: {},
		imgSrc:
			'https://sg1-cdn.pgimgs.com/listing/23563303/UPHO.129659124.V800/Marina-Bay-Residences-Boat-Quay-Raffles-Place-Marina-Singapore.jpg',
		title: 'Marina Bay Residences18 Marina Boulevard',
		address: '18 Marina Boulevard',
		price: 'S$ 60,000 /mo',
		availability: 'Ready to move',
		rooms: {
			bed: 5,
			bath: 5,
		},
		floorArea: ['3972 sqft', 'S$ 15.11 psf'],
		propertyType: ['Condominium', 'Fully Furnished', 'Built: 2010'],
		walk: '2 mins (140 m) to DT17 Downtown MRT',
	},
	{
		desc: {},
		imgSrc:
			'https://sg1-cdn.pgimgs.com/listing/23954869/UPHO.134722136.V800/Park-Colonial-Macpherson-Potong-Pasir-Singapore.jpg',
		title: 'Park Colonial2 Woodleigh Lane',
		address: '2 Woodleigh Lane',
		price: 'S$ 3,800 /mo',
		availability: 'Available from 23 May',
		rooms: {
			bed: 2,
			bath: 1,
		},
		floorArea: ['603 sqft', 'S$ 6.30 psf'],
		propertyType: ['New Project: 2022', 'Condominium'],
		walk: '3 mins (220 m) to NE11 Woodleigh MRT',
	},
	{
		desc: {},
		imgSrc:
			'https://sg1-cdn.pgimgs.com/listing/22565159/UPHO.119528684.V800/Parc-Oasis-Boon-Lay-Jurong-Tuas-Singapore.jpg',
		title: 'Parc Oasis39 Jurong East Avenue 1',
		address: '39 Jurong East Avenue 1',
		price: 'S$ 4,100 /mo',
		availability: 'Available from 27 Jun',
		rooms: {
			bed: 3,
			bath: 3,
		},
		floorArea: ['1378 sqft', 'S$ 2.98 psf'],
		propertyType: ['Condominium', 'Fully Furnished', 'Built: 1995'],
		walk: '3 mins (240 m) to EW25 Chinese Garden MRT',
	},
	{
		desc: {},
		imgSrc:
			'https://sg2-cdn.pgimgs.com/listing/23972428/UPHO.134957001.V800/Park-Colonial-Macpherson-Potong-Pasir-Singapore.jpg',
		title: 'Park Colonial2 Woodleigh Lane',
		address: '2 Woodleigh Lane',
		price: 'S$ 3,300 /mo',
		availability: 'Ready to move',
		rooms: {
			bed: 1,
			bath: 1,
		},
		floorArea: ['463 sqft', 'S$ 7.13 psf'],
		propertyType: ['New Project: 2022', 'Condominium', 'Partially Furnished'],
		walk: '3 mins (220 m) to NE11 Woodleigh MRT',
	},
	{
		desc: {},
		imgSrc:
			'https://sg1-cdn.pgimgs.com/listing/21318329/UPHO.134706902.V800/Ardmore-Park-Tanglin-Holland-Bukit-Timah-Singapore.jpg',
		title: 'Ardmore Park9 Ardmore Park',
		address: '9 Ardmore Park',
		price: 'S$ 17,500 /mo',
		availability: 'Ready to move',
		rooms: {
			bed: 4,
			bath: 4,
		},
		floorArea: ['2885 sqft', 'S$ 6.07 psf'],
		propertyType: ['Condominium', 'Partially Furnished', 'Built: 2001'],
		walk: '9 mins (680 m) to NS22 Orchard MRT',
	},
	{
		desc: {},
		imgSrc:
			'https://sg2-cdn.pgimgs.com/listing/21699274/UPHO.105749225.V800/Marina-Bay-Residences-Boat-Quay-Raffles-Place-Marina-Singapore.jpg',
		title: 'Marina Bay Residences18 Marina Boulevard',
		address: '18 Marina Boulevard',
		price: 'S$ 60,000 /mo',
		availability: 'Ready to move',
		rooms: {
			bed: 4,
			bath: 5,
		},
		floorArea: ['3972 sqft', 'S$ 15.11 psf'],
		propertyType: ['Condominium', 'Built: 2010'],
		walk: '2 mins (140 m) to DT17 Downtown MRT',
	},
	{
		desc: {},
		imgSrc:
			'https://sg1-cdn.pgimgs.com/listing/21746130/UPHO.135013738.V800/North-Park-Residences-Sembawang-Yishun-Singapore.jpg',
		title: 'North Park Residences37 Yishun Central 1',
		address: '37 Yishun Central 1',
		price: 'S$ 4,600 /mo',
		availability: 'Ready to move',
		rooms: {
			bed: 3,
			bath: 2,
		},
		floorArea: ['829 sqft', 'S$ 5.55 psf'],
		propertyType: ['Condominium', 'Partially Furnished', 'Built: 2018'],
		walk: '3 mins (250 m) to NS13 Yishun MRT',
	},
	{
		desc: {},
		imgSrc:
			'https://sg1-cdn.pgimgs.com/listing/19113641/UPHO.55081892.V800/One-Shenton-Boat-Quay-Raffles-Place-Marina-Singapore.jpg',
		title: 'One Shenton1 Shenton Way',
		address: '1 Shenton Way',
		price: 'S$ 80,000 /mo',
		availability: 'Ready to move',
		rooms: {
			bed: 5,
			bath: 5,
		},
		floorArea: ['9085 sqft', 'S$ 8.81 psf'],
		propertyType: ['Condominium', 'Fully Furnished', 'Built: 2011'],
		walk: '2 mins (170 m) to TE19 Shenton Way MRT',
	},
	{
		desc: {},
		imgSrc:
			'https://sg2-cdn.pgimgs.com/listing/21433577/UPHO.100414243.V800/Lush-Acres-Seletar-Yio-Chu-Kang-Singapore.jpg',
		title: 'Lush AcresSengkang West Way/Fernvale',
		address: 'Sengkang West Way/Fernvale',
		price: 'S$ 1,200 /mo',
		availability: 'Ready to move',
		rooms: {
			'room-rental': null,
		},
		floorArea: ['100 sqft', 'S$ 12.00 psf'],
		propertyType: ['Executive Condominium', 'Built: 2016'],
		walk: '4 mins (320 m) to SW6 Layar LRT',
	},
	{
		desc: {},
		imgSrc:
			'https://sg1-cdn.pgimgs.com/listing/21946939/UPHO.112943806.V800/Marina-Bay-Residences-Boat-Quay-Raffles-Place-Marina-Singapore.jpg',
		title:
			'Marina Bay Residences18 Marina Boulevard\n\n                      Favorable Price',
		address: '18 Marina Boulevard',
		price: 'S$ 25,000 /mo',
		availability: 'Available from 23 Jun',
		rooms: {
			bed: 4,
			bath: 4,
		},
		floorArea: ['2379 sqft', 'S$ 10.51 psf'],
		propertyType: ['Condominium', 'Partially Furnished', 'Built: 2010'],
		walk: '2 mins (140 m) to DT17 Downtown MRT',
	},
	{
		desc: {},
		imgSrc:
			'https://sg2-cdn.pgimgs.com/listing/23867727/UPHO.133882695.V800/Park-Colonial-Macpherson-Potong-Pasir-Singapore.jpg',
		title: 'Park Colonial2 Woodleigh Lane',
		address: '2 Woodleigh Lane',
		price: 'S$ 3,500 /mo',
		availability: '',
		rooms: {
			bed: 1,
			bath: 1,
		},
		floorArea: ['463 sqft', 'S$ 7.56 psf'],
		propertyType: ['New Project: 2022', 'Condominium', 'Partially Furnished'],
		walk: '3 mins (220 m) to NE11 Woodleigh MRT',
	},
	{
		desc: {},
		imgSrc:
			'https://sg2-cdn.pgimgs.com/listing/23867730/UPHO.133882665.V800/Park-Colonial-Macpherson-Potong-Pasir-Singapore.jpg',
		title: 'Park Colonial2 Woodleigh Lane',
		address: '2 Woodleigh Lane',
		price: 'S$ 4,500 /mo',
		availability: '',
		rooms: {
			bed: 2,
			bath: 1,
		},
		floorArea: ['603 sqft', 'S$ 7.46 psf'],
		propertyType: ['New Project: 2022', 'Condominium', 'Partially Furnished'],
		walk: '3 mins (220 m) to NE11 Woodleigh MRT',
	},
	{
		desc: {},
		imgSrc:
			'https://sg1-cdn.pgimgs.com/listing/1580737/UPHO.109185400.V800/Cairnhill-Crest-Orchard-River-Valley-Singapore.jpg',
		title: 'Cairnhill Crest2 Cairnhill Circle',
		address: '2 Cairnhill Circle',
		price: 'S$ 6,800 /mo',
		availability: 'Available from 1 Jul',
		rooms: {
			bed: 2,
			bath: 2,
		},
		floorArea: ['1206 sqft', 'S$ 5.64 psf'],
		propertyType: ['Condominium', 'Partially Furnished', 'Built: 2004'],
		walk: '6 mins (440 m) to TE14 Orchard MRT',
	},
	{
		desc: {},
		imgSrc:
			'https://sg2-cdn.pgimgs.com/listing/23980757/UPHO.135067073.V800/Modern-Semi-D-in-Bukit-Batok-Dairy-Farm-Bukit-Panjang-Choa-Chu-Kang-Singapore.jpg',
		title: 'Modern Semi-D in Bukit Batokjalan Batu Nilam',
		address: 'jalan Batu Nilam',
		price: 'S$ 15,000 /mo',
		availability: 'Available from 1 Jun',
		rooms: {
			bed: 5,
			bath: 5,
		},
		floorArea: ['3500 sqft (floor), 4000 sqft (land)', 'S$ 3.75 psf'],
		propertyType: ['Semi-Detached House', 'Partially Furnished'],
		walk: '10 mins (730 m) to DT3 Hillview MRT',
	},
	{
		desc: {},
		imgSrc:
			'https://sg2-cdn.pgimgs.com/listing/23974629/UPHO.134990347.V800/Villas-Holland-Tanglin-Holland-Bukit-Timah-Singapore.jpg',
		title: 'Villas Holland2B Bukit Sedap Road',
		address: '2B Bukit Sedap Road',
		price: 'S$ 60,000 /mo',
		availability: 'Available from 16 Jun',
		rooms: {
			bed: 6,
			bath: 5,
		},
		floorArea: ['11076 sqft (floor), 16269 sqft (land)', 'S$ 3.69 psf'],
		propertyType: ['Good Class Bungalow', 'Partially Furnished'],
		walk: '',
	},
	{
		desc: {},
		imgSrc:
			'https://sg1-cdn.pgimgs.com/listing/23860851/UPHO.133496088.V800/The-Cape-East-Coast-Marine-Parade-Singapore.jpg',
		title: 'The Cape25 Amber Road',
		address: '25 Amber Road',
		price: 'S$ 3,700 /mo',
		availability: 'Available from 2 Jul',
		rooms: {
			bed: 1,
			bath: 1,
		},
		floorArea: ['570 sqft', 'S$ 6.49 psf'],
		propertyType: ['Apartment', 'Partially Furnished', 'Built: 2014'],
		walk: '6 mins (430 m) to TE25 Tanjong Katong MRT',
	},
	{
		desc: {},
		imgSrc:
			'https://sg2-cdn.pgimgs.com/listing/23881839/UPHO.133777105.V800/The-Colonnade-Tanglin-Holland-Bukit-Timah-Singapore.jpg',
		title: 'The Colonnade82 Grange Road',
		address: '82 Grange Road',
		price: 'S$ 16,200 /mo',
		availability: '',
		rooms: {
			bed: 3,
			bath: 4,
		},
		floorArea: ['3616 sqft', 'S$ 4.48 psf'],
		propertyType: ['Condominium', 'Partially Furnished', 'Built: 1986'],
		walk: '7 mins (500 m) to TE13 Orchard Boulevard MRT',
	},
	{
		desc: {},
		imgSrc:
			'https://sg1-cdn.pgimgs.com/listing/23964393/UPHO.134850746.V800/Hana-Tanglin-Holland-Bukit-Timah-Singapore.jpg',
		title: 'Hana8 Tomlinson Road',
		address: '8 Tomlinson Road',
		price: 'S$ 29,000 /mo',
		availability: '',
		rooms: {
			bed: 4,
			bath: 5,
		},
		floorArea: ['3531 sqft', 'S$ 8.21 psf'],
		propertyType: ['Apartment', 'Partially Furnished', 'Built: 2014'],
		walk: '4 mins (270 m) to TE13 Orchard Boulevard MRT',
	},
	{
		desc: {},
		imgSrc:
			'https://sg2-cdn.pgimgs.com/listing/13081840/UPHO.49621015.V800/3-Lorong-7-Toa-Payoh-Balestier-Toa-Payoh-Singapore.jpg',
		title: '3 Lorong 7 Toa Payoh3 Lorong 7 Toa Payoh',
		address: '3 Lorong 7 Toa Payoh',
		price: 'S$ 2,600 /mo',
		availability: 'Available from 1 Jul',
		rooms: {
			bed: 2,
			bath: 2,
		},
		floorArea: ['720 sqft', 'S$ 3.61 psf'],
		propertyType: ['HDB Flat', 'Fully Furnished', 'Built: 1968'],
		walk: '11 mins (850 m) to NS18 Braddell MRT',
	},
	{
		desc: {},
		imgSrc:
			'https://sg2-cdn.pgimgs.com/listing/23973235/UPHO.135021665.V800/Whistler-Grand-Buona-Vista-West-Coast-Clementi-New-Town-Singapore.jpg',
		title: 'Whistler Grand107 West Coast Vale',
		address: '107 West Coast Vale',
		price: 'S$ 3,500 /mo',
		availability: 'Ready to move',
		rooms: {
			bed: 1,
			bath: 1,
		},
		floorArea: ['441 sqft', 'S$ 7.94 psf'],
		propertyType: ['New Project: 2022', 'Condominium', 'Fully Furnished'],
		walk: '',
	},
	{
		desc: {},
		imgSrc:
			'https://sg2-cdn.pgimgs.com/listing/23264209/UPHO.125816425.V800/Starfire-Sophia-Orchard-River-Valley-Singapore.jpg',
		title: 'Starfire @ Sophia77 Sophia Road',
		address: '77 Sophia Road',
		price: 'S$ 7,500 /mo',
		availability: 'Available from 15 Jun',
		rooms: {
			bed: 3,
			bath: 4,
		},
		floorArea: ['2200 sqft', 'S$ 3.41 psf'],
		propertyType: ['Apartment', 'Partially Furnished'],
		walk: '5 mins (380 m) to NS24 Dhoby Ghaut MRT',
	},
	{
		desc: {},
		imgSrc:
			'https://sg2-cdn.pgimgs.com/listing/23398306/UPHO.130839779.V800/Holland-Mansion-Tanglin-Holland-Bukit-Timah-Singapore.jpg',
		title: 'Holland Mansion112 Holland Road',
		address: '112 Holland Road',
		price: 'S$ 6,000 /mo',
		availability: 'Available from 22 Jun',
		rooms: {
			bed: 3,
			bath: 4,
		},
		floorArea: ['1600 sqft', 'S$ 3.75 psf'],
		propertyType: ['Condominium', 'Partially Furnished', 'Built: 2005'],
		walk: '8 mins (570 m) to CC21 Holland Village MRT',
	},
	{
		desc: {},
		imgSrc:
			'https://sg2-cdn.pgimgs.com/listing/23986086/UPHO.135140255.V800/New-modern-2-5-Storey-Semi-D-in-the-heart-of-orchard-with-private-pool-Orchard-River-Valley-Singapore.jpg',
		title:
			'New modern 2. 5 Storey Semi D in the heart of orchard with private pool',
		address: '',
		price: 'S$ 21,000 /mo',
		availability: 'Available from 15 Jun',
		rooms: {
			bed: 6,
			bath: 5,
		},
		floorArea: ['5000 sqft (floor), 2700 sqft (land)', 'S$ 7.78 psf'],
		propertyType: ['Semi-Detached House', 'Partially Furnished'],
		walk: '4 mins (330 m) to TE13 Orchard Boulevard MRT',
	},
	{
		desc: {},
		imgSrc:
			'https://sg2-cdn.pgimgs.com/listing/23948136/UPHO.134633967.V800/The-Scotts-Tower-Orchard-River-Valley-Singapore.jpg',
		title: 'The Scotts Tower38 Scotts Road',
		address: '38 Scotts Road',
		price: 'S$ 16,300 /mo',
		availability: 'Ready to move',
		rooms: {
			bed: 3,
			bath: 3,
		},
		floorArea: ['3003 sqft', 'S$ 5.43 psf'],
		propertyType: ['Condominium', 'Partially Furnished', 'Built: 2016'],
		walk: '7 mins (510 m) to NS21 Newton MRT',
	},
	{
		desc: {},
		imgSrc:
			'https://sg1-cdn.pgimgs.com/listing/22226799/UPHO.113550432.V800/One-Tree-Hill-Luxurious-Modern-Semi-D-Orchard-Orchard-River-Valley-Singapore.jpg',
		title: 'One Tree Hill Luxurious Modern Semi-D Orchard',
		address: '',
		price: 'S$ 20,000 /mo',
		availability: 'Available from 1 Jun',
		rooms: {
			bed: 5,
			bath: 6,
		},
		floorArea: ['4180 sqft (floor), 2196 sqft (land)', 'S$ 9.11 psf'],
		propertyType: ['Semi-Detached House', 'Partially Furnished'],
		walk: '12 mins (930 m) to CC14 Lorong Chuan MRT',
	},
	{
		desc: {},
		imgSrc:
			'https://sg1-cdn.pgimgs.com/listing/23985100/UPHO.135126976.V800/Kovan-Regency-Hougang-Punggol-Sengkang-Singapore.jpg',
		title: 'Kovan Regency4 Kovan Rise',
		address: '4 Kovan Rise',
		price: 'S$ 3,000 /mo',
		availability: 'Available from 6 Jun',
		rooms: {
			bed: 1,
			bath: 1,
		},
		floorArea: ['500 sqft', 'S$ 6.00 psf'],
		propertyType: ['Condominium', 'Fully Furnished', 'Built: 2016'],
		walk: '3 mins (200 m) to NE13 Kovan MRT',
	},
	{
		desc: {},
		imgSrc:
			'https://sg1-cdn.pgimgs.com/listing/23100131/UPHO.134275288.V800/Up-Robertson-Quay-Orchard-River-Valley-Singapore.jpg',
		title: 'Up@Robertson Quay92 Robertson Quay',
		address: '92 Robertson Quay',
		price: 'S$ 5,600 /mo',
		availability: 'Available from 11 Jul',
		rooms: {
			bed: 1,
			bath: 2,
		},
		floorArea: ['979 sqft', 'S$ 5.72 psf'],
		propertyType: ['Condominium', 'Partially Furnished', 'Built: 2016'],
		walk: '7 mins (550 m) to TE16 Havelock MRT',
	},
	{
		desc: {},
		imgSrc:
			'https://sg2-cdn.pgimgs.com/listing/18667714/UPHO.52929459.V800/Valley-Park-Tanglin-Holland-Bukit-Timah-Singapore.jpg',
		title: 'Valley Park473 River Valley Road',
		address: '473 River Valley Road',
		price: 'S$ 4,500 /mo',
		availability: 'Available from 5 Jul',
		rooms: {
			bed: 2,
			bath: 2,
		},
		floorArea: ['1216 sqft', 'S$ 3.70 psf'],
		propertyType: ['Condominium', 'Partially Furnished', 'Built: 1997'],
		walk: '7 mins (530 m) to TE15 Great World MRT',
	},
	{
		desc: {},
		imgSrc:
			'https://sg2-cdn.pgimgs.com/listing/23987254/UPHO.135155885.V800/405-Jurong-West-Street-42-Boon-Lay-Jurong-Tuas-Singapore.jpg',
		title: '405 Jurong West Street 42405 Jurong West Street 42',
		address: '405 Jurong West Street 42',
		price: 'S$ 800 /mo',
		availability: 'Available from 5 Jun',
		rooms: {
			'room-rental': null,
		},
		floorArea: ['150 sqft', 'S$ 5.33 psf'],
		propertyType: ['HDB Flat', 'Fully Furnished', 'Built: 1983'],
		walk: '10 mins (770 m) to JS4 Hong Kah MRT',
	},
	{
		desc: {},
		imgSrc:
			'https://sg2-cdn.pgimgs.com/listing/23941886/UPHO.134838527.V800/Petit-Jervois-Tanglin-Holland-Bukit-Timah-Singapore.jpg',
		title: 'Petit Jervois33 Jervois Road',
		address: '33 Jervois Road',
		price: 'S$ 7,800 /mo',
		availability: '',
		rooms: {
			bed: 2,
			bath: 2,
		},
		floorArea: ['1012 sqft', 'S$ 7.71 psf'],
		propertyType: ['New Project: 2022', 'Condominium', 'Partially Furnished'],
		walk: '11 mins (800 m) to EW18 Redhill MRT',
	},
	{
		desc: {},
		imgSrc:
			'https://sg2-cdn.pgimgs.com/listing/23868112/UPHO.133800945.V800/Park-Colonial-Macpherson-Potong-Pasir-Singapore.jpg',
		title: 'Park Colonial2 Woodleigh Lane',
		address: '2 Woodleigh Lane',
		price: 'S$ 4,100 /mo',
		availability: 'Available from 31 May',
		rooms: {
			bed: 2,
			bath: 1,
		},
		floorArea: ['635 sqft', 'S$ 6.46 psf'],
		propertyType: ['New Project: 2022', 'Condominium', 'Partially Furnished'],
		walk: '3 mins (220 m) to NE11 Woodleigh MRT',
	},
	{
		desc: {},
		imgSrc:
			'https://sg1-cdn.pgimgs.com/listing/23867857/UPHO.134671912.V800/Park-Colonial-Macpherson-Potong-Pasir-Singapore.jpg',
		title: 'Park Colonial2 Woodleigh Lane',
		address: '2 Woodleigh Lane',
		price: 'S$ 3,199 /mo',
		availability: 'Available from 31 May',
		rooms: {
			bed: 1,
			bath: 1,
		},
		floorArea: ['461 sqft', 'S$ 6.94 psf'],
		propertyType: ['New Project: 2022', 'Condominium', 'Partially Furnished'],
		walk: '3 mins (220 m) to NE11 Woodleigh MRT',
	},
	{
		desc: {},
		imgSrc:
			'https://sg1-cdn.pgimgs.com/listing/20174425/UPHO.75418002.V800/34-Upper-Cross-Street-Boat-Quay-Raffles-Place-Marina-Singapore.jpg',
		title: '34 Upper Cross Street34 Upper Cross Street',
		address: '34 Upper Cross Street',
		price: 'S$ 3,500 /mo',
		availability: 'Ready to move',
		rooms: {
			bed: 3,
			bath: 2,
		},
		floorArea: ['699 sqft', 'S$ 5.01 psf'],
		propertyType: ['HDB Flat', 'Fully Furnished', 'Built: 1974'],
		walk: '3 mins (250 m) to NE4 Chinatown MRT',
	},
	{
		desc: {},
		imgSrc:
			'https://sg1-cdn.pgimgs.com/listing/18102910/UPHO.112550078.V800/Sentosa-Cove-Harbourfront-Telok-Blangah-Singapore.jpg',
		title: 'Sentosa CoveOcean Drive',
		address: 'Ocean Drive',
		price: 'S$ 40,000 /mo',
		availability: 'Available from 23 May',
		rooms: {
			bed: 5,
			bath: 6,
		},
		floorArea: ['7800 sqft (floor), 8800 sqft (land)', 'S$ 4.55 psf'],
		propertyType: ['Detached House', 'Partially Furnished', 'Built: 2011'],
		walk: '',
	},
	{
		desc: {},
		imgSrc:
			'https://sg1-cdn.pgimgs.com/listing/23983684/UPHO.135108010.V800/229-Pending-Road-Dairy-Farm-Bukit-Panjang-Choa-Chu-Kang-Singapore.jpg',
		title: '229 Pending Road229 Pending Road',
		address: '229 Pending Road',
		price: 'S$ 850 /mo',
		availability: 'Ready to move',
		rooms: {
			'room-rental': null,
		},
		floorArea: ['100 sqft', 'S$ 8.50 psf'],
		propertyType: ['HDB Flat', 'Partially Furnished', 'Built: 1987'],
		walk: '2 mins (130 m) to BP8 Pending LRT',
	},
	{
		desc: {},
		imgSrc:
			'https://sg2-cdn.pgimgs.com/listing/23955615/UPHO.134733103.V800/Parc-Botannia-Seletar-Yio-Chu-Kang-Singapore.jpg',
		title: 'Parc Botannia10 Fernvale Street',
		address: '10 Fernvale Street',
		price: 'S$ 3,800 /mo',
		availability: '',
		rooms: {
			bed: 2,
			bath: 2,
		},
		floorArea: ['667 sqft', 'S$ 5.70 psf'],
		propertyType: ['Condominium', 'Partially Furnished', 'Built: 2021'],
		walk: '',
	},
	{
		desc: {},
		imgSrc:
			'https://sg1-cdn.pgimgs.com/listing/23645157/UPHO.130730600.V800/85B-Lorong-4-Toa-Payoh-Balestier-Toa-Payoh-Singapore.jpg',
		title: '85B Lorong 4 Toa Payoh85B Lorong 4 Toa Payoh',
		address: '85B Lorong 4 Toa Payoh',
		price: 'S$ 2,900 /mo',
		availability: 'Available from 7 Jun',
		rooms: {
			bed: 1,
			bath: 1,
		},
		floorArea: ['721 sqft', 'S$ 4.02 psf'],
		propertyType: ['HDB Flat', 'Fully Furnished', 'Built: 1971'],
		walk: '6 mins (470 m) to NS19 Toa Payoh MRT',
	},
	{
		desc: {},
		imgSrc:
			'https://sg2-cdn.pgimgs.com/listing/23952979/UPHO.134695731.V800/Robertson-Edge-Orchard-River-Valley-Singapore.jpg',
		title: 'Robertson Edge18 Tong Watt Road',
		address: '18 Tong Watt Road',
		price: 'S$ 3,500 /mo',
		availability: 'Available from 1 Jul',
		rooms: {
			bed: 1,
			bath: 1,
		},
		floorArea: ['495 sqft', 'S$ 7.07 psf'],
		propertyType: ['Apartment', 'Fully Furnished', 'Built: 2008'],
		walk: '6 mins (460 m) to DT20 Fort Canning MRT',
	},
	{
		desc: {},
		imgSrc:
			'https://sg2-cdn.pgimgs.com/listing/23982930/UPHO.135097103.V800/Park-Colonial-Macpherson-Potong-Pasir-Singapore.jpg',
		title: 'Park Colonial2 Woodleigh Lane',
		address: '2 Woodleigh Lane',
		price: 'S$ 6,800 /mo',
		availability: 'Ready to move',
		rooms: {
			bed: 3,
			bath: 2,
		},
		floorArea: ['936 sqft', 'S$ 7.26 psf'],
		propertyType: ['New Project: 2022', 'Condominium', 'Partially Furnished'],
		walk: '3 mins (220 m) to NE11 Woodleigh MRT',
	},
	{
		desc: {},
		imgSrc:
			'https://sg2-cdn.pgimgs.com/listing/23985927/UPHO.135138423.V800/Palm-Isles-Changi-Airport-Changi-Village-Singapore.jpg',
		title: 'Palm Isles40 Flora Drive',
		address: '40 Flora Drive',
		price: 'S$ 3,600 /mo',
		availability: 'Available from 1 Jul',
		rooms: {
			bed: 2,
		},
		floorArea: ['947 sqft', 'S$ 3.80 psf'],
		propertyType: ['Condominium', 'Built: 2011'],
		walk: '13 mins (950 m) to DT33 Tampines East MRT',
	},
	{
		desc: {},
		imgSrc:
			'https://sg2-cdn.pgimgs.com/listing/22741013/UPHO.119032919.V800/Chelsea-Village-Buona-Vista-West-Coast-Clementi-New-Town-Singapore.jpg',
		title: 'Chelsea VillageJambol Place',
		address: 'Jambol Place',
		price: 'S$ 2,000 /mo',
		availability: 'Available from 1 Aug',
		rooms: {
			'room-rental': null,
		},
		floorArea: ['300 sqft'],
		propertyType: ['Terraced House', 'Fully Furnished', 'Built: 1991'],
		walk: '5 mins (410 m) to CC26 Pasir Panjang MRT',
	},
	{
		desc: {},
		imgSrc:
			'https://sg2-cdn.pgimgs.com/listing/23983492/UPHO.135105667.V800/Heritage-View-Buona-Vista-West-Coast-Clementi-New-Town-Singapore.jpg',
		title: 'Heritage View8 Dover Rise',
		address: '8 Dover Rise',
		price: 'S$ 5,500 /mo',
		availability: '',
		rooms: {
			bed: 3,
			bath: 2,
		},
		floorArea: ['1195 sqft', 'S$ 4.60 psf'],
		propertyType: ['Condominium', 'Fully Furnished', 'Built: 2000'],
		walk: '8 mins (570 m) to CC23 One-North MRT',
	},
	{
		desc: {},
		imgSrc:
			'https://sg1-cdn.pgimgs.com/listing/23984946/UPHO.135124644.V800/Dakota-Residences-Eunos-Geylang-Paya-Lebar-Singapore.jpg',
		title: 'Dakota Residences38 Dakota Crescent',
		address: '38 Dakota Crescent',
		price: 'S$ 4,800 /mo',
		availability: 'Ready to move',
		rooms: {
			bed: 2,
			bath: 2,
		},
		floorArea: ['1023 sqft', 'S$ 4.69 psf'],
		propertyType: ['Condominium', 'Fully Furnished', 'Built: 2010'],
		walk: '4 mins (320 m) to CC8 Dakota MRT',
	},
	{
		desc: {},
		imgSrc:
			'https://sg1-cdn.pgimgs.com/listing/23986319/UPHO.135143536.V800/Park-Colonial-Macpherson-Potong-Pasir-Singapore.jpg',
		title: 'Park Colonial2 Woodleigh Lane',
		address: '2 Woodleigh Lane',
		price: 'S$ 3,800 /mo',
		availability: 'Ready to move',
		rooms: {
			bed: 2,
			bath: 1,
		},
		floorArea: ['570 sqft', 'S$ 6.67 psf'],
		propertyType: ['New Project: 2022', 'Condominium', 'Fully Furnished'],
		walk: '3 mins (220 m) to NE11 Woodleigh MRT',
	},
	{
		desc: {},
		imgSrc:
			'https://sg1-cdn.pgimgs.com/listing/23908519/UPHO.134123266.V800/Cairnhill-Nine-Orchard-River-Valley-Singapore.jpg',
		title: 'Cairnhill Nine9 Cairnhill Road',
		address: '9 Cairnhill Road',
		price: 'S$ 6,200 /mo',
		availability: 'Ready to move',
		rooms: {
			bed: 1,
			bath: 1,
		},
		floorArea: ['904 sqft', 'S$ 6.86 psf'],
		propertyType: ['Condominium', 'Partially Furnished', 'Built: 2017'],
		walk: '6 mins (430 m) to TE14 Orchard MRT',
	},
	{
		desc: {},
		imgSrc:
			'https://sg1-cdn.pgimgs.com/listing/23926054/UPHO.134734698.V800/Park-Colonial-Macpherson-Potong-Pasir-Singapore.jpg',
		title: 'Park Colonial2 Woodleigh Lane',
		address: '2 Woodleigh Lane',
		price: 'S$ 3,900 /mo',
		availability: 'Ready to move',
		rooms: {
			bed: 2,
			bath: 1,
		},
		floorArea: ['635 sqft', 'S$ 6.14 psf'],
		propertyType: ['New Project: 2022', 'Condominium', 'Partially Furnished'],
		walk: '3 mins (220 m) to NE11 Woodleigh MRT',
	},
	{
		desc: {},
		imgSrc:
			'https://sg1-cdn.pgimgs.com/listing/23973338/UPHO.134969806.V800/Whistler-Grand-Buona-Vista-West-Coast-Clementi-New-Town-Singapore.jpg',
		title: 'Whistler Grand107 West Coast Vale',
		address: '107 West Coast Vale',
		price: 'S$ 3,700 /mo',
		availability: 'Available from 12 May',
		rooms: {
			bed: 1,
			bath: 1,
		},
		floorArea: ['506 sqft', 'S$ 7.31 psf'],
		propertyType: ['New Project: 2022', 'Condominium'],
		walk: '',
	},
	{
		desc: {},
		imgSrc:
			'https://sg2-cdn.pgimgs.com/listing/23985829/UPHO.135137031.V800/The-Scotts-Tower-Orchard-River-Valley-Singapore.jpg',
		title: 'The Scotts Tower38 Scotts Road',
		address: '38 Scotts Road',
		price: 'S$ 16,300 /mo',
		availability: 'Ready to move',
		rooms: {
			bed: 3,
			bath: 3,
		},
		floorArea: ['3003 sqft', 'S$ 5.43 psf'],
		propertyType: ['Condominium', 'Partially Furnished', 'Built: 2016'],
		walk: '7 mins (510 m) to NS21 Newton MRT',
	},
];
