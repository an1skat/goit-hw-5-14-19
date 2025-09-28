import React, { Component } from 'react';
import ImageGalleryItem from './ImageGalleryItem';

class ImageGallery extends Component {
  render() {
    return (
      <ul className="gallery">
        {this.props.images.map((img) => (
          <ImageGalleryItem
            key={img.id}
            small={img.webformatURL}
            large={img.largeImageURL}
            onClick={this.props.onImageClick}
          />
        ))}
      </ul>
    );
  }
}

export default ImageGallery;
