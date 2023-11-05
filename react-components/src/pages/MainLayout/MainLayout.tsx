import {
  useOutlet,
  useSearchParams,
  useNavigate,
  NavLink,
} from 'react-router-dom';
import PokeSearch from './PokeSearch/PokeSearch';
import s from './MainLayout.module.scss';
import PokeDetails from '../../components/PokeDetails/PokeDetails';
import useOutsideClick from '../../hooks/useOutsideClick';

export default function MainLayout() {
  const outlet = useOutlet();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const ref = useOutsideClick(() => {
    navigate({
      pathname: '/',
      search: searchParams.toString(),
    });
  });

  return (
    <main className={s.MainLayout}>
      <PokeSearch />
      {outlet && (
        <aside ref={ref} className={s.Aside}>
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
