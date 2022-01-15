import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class MusicCard extends Component {
  render() {
    const { allMusics } = this.props;
    return (
      <div>
        {allMusics.map((music) => (music.trackName !== undefined ? (
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
          </li>
        ) : null))}
      </div>
    );
  }
}

MusicCard.propTypes = {
  allMusics: PropTypes.arrayOf(PropTypes.array).isRequired,
};
