const mongooseGallery = require('mongoose');
const mongooseMural = require('mongoose');
// const mongooseStore = require('mongoose');

const gallerySchema = new mongooseGallery.Schema({
  id: Number,
  fireBaseUrl: String,
  title: String,
  description: String,
  date: String
});

const muralSchema = new mongooseMural.Schema({
  id: Number,
  fireBaseUrl: String,
  title: String,
  description: String,
  date: String
});
// const storeSchema = new mongooseStore.Schema({
//   img: { data: Buffer, contentType: String },
//   title: String,
//   description: String,
//   width: Number,
//   height: Number,
//   price: Number 
// })

module.exports.gallerySchema = gallerySchema;
module.exports.muralSchema = muralSchema;
// module.exports.storeSchema = storeSchema;
