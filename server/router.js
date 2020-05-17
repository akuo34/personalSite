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
  .route('/murals')
  .get(controller.getMural)
  .post(controller.postMural)

router
  .route('/murals/:_id')
  .put(controller.putMural)
  .delete(controller.deleteMural)

// router
//   .route('/store')
//   .get(controller.getStore)
//   .post(controller.postStore)

// router
//   .route('/store/:id')
//   .put(controller.putStore)
//   .delete(controller.deleteStore)

module.exports = router;