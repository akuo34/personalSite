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

        let array = response.data;

        if (urlList.length !== array.length) {
          setUrlList(array);
        }
        console.log(urlList);
      });
  }, [urlList]);

  const handleImageAsFile = (e) => {
    const image = e.target.files[0];
    setImageAsFile(imageFile => image)
  };

  const getImages = () => {
    Axios
      .get('/api/gallery')
      .then(response => {

        let array = response.data;

        setUrlList(array);
      });
  }

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

          let date = new Date()
          date = date.toDateString();
          const request = { fireBaseUrl, description, title, date };

          Axios
            .post('/api/gallery', request)
            .then(() => {
              getImages();
              console.log('posted to database')
            })
            .catch(err => console.error(err))
        });
    });

    document.getElementById('form-gallery').reset();
  };

  const editHandler = (e) => {
    e.preventDefault();

    const _id = e.target.dataset.id;
    const title = e.target.title.value;
    const description = e.target.description.value;

    Axios
      .put(`/api/gallery/${_id}`, { title, description })
      .then(() => {
        getImages();
        console.log('updated to database')
      })
      .catch(err => console.error(err));

    document.getElementById(_id).reset();
  }

  const deleteHandler = (e) => {
    const _id = e.target.value;

    Axios
      .delete(`/api/gallery/${_id}`)
      .then(response => {
        getImages();

        // storage.ref('images').child(imageAsFile.name).getDownloadURL()
        console.log(response)
      })
      .catch(err => console.error(err));
  }

  return (
    <div>
      <h3>Gallery</h3>
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
                <p>Date Uploaded: {item.date}</p>
                <form id={item._id} className="form-gallery-edit" onSubmit={editHandler} data-id={item._id}>
                  <input type="text" name="title" placeholder="Title"></input>
                  <textarea name="description" placeholder="Description"></textarea>
                  <div className="container-form-buttons">
                    <button type="submit">Edit</button>
                    <button value={item._id} onClick={deleteHandler}>Delete</button>
                  </div>
                </form>
              </div>
            </div>
          )
        })
      }
    </div>
  );
};

export default GalleryManager;