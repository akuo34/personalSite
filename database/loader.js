const fs = require('fs');
const { galleryItem, muralItem, aboutItem, eventItem, storeItem, contactItem, mailingListItem } = require('./');

galleryItem.deleteMany({}, () => {
  console.log('deleted gallery');

  fs.readFile('database/data/galleryData.csv', (err, data) => {
    if (err) {
      throw err;
    } else {
      let array = data.toString().split('\n');

      if (!array[array.length - 1]) {
        array.pop();
      }

      array.forEach(item => {
        let object = JSON.parse(item);
        galleryItem.create(object)
          .catch(err => console.error(err));
      })
      console.log('uploaded to gallery');
    }
  })
});

muralItem.deleteMany({}, () => {
  console.log('deleted murals');

  fs.readFile('database/data/muralsData.csv', (err, data) => {
    if (err) {
      throw err;
    } else {
      let array = data.toString().split('\n');

      if (!array[array.length - 1]) {
        array.pop();
      }

      array.forEach(item => {
        let object = JSON.parse(item);
        muralItem.create(object)
          .catch(err => console.error(err));
      })
      console.log('uploaded to murals');
    }
  })
});



