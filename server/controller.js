const model = require('../database/model');

module.exports = {
  getGallery: (req, res) => {
    model
      .getGallery()
      .then(data => res.status(200).send(data))
      .catch(err => res.status(404).send(err));
  },
  postGallery: (req, res) => {
    const { title, description, fireBaseUrl } = req.body;
    model
      .postGallery(title, description, fireBaseUrl)
      .then(() => res.status(201).send('posted to DB'))
      .catch(err => res.status(400).send(err));
  },
  // putGallery: (req, res) => {
  //   res.status(200).send('response to PUT request');
  // },
  // deleteGallery: (req, res) => {
  //   res.status(200).send('response to DELETE request');
  // },
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