const mongoose = require('mongoose');

const gallerySchema = new mongoose.Schema({
  fireBaseUrl: String,
  title: String,
  description: String,
  date: String,
  filename: String,
  index: Number
});

const muralSchema = new mongoose.Schema({
  fireBaseUrl: String,
  title: String,
  description: String,
  date: String,
  filename: String,
  index: Number
});

const aboutSchema = new mongoose.Schema({
  portraitFireBaseUrl: String,
  bio: String,
  portraitFilename: String,
  bannerFireBaseUrl: String,
  bannerFilename: String
});

const eventSchema = new mongoose.Schema({
  fireBaseUrl: String,
  title: String,
  location: String,
  startDate: Date,
  endDate: Date,
  startTime: String,
  endTime: String,
  allDay: Boolean,
  resource: String,
  filename: String
});

const storeSchema = new mongoose.Schema({
  images: [{
    fireBaseUrl: String,
    filename: String,
  }],
  fireBaseUrl: String,
  filename: String,
  title: String,
  description: String,
  width: Number,
  height: Number,
  price: Number,
  category: String,
  quantity: Number,
});

const contactSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  instagram: String,
});

const mailingListSchema = new mongoose.Schema({
  name: String,
  email: String
});

module.exports.gallerySchema = gallerySchema;
module.exports.muralSchema = muralSchema;
module.exports.aboutSchema = aboutSchema;
module.exports.eventSchema = eventSchema;
module.exports.storeSchema = storeSchema;
module.exports.contactSchema = contactSchema;
module.exports.mailingListSchema = mailingListSchema;
