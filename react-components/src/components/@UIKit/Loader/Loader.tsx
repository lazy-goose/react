import { Component, CSSProperties } from 'react';
import s from './Loader.module.scss';
import jcn from '../../../utils/joinClassNames';

type LoaderProps = {
  className?: string;
  delay?: number;
};

export default class Loader extends Component<LoaderProps> {
  render() {
    return (
      <div
        className={jcn(s.Container, this.props.className)}
        style={{ '--delay': this.props.delay } as CSSProperties}
      >
        <div className={s.Loader} />
      </div>
    );
  }
}
