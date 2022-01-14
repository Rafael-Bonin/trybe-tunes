import React from 'react';
import { Link } from 'react-router-dom';
import Carregando from '../components/Carregando';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

export default class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      size: '',
      able: true,
      loading: false,
      artist: '',
      ready: false,
      albuns: '',
    };
    this.search = this.search.bind(this);
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

  async search(event) {
    const { size } = this.state;
    event.preventDefault();
    this.setState({ artist: size, size: '', loading: true, ready: false });
    const takeAlbuns = await searchAlbumsAPI(size);
    this.setState({ albuns: takeAlbuns, loading: false, ready: true });
  }

  render() {
    const { size, able, loading, ready, artist, albuns } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        {!loading ? (
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
              onClick={ this.search }
              disabled={ able }
            >
              Pesquisar
            </button>
          </form>
        ) : (
          <Carregando />
        )}
        {ready ? (
          <p>
            {`Resultado de álbuns de:
            ${artist}`}
          </p>
        ) : null}
        <main>
          {ready ? (
            <ul>
              {albuns.map((album) => (
                <li key={ album.collectionId }>
                  <Link
                    data-testid={ `link-to-album-${album.collectionId}` }
                    to={ `/album/${album.collectionId}` }
                  >
                    {album.collectionName}
                  </Link>
                </li>
              ))}
            </ul>
          ) : null}
          {ready && albuns.length < 1 ? (
            <p>Nenhum álbum foi encontrado</p>
          ) : null}
        </main>
      </div>
    );
  }
}
