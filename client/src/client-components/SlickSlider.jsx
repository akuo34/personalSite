import React from "react";
import Slider from "react-slick";

export default class SlickSlider extends React.Component {
  constructor(props) {
    super(props);

    this.renderImages = this.renderImages.bind(this);
  }

  renderImages() {
    this.props.images.map(image => {
      return (
        <div className="container-image-gallery">
          <img className="image-gallery" src={image.fireBaseUrl} alt="gallery-image"></img>
        </div>
      )
    })
  }

  render() {
    console.log(this.props);
    if (!this.props.images) {
      return null;
    }
    var settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    };
    return (
      <Slider {...settings}>
        <div>
          <img src={this.props.images[0].fireBaseUrl}></img>
        </div>
        <div>
          <img src={this.props.images[1].fireBaseUrl}></img>
        </div>
        <div>
          <img src={this.props.images[2].fireBaseUrl}></img>
        </div>
        {/* {this.props.images.map(image => {
          return (
            <div className="container-image-gallery">
              <img className="image-gallery" src={image.fireBaseUrl} alt="gallery-image"></img>
            </div>
          )
        })} */}
      </Slider>
    );
  }
}