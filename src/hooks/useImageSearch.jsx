import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const API_KEY = '50017256-801118a20f40788150c0b225f';

export const useImageSearch = (initialQuery = '') => {
  const [query, setQuery] = useState(initialQuery);
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchImages = useCallback(async (q, p) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://pixabay.com/api/?q=${encodeURIComponent(
          q,
        )}&page=${p}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`,
      );
      setImages((prev) => [...prev, ...response.data.hits]);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (query.trim() === '') return;
    fetchImages(query, page);
  }, [query, page, fetchImages]);

  const handleSearchSubmit = useCallback((newQuery) => {
    setQuery(newQuery);
    setImages([]);
    setPage(1);
  }, []);

  const handleLoadMore = useCallback(() => {
    setPage((prevPage) => prevPage + 1);
  }, []);

  return { images, loading, handleSearchSubmit, handleLoadMore };
};
