import React from 'react';

const ImageGalleryItem = ({ small, large, onClick }) => {
  const handleClick = () => {
    onClick(large);
  };

  return (
    <li className="gallery-item" onClick={handleClick}>
      <img src={small} alt="" />
    </li>
  );
};

export default ImageGalleryItem;
