const router = require('express').Router();
const controller = require('./controller');

router
  .route('/gallery')
  .get(controller.getGallery)
  .post(controller.postGallery)

// router
//   .route('/uploadbase')
//   .post((req, res, next) => {
//     const newImage = new Image({
//       imageName: req.body.imageName,
//       imageData: req.body.imageData
//     });
    
//     newImage.save()
//       .then(result => {
//         res.status(200).json({
//           success: true,
//           document: result
//         });
//       })
//       .catch(err => next(err));
//   });

// router
//   .route('/gallery/:id')
//   .put(controller.putGallery)
//   .delete(controller.deleteGallery)

// router
//   .route('/store')
//   .get(controller.getStore)
//   .post(controller.postStore)

// router
//   .route('/store/:id')
//   .put(controller.putStore)
//   .delete(controller.deleteStore)

module.exports = router;