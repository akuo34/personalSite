const model = require('../database/model');

module.exports = {
  getGallery: (req, res) => {
    model
      .getGallery()
      .then(data => res.status(200).send(data))
      .catch(err => res.status(404).send(err));
  },
  postGallery: (req, res) => {
    const { title, description, fireBaseUrl, date, filename } = req.body;
    model
      .postGallery(title, description, fireBaseUrl, date, filename)
      .then(() => res.status(201).send('posted to DB'))
      .catch(err => res.status(400).send(err));
  },
  putGallery: (req, res) => {
    const { title, description } = req.body;
    const { _id } = req.params;
    model
      .putGallery(title, description, _id)
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
    const { title, description, fireBaseUrl, date, filename } = req.body;
    model
      .postMural(title, description, fireBaseUrl, date, filename)
      .then(() => res.status(201).send('posted to DB'))
      .catch(err => res.status(400).send(err));
  },
  putMural: (req, res) => {
    const { title, description } = req.body;
    const { _id } = req.params;
    model
      .putMural(title, description, _id)
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
    const { fireBaseUrl, bio, filename } = req.body;
    model
      .postAbout(fireBaseUrl, bio, filename)
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
  putAboutPhoto: (req, res) => {
    const { fireBaseUrl, filename } = req.body;
    const { _id } = req.params;
    model
      .putAboutPhoto(fireBaseUrl, filename, _id)
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
    const { fireBaseUrl, title, description, location, time, date, filename } = req.body;
    model
      .postEvent(fireBaseUrl, title, description, location, time, date, filename)
      .then(() => res.status(201).send('posted to DB'))
      .catch(err => res.status(400).send(err));
  },
  putEvent: (req, res) => {
    const { title, description, location, time, date } = req.body;
    const { _id } = req.params;
    model
      .putEvent(title, description, location, time, date, _id)
      .then(() => res.status(200).send('updated to DB'))
      .catch(err => res.status(400).send(err));
  },
  putEventPhoto: (req, res) => {
    const { fireBaseUrl, filename } = req.body;
    const { _id } = req.params;
    model
      .putEventPhoto(fireBaseUrl, filename, _id)
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
    const { fireBaseUrl, filename, title, description, width, height, price, category, quantity } = req.body;
    model
      .postStore(fireBaseUrl, filename, title, description, width, height, price, category, quantity)
      .then(() => res.status(200).send('posted to DB'))
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
  deleteStore: (req, res) => {
    const { _id } = req.params;
    model
      .deleteStore(_id)
      .then(() => res.status(200).send('deleted from DB'))
      .catch(err => res.status(400).send(err));
  }
 }