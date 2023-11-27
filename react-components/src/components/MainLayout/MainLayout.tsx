import { ReactNode } from 'react';
import Link from 'next/link';
import s from './MainLayout.module.scss';

type MainLayoutProps = {
  main: ReactNode;
  aside?: ReactNode;
};

export default function MainLayout({ main, aside }: MainLayoutProps) {
  return (
    <div className={s.MainLayout}>
      <main className={s.Main}>{main}</main>
      {aside && (
        <aside className={s.Aside} data-testid="aside">
          <div className={s.AsideSticky}>
            <Link
              href="/"
              className={s.AsideCloseButton}
              data-testid="close-aside"
            >
              X
            </Link>
            {aside}
          </div>
        </aside>
      )}
    </div>
  );
}
