import { useSearchParams } from 'react-router-dom';
import { ReactNode, createContext, useContext } from 'react';

type CtxValue = string;

const Context = createContext<[CtxValue, (v: CtxValue) => void] | null>(null);
const urlQueryName = 'search';
const STORAGE_SEARCH = 'pokeSearchString';

const useSearchValue = () => {
  const context = useContext(Context);
  if (context === null) {
    throw new Error(`Provide context first ${Context.displayName}`);
  }
  return context;
};

const SearchValueProvider = (props: { children: ReactNode }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const cachedSearchValue = localStorage.getItem(STORAGE_SEARCH);
  const searchValue = searchParams.get(urlQueryName) || cachedSearchValue || '';
  const setSearchValue = (value: string) => {
    setSearchParams((params) => {
      params.set(urlQueryName, value);
      return params;
    });
    localStorage.setItem(STORAGE_SEARCH, value);
    return value;
  };

  return <Context.Provider value={[searchValue, setSearchValue]} {...props} />;
};

export { STORAGE_SEARCH, useSearchValue, SearchValueProvider };
