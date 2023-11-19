import { Routes, Route } from 'react-router-dom';
import s from './App.module.scss';
import ErrorBoundary from './components/ErrorBoundary';
import ErrorPage from './pages/ErrorPage/ErrorPage';
import MainLayout from './pages/MainLayout/MainLayout';
import PokeDetails from './pages/MainLayout/PokeDetails/PokeDetails';

export default function App() {
  return (
    <div className={s.App} data-testid="app">
      <ErrorBoundary fallback={<ErrorPage />}>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route path="pokemon/:pokemon" element={<PokeDetails />} />
          </Route>
          <Route path="/*" element={<ErrorPage />} />
        </Routes>
      </ErrorBoundary>
    </div>
  );
}
