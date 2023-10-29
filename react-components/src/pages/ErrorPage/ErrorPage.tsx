import { Component } from 'react';
import s from './ErrorPage.module.scss';

export default class ErrorPage extends Component {
  render() {
    return (
      <div className={s.ErrorPage}>
        <p>Oops... Something went wrong</p>
      </div>
    );
  }
}
