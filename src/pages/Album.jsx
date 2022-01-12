import React from 'react';

export default class Album extends React.Component {
  render() {
    return (
      <div data-testid="page-album">
        { this.props.match.params.id }
      </div>
    );
  }
}
