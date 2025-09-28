import React, { Component } from 'react';

class ImageGalleryItem extends Component {
  handleClick = () => {
    this.props.onClick(this.props.large);
  };

  render() {
    return (
      <li className="gallery-item" onClick={this.handleClick}>
        <img src={this.props.small} alt="" />
      </li>
    );
  }
}

export default ImageGalleryItem;
