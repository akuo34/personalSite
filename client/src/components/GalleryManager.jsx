import React, { useState, useEffect } from 'react';
import { storage } from '../firebase/firebase';
import Axios from 'axios';

const GalleryManager = () => {

  const [imageAsFile, setImageAsFile] = useState('');
  const [urlList, setUrlList] = useState([]);

  useEffect(() => {
    Axios
      .get('/api/gallery')
      .then(response => {
        console.log(response.data);

        let array = response.data;

        if (urlList.length !== array.length) {
          setUrlList(array);
        }
      });
  }, [urlList]);

  const handleImageAsFile = (e) => {
    const image = e.target.files[0];
    image.description = 'test';
    image.title = 'test';
    setImageAsFile(imageFile => image)
  };

  const handleFireBaseUpload = (e) => {
    e.preventDefault();

    const description = e.target.description.value;
    const title = e.target.title.value;

    console.log('start of upload');

    if (imageAsFile === '') {
      console.error(`not an image, the image file is a ${typeof (imageAsFile)}`);
    };

    const uploadTask = storage.ref(`/images/${imageAsFile.name}`).put(imageAsFile);

    uploadTask.on('state_changed', (snapshot) => {
      console.log(snapshot)
    }, (err) => {
      console.log(err);
    }, () => {
      console.log('uploaded to firebase')
      storage.ref('images').child(imageAsFile.name).getDownloadURL()
        .then(fireBaseUrl => {
          console.log(fireBaseUrl);

          setUrlList(urlList);
          const request = { fireBaseUrl, description, title };

          Axios
            .post('/api/gallery', request)
            .then(res => console.log(res.data))
            .catch(err => console.error(err))

          Axios
            .get('/api/gallery')
            .then(response => {
              console.log(response.data);

              let array = response.data;

              if (urlList.length !== array.length) {
                setUrlList(array);
              }
            })
            .catch(err => console.error(err));
        });
    });

    document.getElementById('form-gallery').reset();
  };

  return (
    <div>
      <h3>Gallery Photos</h3>
      <form id="form-gallery" className="form-gallery" onSubmit={handleFireBaseUpload}>
        <h4 className="text-gallery-form-header">Upload new photo</h4>
        <input className="input-gallery-title" type="text" name="title" placeholder="Title" />
        <textarea className="input-gallery-description" name="description" placeholder="Description" />
        <div className="container-gallery-inputs">
          <input
            className="input-gallery-file"
            type="file"
            onChange={handleImageAsFile}
          />
          <button className="button-gallery-post">Upload to Gallery</button>
        </div>
      </form>
      {
        urlList.map(item => {
          return (
            <div className="container-gallery-row">
              <div className="container-gallery-img">
                <img className="img-gallery" src={item.fireBaseUrl} alt="gallery img" />
              </div>
              <div className="container-gallery-title-description">
                <p>Title: {item.title}</p>
                <p>Description: {item.description}</p>
              </div>
            </div>
          )
        })
      }
    </div>
  );
};

export default GalleryManager;