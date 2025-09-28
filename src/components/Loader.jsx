import React, { Component } from 'react';
import { TailSpin } from 'react-loader-spinner';

class Loader extends Component {
  render() {
    return (
      <div className="loader">
        <TailSpin color="#3f51b5" height={80} width={80} />
      </div>
    );
  }
}

export default Loader;
