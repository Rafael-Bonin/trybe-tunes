import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';
import Carregando from './Carregando';

export default class MusicCard extends Component {
  constructor() {
    super();
    this.state = {
      ready: false,
    };
  }

  render() {
    const { allMusics } = this.props;
    const { ready } = this.state;
    return (
      <div>
        {!ready ? (
          allMusics.map((music) => {
            const { state } = this;
            return (music.trackName !== undefined ? (
              <li key={ music.trackName }>
                {music.trackName}
                {' '}
                <audio
                  data-testid="audio-component"
                  src={ music.previewUrl }
                  controls
                >
                  <track kind="captions" />
                </audio>
                <label htmlFor="favorite">
                  <input
                    checked={ state[music.trackName] }
                    name="favorite"
                    type="checkbox"
                    data-testid={ `checkbox-music-${music.trackId}` }
                    onChange={ async ({ target }) => {
                      this.setState({
                        ready: true,
                        [music.trackName]: target.checked,
                      });
                      await addSong(music);
                      this.setState({ ready: false });
                    } }
                  />
                </label>
              </li>
            ) : null);
          })
        ) : (
          <Carregando />
        )}
      </div>
    );
  }
}

MusicCard.propTypes = {
  allMusics: PropTypes.arrayOf(PropTypes.array).isRequired,
};
