import { type DetailedHTMLProps, type HTMLAttributes } from 'react';

type Props = DetailedHTMLProps<
  HTMLAttributes<HTMLFieldSetElement>,
  HTMLFieldSetElement
> & {
  legend?: string;
  error?: string;
};

function FormErrorGroup(props: Props) {
  const { children, legend, error = null, ...fieldsetPass } = props;
  const { className, ...passFieldsetProps } = fieldsetPass;
  const joinedClassName = ['formErrorGroup', className].join(' ');
  return (
    <fieldset className={joinedClassName} {...passFieldsetProps}>
      <legend>{legend}</legend>
      {children}
      <p>{error}</p>
    </fieldset>
  );
}

export default FormErrorGroup;
