import React from 'react';

const Button = ({ onClick }) => {
  return (
    <div className="button-container">
      <button className="load-more" onClick={onClick}>
        Load more
      </button>
    </div>
  );
};

export default Button;
