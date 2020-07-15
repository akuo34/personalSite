const router = require('express').Router();
const controller = require('./controller');

router
  .route('/gallery')
  .get(controller.getGallery)
  .post(controller.postGallery)

router
  .route('/gallery/:_id')
  .put(controller.putGallery)
  .delete(controller.deleteGallery)

router
  .route('/gallery/photo/:_id')
  .put(controller.putGalleryPhoto)

router
  .route('/murals')
  .get(controller.getMural)
  .post(controller.postMural)

router
  .route('/murals/:_id')
  .put(controller.putMural)
  .delete(controller.deleteMural)

router
  .route('/murals/photo/:_id')
  .put(controller.putMuralPhoto)

router
  .route('/about')
  .get(controller.getAbout)
  .post(controller.postAbout)

router
  .route('/about/:_id')
  .put(controller.putAbout)
  .delete(controller.deleteAbout)

router
  .route('/about/portrait/:_id')
  .put(controller.putAboutPortrait)

router
  .route('/about/banner/:_id')
  .put(controller.putAboutBanner)

router
  .route('/events')
  .get(controller.getEvent)
  .post(controller.postEvent)

router
  .route('/events/:_id')
  .put(controller.putEvent)
  .delete(controller.deleteEvent)

router
  .route('/events/photo/:_id')
  .put(controller.putEventPhoto)
  
router
  .route('/store')
  .get(controller.getStore)
  .post(controller.postStore)

router
  .route('/store/:_id')
  .put(controller.putStore)
  .delete(controller.deleteStore)

router
  .route('/store/photo/:_id')
  .put(controller.putStorePhoto)

// router
//   .route('/orders')
  
router
  .route('/orders')
  .get(controller.getOrder)
  .post(controller.postOrder)
  .put(controller.putOrder)
  .delete(controller.deleteOrder)

router
  .route('/contact')
  .get(controller.getContact)
  .post(controller.postContact)

router
  .route('/contact/:_id')
  .put(controller.putContact)
  .delete(controller.deleteContact)

module.exports = router;