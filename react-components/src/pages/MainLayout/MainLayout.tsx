import { useOutlet, useSearchParams, NavLink } from 'react-router-dom';
import PokeSearch from './PokeSearch/PokeSearch';
import s from './MainLayout.module.scss';
import PokeDetails from './PokeDetails/PokeDetails';

export default function MainLayout() {
  const outlet = useOutlet();
  const [searchParams] = useSearchParams();

  return (
    <div className={s.MainLayout}>
      <main className={s.Main}>
        <PokeSearch />
      </main>
      {outlet && (
        <aside className={s.Aside} data-testid="aside">
          <div className={s.AsideSticky}>
            <NavLink
              to={{
                pathname: '/',
                search: searchParams.toString(),
              }}
              className={s.AsideCloseButton}
              data-testid="close-aside"
            >
              X
            </NavLink>
            <PokeDetails />
          </div>
        </aside>
      )}
    </div>
  );
}
