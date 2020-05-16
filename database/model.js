const { galleryItem, storeItem } = require('./');
const fs = require('fs');

module.exports = {
  getGallery: () => galleryItem.find(),
  // getStore: () => storeItem.find(),
  postGallery: (title, description, fireBaseUrl) => galleryItem.create({ title, description, fireBaseUrl })
};

