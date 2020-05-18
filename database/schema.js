const mongooseGallery = require('mongoose');
const mongooseMural = require('mongoose');
const mongooseAbout = require('mongoose');
const mongooseEvent = require('mongoose');
const mongooseStore = require('mongoose');

const gallerySchema = new mongooseGallery.Schema({
  fireBaseUrl: String,
  title: String,
  description: String,
  date: String,
  filename: String
});

const muralSchema = new mongooseMural.Schema({
  fireBaseUrl: String,
  title: String,
  description: String,
  date: String,
  filename: String
});

const aboutSchema = new mongooseAbout.Schema({
  fireBaseUrl: String,
  bio: String,
  filename: String
});

const eventSchema = new mongooseEvent.Schema({
  fireBaseUrl: String,
  title: String,
  description: String,
  location: String,
  time: String,
  date: String,
  filename: String
});

const storeSchema = new mongooseStore.Schema({
  fireBaseUrl: String,
  filename: String,
  title: String,
  description: String,
  width: Number,
  height: Number,
  price: Number,
  category: String,
  quantity: Number,
})

module.exports.gallerySchema = gallerySchema;
module.exports.muralSchema = muralSchema;
module.exports.aboutSchema = aboutSchema;
module.exports.eventSchema = eventSchema;
module.exports.storeSchema = storeSchema;
