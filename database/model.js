const { galleryItem, muralItem, aboutItem, storeItem } = require('./');
const fs = require('fs');

module.exports = {
  getGallery: () => galleryItem.find(),
  postGallery: (title, description, fireBaseUrl, date) => galleryItem.create({ title, description, fireBaseUrl, date }),
  putGallery: (title, description, _id) => galleryItem.findOneAndUpdate({ _id }, { title, description }),
  deleteGallery: (_id) => galleryItem.findByIdAndDelete({ _id }),
  getMural: () => muralItem.find(),
  postMural: (title, description, fireBaseUrl, date) => muralItem.create({ title, description, fireBaseUrl, date }),
  putMural: (title, description, _id) => muralItem.findOneAndUpdate({ _id }, { title, description }),
  deleteMural: (_id) => muralItem.findByIdAndDelete({ _id }),
  getAbout: () => aboutItem.find(),
  postAbout: (fireBaseUrl, bio) => aboutItem.create({ fireBaseUrl, bio }),
  putAbout: (bio, _id) => aboutItem.findOneAndUpdate({ _id }, { bio }),
  putAboutPhoto: (fireBaseUrl, _id) => aboutItem.findOneAndUpdate({ _id }, { fireBaseUrl }),
  deleteAbout: (_id) => aboutItem.findOneAndDelete({ _id })
  // getStore: () => storeItem.find(),
};

