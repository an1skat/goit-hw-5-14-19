import React from 'react';
import ImageGalleryItem from './ImageGalleryItem';

const ImageGallery = ({ images, onImageClick }) => {
  return (
    <ul className="gallery">
      {images.map((img) => (
        <ImageGalleryItem
          key={img.id}
          small={img.webformatURL}
          large={img.largeImageURL}
          onClick={onImageClick}
        />
      ))}
    </ul>
  );
};

export default ImageGallery;
