import React from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Carregando from '../components/Carregando';

export default class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      disableButton: true,
      size: '',
      ready: false,
      loading: false,
    };
    this.AbleButton = this.AbleButton.bind(this);
    this.defaultUser = this.defaultUser.bind(this);
  }

  async defaultUser(event) {
    const { size } = this.state;
    event.preventDefault();
    this.setState({ loading: true });
    await createUser({ name: size });
    this.setState({ size: '', disableButton: true, ready: true });
  }

  AbleButton({ target }) {
    const { size } = this.state;
    this.setState({ size: target.value });
    if (size.length < 2) {
      this.setState({ disableButton: true });
    } else {
      this.setState({ disableButton: false });
    }
  }

  render() {
    const { disableButton, size, ready, loading } = this.state;
    return (
      <div data-testid="page-login">
        <form>
          {!ready ? (
            <label htmlFor="login-button">
              <input
                value={ size }
                onChange={ this.AbleButton }
                type="text"
                name="login-button"
                data-testid="login-name-input"
              />
              <button
                onClick={ this.defaultUser }
                type="submit"
                data-testid="login-submit-button"
                disabled={ disableButton }
              >
                Entrar
              </button>
            </label>
          ) : (
            <Redirect to="/search" />
          )}
          { loading ? <Carregando /> : null }
        </form>
      </div>
    );
  }
}
