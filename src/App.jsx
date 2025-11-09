import React, { useState, useEffect, useCallback, useMemo } from 'react';
import Searchbar from './components/Searchbar';
import ImageGallery from './components/ImageGallery';
import Button from './components/Button';
import Loader from './components/Loader';
import Modal from './components/Modal';
import axios from 'axios';
import './App.css';

const API_KEY = '50017256-801118a20f40788150c0b225f';

const App = () => {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalImage, setModalImage] = useState(null);

  const fetchImages = async (q, p) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://pixabay.com/api/?q=${encodeURIComponent(
          q,
        )}&page=${p}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`,
      );
      setImages((prevImages) => [...prevImages, ...response.data.hits]);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (query.trim() === '') return;
    fetchImages(query, page);
  }, [query, page]);

  const handleSearchSubmit = (newQuery) => {
    setQuery(newQuery);
    setImages([]);
    setPage(1);
  };

  const handleLoadMore = useCallback(() => {
    setPage((prevPage) => prevPage + 1);
  }, []);

  const openModal = useCallback((largeImageURL) => {
    setShowModal(true);
    setModalImage(largeImageURL);
  }, []);

  const closeModal = useCallback(() => {
    setShowModal(false);
    setModalImage(null);
  }, []);

  const imagesCount = useMemo(() => images.length, [images]);

  return (
    <div>
      <Searchbar onSubmit={handleSearchSubmit} />
      <p>Знайдено зображень: {imagesCount}</p>
      <ImageGallery images={images} onImageClick={openModal} />
      {loading && <Loader />}
      {images.length > 0 && !loading && <Button onClick={handleLoadMore} />}
      {showModal && <Modal image={modalImage} onClose={closeModal} />}
    </div>
  );
};

export default App;
