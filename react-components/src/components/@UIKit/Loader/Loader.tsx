import { CSSProperties } from 'react';
import s from './Loader.module.scss';
import jcn from '../../../utils/joinClassNames';

type LoaderProps = {
  className?: string;
  delay?: number;
};

export default function Loader(props: LoaderProps) {
  const { className, delay = 0 } = props;
  return (
    <div
      className={jcn(s.Container, className)}
      style={{ '--delay': delay } as CSSProperties}
    >
      <div className={s.Loader} />
    </div>
  );
}
