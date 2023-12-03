import {
  type ChangeEventHandler,
  type MouseEventHandler,
  type KeyboardEventHandler,
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
    onKeyDown: onInputKeyDown = () => {},
    ...passInputProps
  } = inputProps || {};

  const ulElementRef = useRef<HTMLUListElement>(null);

  const [value, _setValue] = useState(initialSearch);

  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [suggestionIndex, setSuggestionIndex] = useState(0);
  const [suggestionsActive, setSuggestionsActive] = useState(false);

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

  const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = (e) => {
    switch (e.key) {
      case 'ArrowUp':
        if (suggestionIndex !== 0) {
          setSuggestionIndex(suggestionIndex - 1);
        }
        break;
      case 'ArrowDown':
        if (suggestionIndex !== suggestions.length - 1) {
          setSuggestionIndex(suggestionIndex + 1);
        }
        break;
      case 'Enter':
        changeValue(suggestions[suggestionIndex]);
        setSuggestionIndex(0);
        setSuggestionsActive(false);
        break;
      default:
        return;
    }
    onInputKeyDown(e);
  };

  const handleClick: MouseEventHandler<HTMLLIElement> = (e) => {
    changeValue(e.currentTarget.innerText);
    setSuggestions([]);
    setSuggestionsActive(false);
  };

  return (
    <div className={'autocomplete'}>
      <input
        type="text"
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        {...passInputProps}
      />
      {suggestionsActive && (
        <ul ref={ulElementRef} className="autocompleteSuggestions">
          {suggestions.map((suggestion, i) => {
            return (
              <li
                tabIndex={i}
                className={i === suggestionIndex ? 'active' : ''}
                key={i}
                onClick={handleClick}
              >
                {suggestion}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default Autocomplete;
