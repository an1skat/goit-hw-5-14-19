import React, { useState, useRef } from 'react';

const Searchbar = ({ onSubmit }) => {
  const [input, setInput] = useState('');
  const debounceTimeout = useRef(null);

  const handleChange = (e) => {
    const value = e.target.value;
    setInput(value);

    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    debounceTimeout.current = setTimeout(() => {
      onSubmit(value);
    }, 500);
  };

  return (
    <header className="searchbar">
      <form className="form" onSubmit={(e) => e.preventDefault()}>
        <input
          className="input"
          type="text"
          value={input}
          onChange={handleChange}
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
};

export default Searchbar;
