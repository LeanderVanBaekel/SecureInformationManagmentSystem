module.exports = {
	clients: [
		{
			id: 0,
			name: 'Lidl Nederland',
			logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/b/be/Lidl_Stiftung_%26_Co._KG_logo.svg/1024px-Lidl_Stiftung_%26_Co._KG_logo.svg.png',
			projects: [{},{}],
		},
		{
			id: 1,
			name: 'Staka',
			logo: 'https://www.staka-premium.com/template/images/logo_staka.svg',
			projects: [{},{}],
		},
		{
			id: 2,
			name: 'Van Laar',
			logo: 'http://www.techniekwerkt.nl/image/logo/van-laar-maritime-bv-5321.jpeg',
			projects: [{},{}],
		},
		{
			id: 3,
			name: 'Chocakack',
			logo: 'http://www.havelaar-verpakkingen.nl/media/wysiwyg/Chocapack_logo_PMS_DEFCS2.jpg',
			projects: [{},{}],
		}
	],

	projects: [
{
			id: 1,
			clientId: 0,
			date: new Date(2016, 11, 17),
			name: 'Lidl 20 app',
			projectImage: 'https://upload.wikimedia.org/wikipedia/en/thumb/b/be/Lidl_Stiftung_%26_Co._KG_logo.svg/1024px-Lidl_Stiftung_%26_Co._KG_logo.svg.png'
		},
		{
			id: 2,
			clientId: 1,
			date: new Date(2016, 11, 17),
			name: 'Staka premium dakluiken',
			projectImage: 'https://www.staka-premium.com/template/images/logo_staka.svg'
		},
		{
			id: 3,
			clientId: 2,
			date: new Date(2016, 11, 17),
			name: 'Van Laar livefeed',
			projectImage: 'http://www.techniekwerkt.nl/image/logo/van-laar-maritime-bv-5321.jpeg'
		},
		{
			id: 4,
			clientId: 3,
			date: new Date(2016, 11, 17),
			name: 'Chocapack redesign',
			projectImage: 'http://www.havelaar-verpakkingen.nl/media/wysiwyg/Chocapack_logo_PMS_DEFCS2.jpg'
		},
				{
			id: 5,
			clientId: 0,
			date: new Date(2016, 11, 17),
			name: 'Lidl hub',
			projectImage: 'https://upload.wikimedia.org/wikipedia/en/thumb/b/be/Lidl_Stiftung_%26_Co._KG_logo.svg/1024px-Lidl_Stiftung_%26_Co._KG_logo.svg.png'
		},
		{
			id: 6,
			clientId: 1,
			date: new Date(2016, 11, 17),
			name: 'Lidl 20 app',
			projectImage: 'https://upload.wikimedia.org/wikipedia/en/thumb/b/be/Lidl_Stiftung_%26_Co._KG_logo.svg/1024px-Lidl_Stiftung_%26_Co._KG_logo.svg.png'
		},
		{
			id: 7,
			clientId: 1,
			date: new Date(2016, 11, 17),
			name: 'Staka premium dakluiken',
			projectImage: 'https://www.staka-premium.com/template/images/logo_staka.svg'
		},
		{
			id: 8,
			clientId: 2,
			date: new Date(2017, 03, 17),
			name: 'Van Laar livefeed',
			projectImage: 'http://www.techniekwerkt.nl/image/logo/van-laar-maritime-bv-5321.jpeg'
		},
		{
			id: 9,
			clientId: 3,
			date: new Date(2017, 03, 17),
			name: 'Chocapack redesign',
			projectImage: 'http://www.havelaar-verpakkingen.nl/media/wysiwyg/Chocapack_logo_PMS_DEFCS2.jpg'
		},
				{
			id: 10,
			clientId: 0,
			date: new Date(2017, 03, 17),
			name: 'Lidl hub',
			projectImage: 'https://upload.wikimedia.org/wikipedia/en/thumb/b/be/Lidl_Stiftung_%26_Co._KG_logo.svg/1024px-Lidl_Stiftung_%26_Co._KG_logo.svg.png'
		},
	],

	accounts: [
		{
			id: 0,
			name: 'test',
			fullName: 'Test Account',
			password: 'secret',
			role: 0,
			projects: [1,2,3,4,5],
			recentProjects: [1,3,4]
		},
		{
			id: 1,
			name: 'leander',
			fullName: 'Leander van Baekel',
			password: 'test',
			role: 0,
			projects: [6,7,8,9,10],
			recentProjects: [7,8,10]
		}
	],

	roles: [
		{
			id: 0,
			name: 'su'
		}
	],
};

// module.exports = clients;
// module.exports = projects;
// module.exports = accounts;
// module.exports = roles;
