import s from './LinkButton.module.scss';
import jcn from '../../../utils/joinClassNames';

type LinkButtonProps = JSX.IntrinsicElements['button'];

export default function LinkButton(props: LinkButtonProps) {
  const { type = 'button', className, ...pass } = props;
  return (
    <button type={type} className={jcn(s.LinkButton, className)} {...pass} />
  );
}
