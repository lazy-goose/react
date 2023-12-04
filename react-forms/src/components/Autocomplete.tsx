import {
  type ChangeEventHandler,
  type MouseEventHandler,
  type DetailedHTMLProps,
  type InputHTMLAttributes,
  type FocusEventHandler,
  useState,
  useRef,
} from 'react';

type AutocompleteProps = {
  options: string[];
  initialSearch?: string;
  onChange?: (v: string) => void;
  inputProps?: Exclude<
    DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
    'value'
  >;
};

const Autocomplete = (props: AutocompleteProps) => {
  const {
    options,
    onChange: _onChange = () => {},
    initialSearch = '',
    inputProps = {},
  } = props;

  const {
    onChange: onInputChange = () => {},
    onBlur: onInputBlur = () => {},
    onFocus: onInputFocus = () => {},
    ...passInputProps
  } = inputProps || {};

  const ulElementRef = useRef<HTMLDivElement>(null);

  const [value, _setValue] = useState(initialSearch);

  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [, setSuggestionsActive] = useState(false);

  const valueToQuery = (s: string) => s.trimEnd().toLocaleLowerCase();
  const exactOption = (s: string) =>
    options.find((o) => valueToQuery(o) === valueToQuery(s));

  const changeValue = (s: string) => {
    _setValue(s);
    _onChange(s);
  };

  const handleBlur: FocusEventHandler<HTMLInputElement> = (e) => {
    if (ulElementRef.current?.contains(e.relatedTarget)) {
      return;
    }
    const option = exactOption(value);
    if (option) {
      changeValue(option);
    } else {
      _setValue('');
    }
    setSuggestions([]);
    setSuggestionsActive(false);
    onInputBlur(e);
  };

  const handleFocus: FocusEventHandler<HTMLInputElement> = (e) => {
    setSuggestions(options);
    setSuggestionsActive(true);
    onInputFocus(e);
  };

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const value = e.currentTarget.value;
    _setValue(value);
    const query = valueToQuery(value);
    if (query.length) {
      const filtered = options.filter((o) => o.toLowerCase().startsWith(query));
      setSuggestions(filtered);
      setSuggestionsActive(true);
    } else {
      setSuggestionsActive(false);
    }
    onInputChange(e);
  };

  const handleClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    changeValue(e.currentTarget.innerText);
    setSuggestions([]);
    setSuggestionsActive(false);
  };

  return (
    <div className="autocomplete">
      <p>
        <input
          type="text"
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
          onFocus={handleFocus}
          autoComplete="off"
          {...passInputProps}
        />
      </p>
      <div ref={ulElementRef} className="autocompleteSuggestions">
        {suggestions.map((suggestion, i) => {
          return (
            <button key={i} type="button" onClick={handleClick}>
              {suggestion}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Autocomplete;
