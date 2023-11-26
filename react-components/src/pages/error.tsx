'use client';

import s from './ErrorPage.module.scss';

export default function ErrorPage() {
  return (
    <div className={s.ErrorPage} style={{ fontSize: '4rem' }}>
      <p>Oops... Something went wrong</p>
    </div>
  );
}
