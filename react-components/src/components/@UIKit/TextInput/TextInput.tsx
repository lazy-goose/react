import s from './TextInput.module.scss';
import jcn from '../../../utils/joinClassNames';

type TextInputProps = JSX.IntrinsicElements['input'] & {
  type?: 'text' | 'email';
};

export default function TextInput(props: TextInputProps) {
  const { type = 'text', className, ...pass } = props;
  return (
    <input type={type} className={jcn(s.TextInput, className)} {...pass} />
  );
}
