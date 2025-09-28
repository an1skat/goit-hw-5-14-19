import React, { Component } from 'react';
import Searchbar from './components/Searchbar';
import ImageGallery from './components/ImageGallery';
import Button from './components/Button';
import Loader from './components/Loader';
import Modal from './components/Modal';
import axios from 'axios';
import './App.css';

const API_KEY = '50017256-801118a20f40788150c0b225f';

class App extends Component {
  state = {
    query: '',
    images: [],
    page: 1,
    loading: false,
    showModal: false,
    modalImage: null,
  };

  componentDidMount() {
    this.fetchImages();
  }

  handleSearchSubmit = (query) => {
    this.setState({ query, images: [], page: 1 }, () => {
      if (query.trim() !== '') this.fetchImages();
    });
  };

  fetchImages = async () => {
    const { query, page, images } = this.state;
    this.setState({ loading: true });
    try {
      const response = await axios.get(
        `https://pixabay.com/api/?q=${encodeURIComponent(
          query,
        )}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`,
      );
      this.setState({ images: [...images, ...response.data.hits] });
    } catch (error) {
      console.error(error);
    } finally {
      this.setState({ loading: false });
    }
  };

  handleLoadMore = () => {
    this.setState(
      (prevState) => ({ page: prevState.page + 1 }),
      this.fetchImages,
    );
  };

  openModal = (largeImageURL) => {
    this.setState({ showModal: true, modalImage: largeImageURL });
  };

  closeModal = () => {
    this.setState({ showModal: false, modalImage: null });
  };

  render() {
    const { images, loading, showModal, modalImage } = this.state;
    return (
      <div>
        <Searchbar onSubmit={this.handleSearchSubmit} />
        <ImageGallery images={images} onImageClick={this.openModal} />
        {loading && <Loader />}
        {images.length > 0 && !loading && (
          <Button onClick={this.handleLoadMore} />
        )}
        {showModal && <Modal image={modalImage} onClose={this.closeModal} />}
      </div>
    );
  }
}

export default App;
