import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

export default class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      allData: '',
      ready: false,
    };
  }

  componentDidMount() {
    this.everything();
  }

  async everything() {
    const { match: { params: { id } } } = this.props;
    const musics = await getMusics(id);
    this.setState({ allData: musics, ready: true });
    await getFavoriteSongs();
  }

  render() {
    const { allData, ready } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        { ready ? <p data-testid="artist-name">{ allData[0].artistName }</p> : null }
        { ready ? <p data-testid="album-name">{ allData[0].collectionName }</p> : null }
        { ready ? <ul><MusicCard allMusics={ allData } /></ul> : null }
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
