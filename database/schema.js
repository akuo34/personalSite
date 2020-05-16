const mongooseGallery = require('mongoose');
// const mongooseStore = require('mongoose');

const gallerySchema = new mongooseGallery.Schema({
  id: Number,
  fireBaseUrl: String,
  title: String,
  description: String
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
// module.exports.storeSchema = storeSchema;
