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
  }
  // getStore: (req, res) => {
  //   model
  //     .getStore()
  //     .then(data => res.status(200).send(data))
  //     .catch(err => res.status(404).send(err));
  // },
  // postStore: (req, res) => {
  //   res.status(201).send('response to POST request');
  // },
  // putStore: (req, res) => {
  //   res.status(200).send('response to PUT request');
  // },
  // deleteStore: (req, res) => {
  //   res.status(200).send('response to DELETE request');
  // },
 }