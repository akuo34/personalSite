import React, { useState, useEffect } from 'react';
import { storage } from '../firebase/firebase';
import Axios from 'axios';

const GalleryManager = () => {

  const [imageAsFile, setImageAsFile] = useState('');
  const [urlList, setUrlList] = useState([]);

  useEffect(() => {
    Axios
      .get('/admin/api/gallery')
      .then(response => {

        let array = response.data;

        if (urlList.length !== array.length) {
          setUrlList(array);
        }
      })
      .catch(err => console.error(err));
  }, [urlList]);

  const handleImageAsFile = (e) => {
    const image = e.target.files[0];
    setImageAsFile(imageFile => image)
  };

  const getImages = () => {
    Axios
      .get('/admin/api/gallery')
      .then(response => {

        let array = response.data;

        setUrlList(array);
      })
      .catch(err => console.error(err));
  }

  const handleFireBaseUpload = (e) => {
    e.preventDefault();

    const description = e.target.description.value;
    const title = e.target.title.value;

    console.log('start of upload');

    if (imageAsFile === '') {
      console.error(`not an image, the image file is a ${typeof (imageAsFile)}`);
    };

    let randomizer = (Math.floor(Math.random() * (1000 - 1)) + 1).toString();
    let split = imageAsFile.name.split('.');
    const filename = split[0] + randomizer + split[1];

    const uploadTask = storage.ref(`/images/${filename}`).put(imageAsFile);

    uploadTask.on('state_changed', (snapshot) => {
      console.log(snapshot)
    }, (err) => {
      console.log(err);
    }, () => {
      console.log('uploaded to firebase')
      storage.ref('images').child(filename).getDownloadURL()
        .then(fireBaseUrl => {

          let date = new Date()
          date = date.toDateString();

          const request = { fireBaseUrl, description, title, date, filename };

          Axios
            .post('/admin/api/gallery', request)
            .then(response => {
              getImages();
              console.log(response)
              setImageAsFile('');
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
      .put(`/admin/api/gallery/${_id}`, { title, description })
      .then(response => {
        getImages();
        console.log(response)
      })
      .catch(err => console.error(err));

    document.getElementById(_id).reset();
  }

  const deleteHandler = (e) => {
    const _id = e.target.value;
    const filename = e.target.dataset.filename;

    Axios
      .delete(`/admin/api/gallery/${_id}`)
      .then(response => {
        console.log(response);
        getImages();

        storage.ref('images').child(filename).delete()
          .then(() => console.log('deleted from firebase'))
          .catch(err => console.error(err));
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
              <div className="container-gallery-title-description" style={{"width":"300px"}}>
                <p>Title: {item.title}</p>
                <p>Description: {item.description}</p>
                <p>Date Uploaded: {item.date}</p>
                <form id={item._id} className="form-gallery-edit" onSubmit={editHandler} data-id={item._id}>
                  <input type="text" name="title" placeholder="Title"></input>
                  <textarea name="description" placeholder="Description" style={{"height":"50px"}}></textarea>
                  <div className="container-form-buttons">
                    <button type="submit">Edit</button>
                    <button value={item._id} onClick={deleteHandler} data-filename={item.filename}>Delete</button>
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