const mongooseGallery = require('mongoose');
const mongooseMural = require('mongoose');
const mongooseAbout = require('mongoose');
// const mongooseStore = require('mongoose');

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
})
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
module.exports.aboutSchema = aboutSchema;
// module.exports.storeSchema = storeSchema;
