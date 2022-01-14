import React from 'react';
import Header from '../components/Header';

export default class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      size: '',
      able: true,
    };
    this.AbleButton = this.AbleButton.bind(this);
    this.saveValue = this.saveValue.bind(this);
  }

  saveValue({ target }) {
    const { size } = this.state;
    this.setState({ size: target.value });
    if (size.length >= 1) {
      this.setState({ able: false });
    } else {
      this.setState({ able: true });
    }
  }

  AbleButton(event) {
    event.preventDefault();
  }

  render() {
    const { size, able } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <form>
          <input
            type="text"
            data-testid="search-artist-input"
            value={ size }
            onChange={ this.saveValue }
          />
          <button
            type="submit"
            data-testid="search-artist-button"
            onClick={ this.AbleButton }
            disabled={ able }
          >
            Pesquisar
          </button>
        </form>
      </div>
    );
  }
}
