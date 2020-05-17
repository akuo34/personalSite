const { galleryItem, muralItem, storeItem } = require('./');
const fs = require('fs');

module.exports = {
  getGallery: () => galleryItem.find(),
  postGallery: (title, description, fireBaseUrl, date) => galleryItem.create({ title, description, fireBaseUrl, date }),
  putGallery: (title, description, _id) => galleryItem.findOneAndUpdate({ _id }, { title, description }),
  deleteGallery: (_id) => galleryItem.findByIdAndDelete({ _id }),
  getMural: () => muralItem.find(),
  postMural: (title, description, fireBaseUrl, date) => muralItem.create({ title, description, fireBaseUrl, date }),
  putMural: (title, description, _id) => muralItem.findOneAndUpdate({ _id }, { title, description }),
  deleteMural: (_id) => muralItem.findByIdAndDelete({ _id })
  // getStore: () => storeItem.find(),
};

