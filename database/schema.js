const mongooseGallery = require('mongoose');
const mongooseStore = require('mongoose');

const gallerySchema = new mongooseGallery.Schema({
  title: String,
  description: String
});

const storeSchema = new mongooseStore.Schema({
  title: String,
  description: String,
  width: Number,
  height: Number,
  price: Number 
})

module.exports.gallerySchema = gallerySchema;
module.exports.storeSchema = storeSchema;
