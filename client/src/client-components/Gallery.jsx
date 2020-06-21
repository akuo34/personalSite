import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import Slider from 'react-slick';
import $ from 'jquery';

const Gallery = () => {

  const [images, setImages] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(null);
  const [animation, setAnimation] = useState('hidden');
  const [firstSet25, setFirstSet25] = useState([]);

  useEffect(() => {
    getImages();

  }, []);

  $('body').on('contextmenu', 'img', (e) => {
    return false;
  })

  const getImages = () => {
    Axios
      .get('/admin/api/gallery')
      .then(response => {
        setImages(response.data);
        let first25 = response.data.slice(0, 10);
        setFirstSet25(first25);
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
      setAnimation('fadeout');
      setAnimation('hidden');
      document.body.style.overflow = "auto";
      document.html.style.overflow = "auto";
    } else {
      setShowModal(true);
      setTimeout(() => {
        setAnimation('active');
      }, 50);
      document.body.style.overflow = "hidden";
      document.html.style.overflow = "hidden";
    }
  }

  var settings = {
    arrows: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    initialSlide: 0,
    lazyLoad: 'ondemand'
  };

  return (
    <div>
      <div className={animation === "active" ? "modal-image-zoom zoom-active" : `modal-image-zoom ${animation}`} onClick={modalHandler}>
      </div>
      <div
        className={`container-modal-image ${animation}`}
        onClick={modalHandler}>
        <img
          className={`modal-image ${animation}`}
          src={currentImageIndex !== null ? images[currentImageIndex].fireBaseUrl : null}
        />
      </div>
      <div className="buffer"></div>
      <div className="container-gallery-page">
        <h2 className="subheader-client">art by candy kuo</h2>
        { images.length ?
        <Slider className="slider" {...settings}>
          {images.map(image => {
            return (
              <div className="container-image-gallery">
                <img
                  className="image-gallery"
                  onClick={modalHandler}
                  data-index={image.index}
                  src={image.fireBaseUrl}
                  alt="gallery-image"></img>
              </div>
            )
          })}
        </Slider> : null
        }
        <div className="container-grid">
          {firstSet25.map(image => {
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

export default Gallery;