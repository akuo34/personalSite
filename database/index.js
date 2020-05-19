const mongoose = require('mongoose');

mongoose.set('useFindAndModify', false);

const schema = require('./schema.js');

mongoose.connect('mongodb://localhost:27017/statuskuo', {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', () => console.log('The Wild Ones connected'));

const galleryItem = mongoose.model('GalleryItem', schema.gallerySchema);
const muralItem = mongoose.model('MuralItem', schema.muralSchema);
const aboutItem = mongoose.model('AboutItem', schema.aboutSchema);
const eventItem = mongoose.model('EventItem', schema.eventSchema);
const storeItem = mongoose.model('StoreItem', schema.storeSchema);
const contactItem = mongoose.model('ContactItem', schema.contactSchema);
const mailingListItem = mongoose.model('MailingListItem', schema.mailingListSchema);

module.exports.galleryItem = galleryItem;
module.exports.muralItem = muralItem;
module.exports.aboutItem = aboutItem;
module.exports.eventItem = eventItem;
module.exports.storeItem = storeItem;
module.exports.contactItem = contactItem;
module.exports.mailingListItem = mailingListItem;
