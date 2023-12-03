import {
  type DetailedHTMLProps,
  type InputHTMLAttributes,
  useId,
  forwardRef,
} from 'react';

type InputProps = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {
  label?: string;
  id?: string;
};

const Input = forwardRef<HTMLInputElement, InputProps>(
  function Input(props, ref) {
    const inputUniqueId = useId();
    const { label = '', id = inputUniqueId, ...inputPass } = props;
    return (
      <p className="textInput">
        <label htmlFor={id}>{label}</label>
        <input id={id} ref={ref} {...inputPass} />
      </p>
    );
  }
);

export default Input;
