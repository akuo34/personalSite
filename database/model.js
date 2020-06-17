const { galleryItem, muralItem, aboutItem, eventItem, storeItem, contactItem, mailingListItem } = require('./');

module.exports = {
  getGallery: () => galleryItem.find(),
  postGallery: (title, description, fireBaseUrl, date, filename) => galleryItem.create({ title, description, fireBaseUrl, date, filename }),
  putGallery: (title, description, _id) => {
    let object = { title, description };
    for (let key in object) {
      if (!object[key]) {
        delete object[key];
      }
    }   
    return galleryItem.findOneAndUpdate({ _id }, object)
  },
  putGalleryPhoto: (fireBaseUrl, filename, _id) => galleryItem.findOneAndUpdate({ _id }, { fireBaseUrl, filename }),
  deleteGallery: (_id) => galleryItem.findByIdAndDelete({ _id }),
  getMural: () => muralItem.find(),
  postMural: (title, description, fireBaseUrl, date, filename) => muralItem.create({ title, description, fireBaseUrl, date, filename }),
  putMural: (title, description, _id) => {
    let object = { title, description };
    for (let key in object) {
      if (!object[key]) {
        delete object[key];
      }
    }
    return muralItem.findOneAndUpdate({ _id }, object)
  },
  putMuralPhoto: (fireBaseUrl, filename, _id) => muralItem.findOneAndUpdate({ _id }, { fireBaseUrl, filename }),
  deleteMural: (_id) => muralItem.findByIdAndDelete({ _id }),
  getAbout: () => aboutItem.find(),
  postAbout: (portraitFireBaseUrl, bio, portraitFilename, bannerFireBaseUrl, bannerFilename) => aboutItem.create({ portraitFireBaseUrl, bio, portraitFilename, bannerFireBaseUrl, bannerFilename }),
  putAbout: (bio, _id) => aboutItem.findOneAndUpdate({ _id }, { bio }),
  putAboutPortrait: (portraitFireBaseUrl, portraitFilename, _id) => aboutItem.findOneAndUpdate({ _id }, { portraitFireBaseUrl, portraitFilename }),
  putAboutBanner: (bannerFireBaseUrl, bannerFilename, _id) => aboutItem.findOneAndUpdate({ _id }, { bannerFireBaseUrl, bannerFilename }),
  deleteAbout: (_id) => aboutItem.findOneAndDelete({ _id }),
  getEvent: () => eventItem.find().sort([['start', 1]]),
  postEvent: (fireBaseUrl, title, resource, location, startDate, endDate, startTime, endTime, allDay, filename) => eventItem.create({ fireBaseUrl, title, resource, location, startDate, endDate, startTime, endTime, allDay, filename }),
  putEvent: (title, resource, location, startDate, endDate, startTime, endTime, allDay, _id) => {

    let object = { title, resource, location, startDate, endDate, startTime, endTime, allDay };
    for (let key in object) {
      if (!object[key]) {
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
      if (!object[key]) {
        delete object[key];
      }
    }
    return storeItem.findByIdAndUpdate({ _id }, object);
  },
  putStorePhoto: (images, _id) => storeItem.findByIdAndUpdate({ _id }, { images }),
  deleteStore: (_id) => storeItem.findByIdAndDelete({ _id }),
  getContact: () => contactItem.find(),
  postContact: (name, email, phone, instagram) => contactItem.create({ name, email, phone, instagram }),
  putContact: (name, email, phone, instagram, _id) => {

    let object = { name, email, phone, instagram };
    for (let key in object) {
      if(!object[key]) {
        delete object[key];
      }
    }
    return contactItem.findByIdAndUpdate({ _id }, object);
  },
  deleteContact: (_id) => contactItem.findByIdAndDelete({ _id })
};

