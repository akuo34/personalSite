import React, { useState, useEffect } from 'react';
import Axios from 'axios';

import Slider from 'react-animated-slider';

const Murals = () => {

  const [images, setImages] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(null);

  useEffect(() => {
    getImages();
  }, []);

  const getImages = () => {
    Axios
      .get('/admin/api/murals')
      .then(response => {
        setImages(response.data);
      })
      .catch(err => console.error(err));
  }

  const modalHandler = (e) => {
    const index = parseInt(e.target.dataset.index);

    if (index || index === 0) {
      setCurrentImageIndex(index);
    }

    if (showModal) {
      setShowModal(false);
      document.body.style.overflow = "auto";
      document.html.style.overflow = "auto";
    } else {
      setShowModal(true);
      document.body.style.overflow = "hidden";
      document.html.style.overflow = "hidden";
    }
  }

  return (
    <div>
      <div className={showModal ? "modal-image-zoom" : "modal-image-zoom-hidden"} onClick={modalHandler}>
      </div>
      <div
        className={showModal ? "container-modal-image" : "container-modal-image-hidden"}
        onClick={modalHandler}>
        <img
          className={showModal ? "modal-image" : "modal-image-hidden"}
          src={currentImageIndex !== null ? images[currentImageIndex].fireBaseUrl : null}
        />
      </div>
      <div className="buffer"></div>
      <div className="container-gallery-page">
        <h2 className="subheader-client">murals</h2>
        <Slider duration="800">
          {images.map((image, index) => {
            return (
              <div className="container-image-gallery" key={index}>
                <img className="image-gallery" src={image.fireBaseUrl} alt="gallery-image"></img>
              </div>
            )
          })}
        </Slider>
        <div className="container-grid">
          {images.map(image => {
            return (
              <div className="container-image-grid">
                <img 
                  className="image-grid"
                  onClick={modalHandler}
                  data-index={image.index}
                  src={image.fireBaseUrl} 
                  alt="gallery-image"></img>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Murals;