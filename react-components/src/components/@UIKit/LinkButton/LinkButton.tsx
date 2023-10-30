import { Component } from 'react';
import s from './LinkButton.module.scss';
import jcn from '../../../utils/joinClassNames';

type LinkButtonProps = JSX.IntrinsicElements['button'];

export default class LinkButton extends Component<LinkButtonProps> {
  static defaultProps = {
    type: 'button',
  };

  render() {
    return (
      <button
        {...this.props}
        className={jcn(s.LinkButton, this.props.className)}
      />
    );
  }
}
