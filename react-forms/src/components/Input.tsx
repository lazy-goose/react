import { type DetailedHTMLProps, type InputHTMLAttributes, useId } from 'react';

type InputProps = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {
  label?: string;
  id?: string;
};

function Input(props: InputProps) {
  const inputUniqueId = useId();
  const { label = '', id = inputUniqueId, ...inputPass } = props;
  return (
    <p className="textInput">
      <label htmlFor={id}>{label}</label>
      <input id={id} {...inputPass} />
    </p>
  );
}

export default Input;
