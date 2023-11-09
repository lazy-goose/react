import { useOutlet, useSearchParams, NavLink } from 'react-router-dom';
import PokeSearch from './PokeSearch/PokeSearch';
import s from './MainLayout.module.scss';
import PokeDetails from '../../components/PokeDetails/PokeDetails';

export default function MainLayout() {
  const outlet = useOutlet();
  const [searchParams] = useSearchParams();

  return (
    <main className={s.MainLayout}>
      <PokeSearch />
      {outlet && (
        <aside className={s.Aside}>
          <div className={s.AsideSticky}>
            <NavLink
              to={{
                pathname: '/',
                search: searchParams.toString(),
              }}
              className={s.AsideCloseButton}
            >
              X
            </NavLink>
            <PokeDetails />
          </div>
        </aside>
      )}
    </main>
  );
}
