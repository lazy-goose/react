import { Component } from 'react';
import s from './Button.module.scss';
import jcn from '../../../utils/joinClassNames';

type ButtonProps = JSX.IntrinsicElements['button'];

export default class Button extends Component<ButtonProps> {
  static defaultProps = {
    type: 'button',
  };

  render() {
    return (
      <button {...this.props} className={jcn(s.Button, this.props.className)} />
    );
  }
}
