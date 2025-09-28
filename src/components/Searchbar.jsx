import React, { Component } from 'react';

class Searchbar extends Component {
  state = { input: '' };
  debounceTimeout = null;

  handleChange = (e) => {
    const value = e.target.value;
    this.setState({ input: value });

    if (this.debounceTimeout) clearTimeout(this.debounceTimeout);

    this.debounceTimeout = setTimeout(() => {
      this.props.onSubmit(value);
    }, 500);
  };

  render() {
    return (
      <header className="searchbar">
        <form className="form" onSubmit={(e) => e.preventDefault()}>
          <input
            className="input"
            type="text"
            value={this.state.input}
            onChange={this.handleChange}
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}

export default Searchbar;
