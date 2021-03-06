import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import $ from 'jquery';

const About = () => {

  const [images, setImages] = useState([]);

  useEffect(() => {
    getImages();
  }, []);

  $('body').on('contextmenu', 'img', (e) => {
    return false;
  })

  const getImages = () => {
    Axios
      .get('/admin/api/about')
      .then(response => {
        setImages(response.data);
      })
      .catch(err => console.error(err));
  }

  return (
    <div>
      <div className="buffer"></div>
      <div className="container-gallery-page">
        <h2 className="subheader-client">about the artist</h2>
        {images.length ?
          <div className="container-image-about">
            <img className="image-about" src={images[0].portraitFireBaseUrl} alt="about-image"></img>
            <p className="container-bio">{images[0].bio}</p>
          </div> : null
        }
      </div>
    </div>
  )
}

export default About;