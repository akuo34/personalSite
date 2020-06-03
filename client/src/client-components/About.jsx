import React, { useState, useEffect } from 'react';
import Axios from 'axios';

const About = () => {

  const [images, setImages] = useState([]);

  useEffect(() => {
    getImages();
  }, [images]);

  const getImages = () => {
    Axios
      .get('/admin/api/about')
      .then(response => {
        if (response.data.length !== images.length) {
          setImages(response.data);
        }
      })
      .catch(err => console.error(err));
  }

  return (
    <div className="container-gallery-page">
      <h2 className="subheader-client">about the artist</h2>
      {images.length ?
        <div className="container-image-about">
          <img className="image-about" src={images[0].fireBaseUrl} alt="about-image"></img>
          <p className="container-bio">{images[0].bio}</p>
        </div> : null
      }
    </div>
  )
}

export default About;