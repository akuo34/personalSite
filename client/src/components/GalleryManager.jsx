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
            });
        });
    });
  };

  return (
    <div className="App">
      <h1>Gallery Photos</h1>
      <form onSubmit={handleFireBaseUpload}>
        <input
          type="file"
          onChange={handleImageAsFile}
        />
        <button>Upload to firebase</button>
        <textarea name="description">Description</textarea>
        <input type="text" name="title" />
      </form>
      {
        urlList.map(item => {
          return (
            <div>
              <img className="img-gallery" src={item.fireBaseUrl} alt="gallery img" />
              <p>{item.description}</p>
              <h3>{item.title}</h3>
            </div>
          )
        })
      }
    </div>
  );
};

export default GalleryManager;