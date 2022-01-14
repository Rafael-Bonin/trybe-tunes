import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Carregando from './Carregando';

export default class Header extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      name: '',
    };
    this.abc = this.abc.bind(this);
  }

  componentDidMount() {
    this.abc();
  }

  async abc() {
    const takeUser = await getUser();
    this.setState({ loading: false, name: takeUser.name });
  }

  render() {
    const { loading, name } = this.state;
    return (
      <header data-testid="header-component">
        { loading ? <Carregando /> : <p data-testid="header-user-name">{ name }</p> }
        <Link to="/search" data-testid="link-to-search">Buscar</Link>
        <Link to="/favorites" data-testid="link-to-favorites">Favoritos</Link>
        <Link to="/profile" data-testid="link-to-profile">Perfil</Link>
      </header>
    );
  }
}
