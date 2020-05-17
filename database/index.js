const mongooseGallery = require('mongoose');
const mongooseMural = require('mongoose');
const mongooseAbout = require('mongoose');
const mongooseEvent = require('mongoose');

mongooseGallery.set('useFindAndModify', false);
mongooseMural.set('useFindAndModify', false);
mongooseAbout.set('useFindAndModify', false);
mongooseEvent.set('useFindAndModify', false);
// const mongooseStore = require('mongoose');

const schema = require('./schema.js');

// Database for Gallery
mongooseGallery.connect('mongodb://localhost:27017/gallery', {useNewUrlParser: true, useUnifiedTopology: true});

const dbGallery = mongooseGallery.connection;
dbGallery.on('error', console.error.bind(console, 'connection error'));
dbGallery.once('open', () => console.log('Gallery connected'));

const galleryItem = mongooseGallery.model('GalleryItem', schema.gallerySchema);

// Database for Murals
mongooseMural.connect('mongodb://localhost:27017/murals', {useNewUrlParser: true, useUnifiedTopology: true});

const dbMural = mongooseMural.connection;
dbMural.on('error', console.error.bind(console, 'connection error'));
dbMural.once('open', () => console.log('Murals connected'));

const muralItem = mongooseMural.model('MuralItem', schema.muralSchema);

// Database for About section
mongooseAbout.connect('mongodb://localhost:27017/about', {useNewUrlParser: true, useUnifiedTopology: true});

const dbAbout = mongooseAbout.connection;
dbAbout.on('error', console.error.bind(console, 'connection error'));
dbAbout.once('open', () => console.log('About connected'));

const aboutItem = mongooseAbout.model('AboutItem', schema.aboutSchema);

// Database for Event section
mongooseAbout.connect('mongodb://localhost:27017/events', {useNewUrlParser: true, useUnifiedTopology: true});

const dbEvent = mongooseEvent.connection;
dbEvent.on('error', console.error.bind(console, 'connection error'));
dbEvent.once('open', () => console.log('Events connected'));

const eventItem = mongooseEvent.model('EventItem', schema.eventSchema);


// Database for Store items
// mongooseStore.connect('mongodb://localhost:27017/store', {useNewUrlParser: true, useUnifiedTopology: true});

// const dbStore = mongooseStore.connection;
// dbStore.on('error', console.error.bind(console, 'connection error'));
// dbStore.once('open', () => console.log('Store connected'));

// const storeItem = mongooseStore.model('StoreItem', schema.storeSchema);

module.exports.galleryItem = galleryItem;
module.exports.muralItem = muralItem;
module.exports.aboutItem = aboutItem;
module.exports.eventItem = eventItem;
// module.exports.storeItem = storeItem;
