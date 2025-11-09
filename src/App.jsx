import React, { useState, useCallback, useMemo } from 'react';
import Searchbar from './components/Searchbar';
import ImageGallery from './components/ImageGallery';
import Button from './components/Button';
import Loader from './components/Loader';
import Modal from './components/Modal';
import { useImageSearch } from './hooks/useImageSearch';
import './App.css';

const App = () => {
  const { images, loading, handleSearchSubmit, handleLoadMore } =
    useImageSearch();
  const [showModal, setShowModal] = useState(false);
  const [modalImage, setModalImage] = useState(null);

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
