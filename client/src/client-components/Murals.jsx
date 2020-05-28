import React, { useState, useEffect } from 'react';
import Axios from 'axios';

import Slider from 'react-animated-slider';

const Murals = () => {

  const [images, setImages] = useState([]);

  useEffect(() => {
    getImages();
  }, [images]);

  const getImages = () => {
    Axios
      .get('/admin/api/murals')
      .then(response => {
        if (response.data.length !== images.length) {
          setImages(response.data);
        }
      })
      .catch(err => console.error(err));
  }

  return (
    <div>
      <div className="container-main-header">
        <h1 className="header-main">the wild ones</h1>
        <h2 className="subheader-main">murals</h2>
      </div>
      <Slider>
        {images.map((image, index) => {
          return (
            <div className="container-image-gallery" key={index}>
              <img className="image-gallery" src={image.fireBaseUrl} alt="gallery-image"></img>
            </div>
          )
        })}
      </Slider>
    </div>
  )
}

export default Murals;