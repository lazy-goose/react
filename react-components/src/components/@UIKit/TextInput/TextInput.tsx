import { Component } from 'react';
import s from './TextInput.module.scss';
import jcn from '../../../utils/joinClassNames';

type TextInputProps = JSX.IntrinsicElements['input'] & {
  type?: 'text' | 'email';
};

export default class TextInput extends Component<TextInputProps> {
  static defaultProps = {
    type: 'text',
  };

  render() {
    return (
      <input
        {...this.props}
        className={jcn(s.TextInput, this.props.className)}
      />
    );
  }
}
