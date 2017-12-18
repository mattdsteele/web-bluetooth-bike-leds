const beacon = require('eddystone-beacon');
const url = 'https://bit.ly/2017bdl';
beacon.advertiseUrl(url);
console.log('advertising');
