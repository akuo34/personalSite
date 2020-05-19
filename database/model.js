const { galleryItem, muralItem, aboutItem, eventItem, storeItem, contactItem, mailingListItem } = require('./');

module.exports = {
  getGallery: () => galleryItem.find(),
  postGallery: (title, description, fireBaseUrl, date, filename) => galleryItem.create({ title, description, fireBaseUrl, date, filename }),
  putGallery: (title, description, _id) => {
    let object = { title, description };
    for (let key in object) {
      if (object[key] === '') {
        delete object[key];
      }
    }   
    return galleryItem.findOneAndUpdate({ _id }, object)
  },
  deleteGallery: (_id) => galleryItem.findByIdAndDelete({ _id }),
  getMural: () => muralItem.find(),
  postMural: (title, description, fireBaseUrl, date, filename) => muralItem.create({ title, description, fireBaseUrl, date, filename }),
  putMural: (title, description, _id) => {
    let object = { title, description };
    for (let key in object) {
      if (object[key] === '') {
        delete object[key];
      }
    }
    return muralItem.findOneAndUpdate({ _id }, object)
  },
  deleteMural: (_id) => muralItem.findByIdAndDelete({ _id }),
  getAbout: () => aboutItem.find(),
  postAbout: (fireBaseUrl, bio, filename) => aboutItem.create({ fireBaseUrl, bio, filename }),
  putAbout: (bio, _id) => aboutItem.findOneAndUpdate({ _id }, { bio }),
  putAboutPhoto: (fireBaseUrl, filename, _id) => aboutItem.findOneAndUpdate({ _id }, { fireBaseUrl, filename }),
  deleteAbout: (_id) => aboutItem.findOneAndDelete({ _id }),
  getEvent: () => eventItem.find().sort([['date', 1]]),
  postEvent: (fireBaseUrl, title, description, location, time, date, filename) => eventItem.create({ fireBaseUrl, title, description, location, time, date, filename }),
  putEvent: (title, description, location, time, date, _id) => {

    let object = { title, description, location, time, date };
    for (let key in object) {
      if (object[key] === '') {
        delete object[key];
      }
    }
    return eventItem.findOneAndUpdate({ _id }, object);
  },
  putEventPhoto: (fireBaseUrl, filename, _id) => eventItem.findOneAndUpdate({ _id }, { fireBaseUrl, filename }),
  deleteEvent: (_id) => eventItem.findOneAndDelete({ _id }),
  getStore: () => storeItem.find(),
  postStore: (images, title, description, width, height, price, category, quantity) => storeItem.create({ images, title, description, width, height, price, category, quantity }),
  putStore: (title, description, width, height, price, category, quantity, _id) => {

    let object = { title, description, width, height, price, category, quantity };
    for (let key in object) {
      if (object[key] === '') {
        delete object[key];
      }
    }
    return storeItem.findByIdAndUpdate({ _id }, object);
  },
  putStorePhoto: (images, _id) => storeItem.findByIdAndUpdate({ _id }, { images }),
  deleteStore: (_id) => storeItem.findByIdAndDelete({ _id })
};

