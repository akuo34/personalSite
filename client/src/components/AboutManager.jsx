import React, { useState, useEffect } from 'react';
import { storage } from '../firebase/firebase';
import Axios from 'axios';

const AboutManager = () => {

  const [imageAsFile, setImageAsFile] = useState('');
  const [urlList, setUrlList] = useState([]);
  const [allowUpload, setAllowUpload] = useState(false);

  useEffect(() => {
    Axios
      .get('/api/about')
      .then(response => {

        let array = response.data;

        if (!array.length) {
          setAllowUpload(true);
        }

        if (urlList.length !== array.length) {
          setUrlList(array);
        }
      });
  }, [urlList]);

  const handleImageAsFile = (e) => {
    const image = e.target.files[0];
    setImageAsFile(imageFile => image)
  };

  const getBio = () => {
    Axios
      .get('/api/about')
      .then(response => {

        let array = response.data;

        setUrlList(array);
      });
  }

  const handleFireBaseUpload = (e) => {
    e.preventDefault();

    const bio = e.target.bio.value;

    console.log('start of upload');

    if (imageAsFile === '') {
      console.error(`not an image, the image file is a ${typeof (imageAsFile)}`);
    };

    const uploadTask = storage.ref(`/about/${imageAsFile.name}`).put(imageAsFile);

    uploadTask.on('state_changed', (snapshot) => {
      console.log(snapshot)
    }, (err) => {
      console.log(err);
    }, () => {
      console.log('uploaded to firebase')
      storage.ref('about').child(imageAsFile.name).getDownloadURL()
        .then(fireBaseUrl => {

          const request = { fireBaseUrl, bio };

          Axios
            .post('/api/about', request)
            .then(() => {
              getBio();
              setAllowUpload(false);
              console.log('posted to database')
            })
            .catch(err => console.error(err))
        });
    });

    document.getElementById('form-about').reset();
  };

  const handleChangePhoto = (e) => {
    e.preventDefault();

    const _id = e.target.dataset.id;

    console.log('start of upload');

    if (imageAsFile === '') {
      console.error(`not an image, the image file is a ${typeof (imageAsFile)}`);
    };

    const uploadTask = storage.ref(`/about/${imageAsFile.name}`).put(imageAsFile);

    uploadTask.on('state_changed', (snapshot) => {
      console.log(snapshot)
    }, (err) => {
      console.log(err);
    }, () => {
      console.log('uploaded to firebase')
      storage.ref('about').child(imageAsFile.name).getDownloadURL()
        .then(fireBaseUrl => {

          const request = { fireBaseUrl };

          Axios
            .put(`/api/about/photo/${_id}`, request)
            .then(() => {
              getBio();
              console.log('posted to database')
            })
            .catch(err => console.error(err))
        });
    });

    document.getElementById('form-edit-photo').reset();
  };

  const editHandler = (e) => {
    e.preventDefault();

    const _id = e.target.dataset.id;
    const bio = e.target.bio.value;

    Axios
      .put(`/api/about/${_id}`, { bio })
      .then(() => {
        getBio();
        console.log('updated to database')
      })
      .catch(err => console.error(err));

    document.getElementById(_id).reset();
  }

  const deleteHandler = (e) => {
    const _id = e.target.value;

    Axios
      .delete(`/api/about/${_id}`)
      .then(response => {
        getBio();
        console.log(response)
      })
      .catch(err => console.error(err));
  }

  return (
    <div>
      <h3>About</h3>
      {allowUpload ?
        <form id="form-about" className="form-gallery" onSubmit={handleFireBaseUpload}>
          <h4 className="text-gallery-form-header">Create your bio</h4>
          <textarea className="input-gallery-description" name="bio" placeholder="About me" />
          <div className="container-gallery-inputs">
            <input
              className="input-gallery-file"
              type="file"
              onChange={handleImageAsFile}
            />
            <button className="button-gallery-post">Upload to About</button>
          </div>
        </form> : null
      }
      {
        urlList.map(item => {
          return (
            <div className="container-gallery-row">
              <div className="container-gallery-img">
                <img className="img-gallery" src={item.fireBaseUrl} alt="gallery img" />
              </div>
              <div className="container-gallery-title-description">
                <p>Bio: {item.bio}</p>
                <form id={item._id} className="form-gallery-edit" onSubmit={editHandler} data-id={item._id}>
                  <textarea name="bio" placeholder="Bio"></textarea>
                  <div className="container-form-buttons">
                    <button type="submit">Edit</button>
                    <button value={item._id} onClick={deleteHandler}>Delete</button>
                  </div>
                </form>
                <form id="form-edit-photo" onSubmit={handleChangePhoto} data-id={item._id}>
                  <div>Change photo</div>
                  <div>
                    <input
                      type="file"
                      onChange={handleImageAsFile}
                    />
                    <button>Upload photo</button>
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

export default AboutManager;