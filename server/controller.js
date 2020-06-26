const model = require('../database/model');

module.exports = {
  getGallery: (req, res) => {
    model
      .getGallery()
      .then(data => res.status(200).send(data))
      .catch(err => res.status(404).send(err));
  },
  postGallery: (req, res) => {
    const { title, description, fireBaseUrl, date, filename, index } = req.body;
    model
      .postGallery(title, description, fireBaseUrl, date, filename, index)
      .then(() => res.status(201).send('posted to DB'))
      .catch(err => res.status(400).send(err));
  },
  putGallery: (req, res) => {
    const { title, description, index } = req.body;
    const { _id } = req.params;
    model
      .putGallery(title, description, _id, index)
      .then(() => res.status(200).send('updated to DB'))
      .catch(err => res.status(400).send(err));
  },
  putGalleryPhoto: (req, res) => {
    const { fireBaseUrl, filename } = req.body;
    const { _id } = req.params;
    model
      .putGalleryPhoto(fireBaseUrl, filename, _id)
      .then(() => res.status(200).send('updated to DB'))
      .catch(err => res.status(400).send(err));
  },
  deleteGallery: (req, res) => {
    const { _id } = req.params;
    model
      .deleteGallery(_id)
      .then(() => res.status(200).send('deleted from DB'))
      .catch(err => res.status(400).send(err));
  },
  getMural: (req, res) => {
    model
      .getMural()
      .then(data => res.status(200).send(data))
      .catch(err => res.status(404).send(err));
  },
  postMural: (req, res) => {
    const { title, description, fireBaseUrl, date, filename, index } = req.body;
    model
      .postMural(title, description, fireBaseUrl, date, filename, index)
      .then(() => res.status(201).send('posted to DB'))
      .catch(err => res.status(400).send(err));
  },
  putMural: (req, res) => {
    const { title, description, index } = req.body;
    const { _id } = req.params;
    model
      .putMural(title, description, _id, index)
      .then(() => res.status(200).send('updated to DB'))
      .catch(err => res.status(400).send(err));
  },
  putMuralPhoto: (req, res) => {
    const { fireBaseUrl, filename } = req.body;
    const { _id } = req.params;
    model
      .putMuralPhoto(fireBaseUrl, filename, _id)
      .then(() => res.status(200).send('updated to DB'))
      .catch(err => res.status(400).send(err));
  },
  deleteMural: (req, res) => {
    const { _id } = req.params;
    model
      .deleteMural(_id)
      .then(() => res.status(200).send('deleted from DB'))
      .catch(err => res.status(400).send(err));
  },
  getAbout: (req, res) => {
    model
      .getAbout()
      .then(data => res.status(200).send(data))
      .catch(err => res.status(404).send(err));
  },
  postAbout: (req, res) => {
    const { portraitFireBaseUrl, bio, portraitFilename, bannerFireBaseUrl, bannerFilename } = req.body;
    model
      .postAbout(portraitFireBaseUrl, bio, portraitFilename, bannerFireBaseUrl, bannerFilename)
      .then(() => res.status(201).send('posted to DB'))
      .catch(err => res.status(400).send(err));
  }, 
  putAbout: (req, res) => {
    const { bio } = req.body;
    const { _id } = req.params;
    model
      .putAbout(bio, _id)
      .then(() => res.status(200).send('updated to DB'))
      .catch(err => res.status(400).send(err));
  },
  putAboutPortrait: (req, res) => {
    const { portraitFireBaseUrl, portraitFilename } = req.body;
    const { _id } = req.params;
    model
      .putAboutPortrait(portraitFireBaseUrl, portraitFilename, _id)
      .then(() => res.status(200).send('updated to DB'))
      .catch(err => res.status(400).send(err));
  },
  putAboutBanner: (req, res) => {
    const { bannerFireBaseUrl, bannerFilename } = req.body;
    const { _id } = req.params;
    model
      .putAboutBanner(bannerFireBaseUrl, bannerFilename, _id)
      .then(() => res.status(200).send('updated to DB'))
      .catch(err => res.status(400).send(err));
  },
  deleteAbout: (req, res) => {
    const { _id } = req.params;
    model
      .deleteAbout(_id)
      .then(() => res.status(200).send('deleted from DB'))
      .catch(err => res.status(400).send(err));
  },
  getEvent: (req, res) => {
    model
      .getEvent()
      .then(data => res.status(200).send(data))
      .catch(err => res.status(404).send(err));
  },
  postEvent: (req, res) => {
    const { images, title, resource, location, startDate, endDate, startTime, endTime, allDay } = req.body;
    model
      .postEvent(images, title, resource, location, startDate, endDate, startTime, endTime, allDay)
      .then(() => res.status(201).send('posted to DB'))
      .catch(err => res.status(400).send(err));
  },
  putEvent: (req, res) => {
    const { title, resource, location, startDate, endDate, startTime, endTime, allDay } = req.body;
    const { _id } = req.params;
    model
      .putEvent(title, resource, location, startDate, endDate, startTime, endTime, allDay, _id)
      .then(() => res.status(200).send('updated to DB'))
      .catch(err => res.status(400).send(err));
  },
  putEventPhoto: (req, res) => {
    const { images } = req.body;
    const { _id } = req.params;
    model
      .putEventPhoto(images, _id)
      .then(() => res.status(200).send('updated to DB'))
      .catch(err => res.status(400).send(err));
  },
  deleteEvent: (req, res) => {
    const { _id } = req.params;
    model
      .deleteEvent(_id)
      .then(() => res.status(200).send('deleted from DB'))
      .catch(err => res.status(400).send(err));
  },
  getStore: (req, res) => {
    model
      .getStore()
      .then(data => res.status(200).send(data))
      .catch(err => res.status(404).send(err));
  },
  postStore: (req, res) => {
    const { images, title, description, width, height, price, category, quantity } = req.body;
    model
      .postStore(images, title, description, width, height, price, category, quantity)
      .then(() => res.status(201).send('posted to DB'))
      .catch(err => res.status(400).send(err));
  },
  putStore: (req, res) => {
    const { title, description, width, height, price, category, quantity } = req.body;
    const { _id } = req.params;
    model
      .putStore(title, description, width, height, price, category, quantity, _id)
      .then(() => res.status(200).send('updated to DB'))
      .catch(err => res.status(400).send(err));
  },
  putStorePhoto: (req, res) => {
    const { images } = req.body;
    const { _id } = req.params;
    model
      .putStorePhoto(images, _id)
      .then(() => res.status(200).send('updated to DB'))
      .catch(err => res.status(400).send(err));
  },
  deleteStore: (req, res) => {
    const { _id } = req.params;
    model
      .deleteStore(_id)
      .then(() => res.status(200).send('deleted from DB'))
      .catch(err => res.status(400).send(err));
  },
  getContact: (req, res) => {
    model
      .getContact()
      .then(data => res.status(200).send(data))
      .catch(err => res.status(404).send(err));
  },
  postContact: (req, res) => {
    const { name, email, phone, instagram } = req.body;
    model
      .postContact(name, email, phone, instagram)
      .then(() => res.status(201).send('posted to DB'))
      .catch(err => res.status(400).send(err));
  },
  putContact: (req, res) => {
    const { name, email, phone, instagram } = req.body;
    const { _id } = req.params;
    model
      .putContact(name, email, phone, instagram, _id)
      .then(() => res.status(200).send('updated to DB'))
      .catch(err => res.status(400).send(err));
  },
  deleteContact: (req, res) => {
    const { _id } = req.params;
    model
      .deleteContact(_id)
      .then(() => res.status(200).send('deleted from DB'))
      .catch(err => res.status(400).send(err));
  }
 }