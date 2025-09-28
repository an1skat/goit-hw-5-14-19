import React, { Component } from 'react';

class Button extends Component {
  render() {
    return (
      <div className="button-container">
        <button className="load-more" onClick={this.props.onClick}>
          Load more
        </button>
      </div>
    );
  }
}

export default Button;
