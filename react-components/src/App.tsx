import { Routes, Route, Navigate } from 'react-router-dom';
import s from './App.module.scss';
import PokeSearchPage from './pages/PokeSearchPage/PokeSearchPage';
import ErrorBoundary from './components/ErrorBoundary';
import ErrorPage from './pages/ErrorPage/ErrorPage';

export default function App() {
  return (
    <div className={s.App}>
      <div className={s.Wrapper}>
        <Routes>
          <Route
            path="/"
            element={
              <ErrorBoundary fallback={<Navigate to="/error" />}>
                <PokeSearchPage />
              </ErrorBoundary>
            }
          />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </div>
    </div>
  );
}
