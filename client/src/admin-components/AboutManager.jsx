import React, { useState, useEffect } from 'react';
import { storage } from '../firebase/firebase';
import Axios from 'axios';
import FadeLoader from 'react-spinners/FadeLoader';

const AboutManager = () => {

  const [imageAsFile, setImageAsFile] = useState('');
  const [urlList, setUrlList] = useState([]);
  const [allowUpload, setAllowUpload] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    Axios
      .get('/admin/api/about')
      .then(response => {

        let array = response.data;

        if (!array.length) {
          setAllowUpload(true);
        }

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

  const getBio = () => {
    Axios
      .get('/admin/api/about')
      .then(response => {
        let array = response.data;
        
        setUrlList(array);
        setLoading(false);
      })
      .catch(err => console.error(err));
  }

  const handleFireBaseUpload = (e) => {
    e.preventDefault();

    setLoading(true);

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
        .then(portraitFireBaseUrl => {

          let portraitFilename = imageAsFile.name;
          let bannerFireBaseUrl = '';
          let bannerFilename = '';

          const request = { portraitFireBaseUrl, bio, portraitFilename, bannerFireBaseUrl, bannerFilename };

          Axios
            .post('/admin/api/about', request)
            .then(response => {
              getBio();
              setAllowUpload(false);
              console.log(response);
              setImageAsFile('');
            })
            .catch(err => console.error(err))
        });
    });

    document.getElementById('form-about').reset();
  };

  const handleChangePortrait = (e) => {
    e.preventDefault();

    setLoading(true);

    const _id = e.target.dataset.id;
    let portraitFilename = e.target.dataset.filename;

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
        .then(portraitFireBaseUrl => {

          storage.ref('about').child(portraitFilename).delete()
            .then(() => console.log('deleted from firebase'))
            .catch(err => console.error(err));

          portraitFilename = imageAsFile.name;

          const request = { portraitFireBaseUrl, portraitFilename };
          Axios
            .put(`/admin/api/about/portrait/${_id}`, request)
            .then(response => {
              getBio();
              console.log(response);
              setImageAsFile('');
            })
            .catch(err => console.error(err))

        });
    });

    document.getElementById('form-edit-portrait').reset();
  };

  const handleChangeBanner = (e) => {
    e.preventDefault();

    setLoading(true);

    const _id = e.target.dataset.id;
    let oldBannerFilename = e.target.dataset.filename;

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
        .then(bannerFireBaseUrl => {

          if (oldBannerFilename) {
            storage.ref('about').child(oldBannerFilename).delete()
              .then(() => {
                console.log('deleted from firebase');

                let bannerFilename = imageAsFile.name;
                const request = { bannerFireBaseUrl, bannerFilename };

                Axios
                  .put(`/admin/api/about/banner/${_id}`, request)
                  .then(response => {
                    getBio();
                    window.location.reload();
                    console.log(response);
                    setImageAsFile('');
                  })
                  .catch(err => console.error(err))
              })
              .catch(err => console.error(err));
          } else {

            let bannerFilename = imageAsFile.name;
            const request = { bannerFireBaseUrl, bannerFilename };

            Axios
              .put(`/admin/api/about/banner/${_id}`, request)
              .then(response => {
                getBio();
                setLoading(false);
                window.location.reload();
                console.log(response);
                setImageAsFile('');
              })
              .catch(err => console.error(err))
          }
        });
    });

    document.getElementById('form-edit-banner').reset();
  };

  const editHandler = (e) => {
    e.preventDefault();

    const _id = e.target.dataset.id;
    const bio = e.target.bio.value;

    Axios
      .put(`/admin/api/about/${_id}`, { bio })
      .then(response => {
        getBio();
        console.log(response)
      })
      .catch(err => console.error(err));

    document.getElementById(_id).reset();
  }

  const deleteHandler = (e) => {
    const _id = e.target.value;
    const portraitFilename = e.target.dataset.portraitfilename;
    const bannerFilename = e.target.dataset.bannerfilename;
    console.log(portraitFilename);
    console.log(bannerFilename);

    Axios
      .delete(`/admin/api/about/${_id}`)
      .then(response => {
        console.log(response)
        getBio();
        window.location.reload();

        storage.ref('about').child(portraitFilename).delete()
          .then(() => console.log('deleted from firebase'))
          .catch(err => console.error(err));

        storage.ref('about').child(bannerFilename).delete()
          .then(() => console.log('deleted from firebase'))
          .catch(err => console.error(err));
      })
      .catch(err => console.error(err));
  }

  return (
    <div className="body-gallery">
      <h3>About</h3>
      <div className="container-loader">
        <FadeLoader
          size={150}
          color={"#645D45"}
          loading={loading}
        />
      </div>
      {allowUpload ?
        <form id="form-about" className="form-gallery" onSubmit={handleFireBaseUpload}>
          <h4 className="text-gallery-form-header">Create your bio</h4>
          <textarea className="input-landing" name="bio" placeholder="About me" style={{ "height": "90px" }} />
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
            <div className="container-about-render">
              <div className="container-gallery-row">
                <div className="container-gallery-img">
                  <img className="img-gallery" src={item.portraitFireBaseUrl} alt="gallery img" />
                </div>
                <div className="container-gallery-title-description">
                  <form id="form-edit-portrait" onSubmit={handleChangePortrait} data-id={item._id} data-filename={item.portraitFilename}>
                    <div style={{"marginBottom":"5px"}}>Change portrait</div>
                    <div style={{"marginBottom":"20px"}}>
                      <input
                        type="file"
                        onChange={handleImageAsFile}
                        style={{"marginBottom":"5px"}}
                      />
                      <button>Upload portrait</button>
                    </div>
                  </form>
                  <form id="form-edit-banner" onSubmit={handleChangeBanner} data-id={item._id} data-filename={item.bannerFilename}>
                    <div style={{"marginBottom":"5px"}}>Change banner</div>
                    <div style={{"marginBottom":"20px"}}>
                      <input
                        type="file"
                        onChange={handleImageAsFile}
                        style={{"marginBottom":"5px"}}
                      />
                      <button>Upload banner</button>
                    </div>
                  </form>
                  <form id={item._id} className="form-gallery-edit" onSubmit={editHandler} data-id={item._id}>
                    <textarea name="bio" placeholder="Bio" style={{"height":"80px", "marginBottom":"5px" }}></textarea>
                    <div className="container-form-buttons">
                      <button type="submit" style={{"marginRight":"5px"}}>Edit</button>
                      <button value={item._id} onClick={deleteHandler} data-bannerfilename={item.bannerFilename} data-portraitfilename={item.portraitFilename}>Delete</button>
                    </div>
                  </form>
                </div>
              </div>
              <p style={{ "width":"calc(140px + 40vw)", "marginBottom":"40px" }}>Bio: {item.bio}</p>
            </div>
          )
        })
      }
    </div>
  );
};

export default AboutManager;