import { Routes, Route } from 'react-router-dom';
import Main from './pages/Main';
import UncontrolledForm from './pages/UncontrolledForm';
import ReactHookForm from './pages/ReactHookForm';

export enum RoutePath {
  Main = '/',
  UncontrolledForm = '/uncontrolled-form',
  ReactHookForm = '/react-hook-form',
}

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path={RoutePath.Main} element={<Main />} />
        <Route
          path={RoutePath.UncontrolledForm}
          element={<UncontrolledForm />}
        />
        <Route path={RoutePath.ReactHookForm} element={<ReactHookForm />} />
      </Routes>
    </div>
  );
}

export default App;
