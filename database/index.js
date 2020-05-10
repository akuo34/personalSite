const mongooseGallery = require('mongoose');
const mongooseStore = require('mongoose');
const schema = require('./schema.js');

// Database for Gallery items
mongooseGallery.connect('mongodb://localhost:27017/gallery', {useNewUrlParser: true, useUnifiedTopology: true});

const dbGallery = mongooseGallery.connection;
dbGallery.on('error', console.error.bind(console, 'connection error'));
dbGallery.once('open', () => console.log('Gallery connected'));

const galleryItem = mongooseGallery.model('GalleryItem', schema.gallerySchema);

// Database for Store items
mongooseStore.connect('mongodb://localhost:27017/store', {useNewUrlParser: true, useUnifiedTopology: true});

const dbStore = mongooseStore.connection;
dbStore.on('error', console.error.bind(console, 'connection error'));
dbStore.once('open', () => console.log('Store connected'));

const storeItem = mongooseStore.model('StoreItem', schema.storeSchema);

module.exports.galleryItem = galleryItem;
module.exports.storeItem = storeItem;
