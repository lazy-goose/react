import { CSSProperties } from 'react';
import s from './Loader.module.scss';
import jcn from '../../../utils/joinClassNames';

type LoaderProps = {
  className?: string;
  delay?: number;
  testId?: string;
};

export default function Loader(props: LoaderProps) {
  const { className, delay = 0, testId = 'loader' } = props;
  return (
    <div
      className={jcn(s.Container, className)}
      style={{ '--delay': delay } as CSSProperties}
      data-testid={testId}
    >
      <div className={s.Loader} />
    </div>
  );
}
