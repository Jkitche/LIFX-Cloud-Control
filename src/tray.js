const { remote } = require('electron');
const path = require('path');

const { Tray, Menu } = remote;
const trayIcon = new Tray(path.join(__dirname, './icon.png'));

const trayMenuTemplate = [
	{
		label: 'Empty Application',
		enabled: false,
	},
	{
		label: 'Settings',
		click: () => {
			console.log('Clicked on settings');
		},
	},
	{
		label: 'Help',
		click: () => {
			console.log('Clicked on Help');
		},
	},
];

const trayMenu = Menu.buildFromTemplate(trayMenuTemplate);
trayIcon.setContextMenu(trayMenu);
