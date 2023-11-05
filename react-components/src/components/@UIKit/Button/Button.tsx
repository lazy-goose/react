import s from './Button.module.scss';
import jcn from '../../../utils/joinClassNames';

type ButtonProps = JSX.IntrinsicElements['button'];

export default function Button(props: ButtonProps) {
  const { type = 'button', className, ...pass } = props;
  return <button type={type} className={jcn(s.Button, className)} {...pass} />;
}
