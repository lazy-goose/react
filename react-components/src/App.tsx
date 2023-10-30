import { Component } from 'react';
import s from './App.module.scss';
import PokeSearchPage from './pages/PokeSearchPage/PokeSearchPage';
import ErrorBoundary from './components/ErrorBoundary';
import ErrorPage from './pages/ErrorPage/ErrorPage';

export default class App extends Component {
  render() {
    return (
      <div className={s.App}>
        <div className={s.Wrapper}>
          <ErrorBoundary fallback={<ErrorPage />}>
            <PokeSearchPage />
          </ErrorBoundary>
        </div>
      </div>
    );
  }
}
