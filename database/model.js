const { galleryItem, storeItem } = require('./');

module.exports = {
  getGallery: () => galleryItem.find(),
  getStore: () => storeItem.find()
}
