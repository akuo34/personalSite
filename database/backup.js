const fs = require('fs');
const { galleryItem, muralItem, aboutItem, eventItem, storeItem, contactItem, mailingListItem } = require('./');

let wStreamGallery = fs.createWriteStream('database/data/galleryData.csv');
let wStreamMurals = fs.createWriteStream('database/data/muralsData.csv');

galleryItem.find()
  .then(response => {
    response.forEach(item => {
      wStreamGallery.write(JSON.stringify(item) + '\n');
    })
    console.log('backed up gallery')
  })
  .catch(err => console.error(err));

muralItem.find()
  .then(response => {
    response.forEach(item => {
      wStreamMurals.write(JSON.stringify(item) + '\n');
    })
    console.log('backed up murals')
  })
  .catch(err => console.error(err));