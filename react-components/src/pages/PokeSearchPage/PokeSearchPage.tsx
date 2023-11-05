import { ChangeEvent, FormEvent, useEffect, useState, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import s from './PokeSearchPage.module.scss';
import TextInput from '../../components/@UIKit/TextInput/TextInput';
import Button from '../../components/@UIKit/Button/Button';
import LinkButton from '../../components/@UIKit/LinkButton/LinkButton';
import Loader from '../../components/@UIKit/Loader/Loader';
import PokeList from '../../components/PokeList/PokeList';
import jcn from '../../utils/joinClassNames';
import { IPokemon } from 'pokeapi-typescript';
import { fetchPokemonNames, searchPokemons } from '../../API';
import Pagination from '../../components/Pagination/Pagination';

const STORAGE_SEARCH = 'pokeSearchString';

export default function PokeSearchPage() {
  const pokemonNames = useRef<string[]>([]);

  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState<Error>();
  const [search, setSearch] = useState('');
  const [pokemonRenderArray, setPokemonRenderArray] = useState<IPokemon[]>([]);
  const [highlightSearch, setHighlightSearch] = useState(false);

  const DEFAULT_PAGE = 1;
  const DEFAULT_PAGE_SIZE = 150;

  const [searchParams, setSearchParams] = useSearchParams({
    page: String(DEFAULT_PAGE),
    pageSize: String(DEFAULT_PAGE_SIZE),
  });

  const pageQuery = searchParams.get('page') || '';
  const pageSizeQuery = searchParams.get('pageSize') || '';

  const page = Number(pageQuery || DEFAULT_PAGE);
  const pageSize = Number(pageSizeQuery || DEFAULT_PAGE_SIZE);

  useEffect(() => {
    const cachedSearchString = localStorage.getItem(STORAGE_SEARCH);
    if (cachedSearchString) {
      setSearch(cachedSearchString);
    }
  }, []);

  useEffect(() => {
    (async () => {
      try {
        if (!pokemonNames.current.length) {
          pokemonNames.current = await fetchPokemonNames();
        }
        const searchedPokemons = await searchPokemons(
          search,
          pokemonNames.current,
          page,
          pageSize
        );
        setIsFetching(false);
        setPokemonRenderArray(searchedPokemons);
      } catch (error) {
        setIsFetching(false);
        setError(error as Error);
      }
    })();
  }, []);

  const handleSearch = async (e: FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      setIsFetching(true);
      const searchedPokemons = await searchPokemons(
        search,
        pokemonNames.current,
        page,
        pageSize
      );
      setIsFetching(false);
      setHighlightSearch(false);
      setPokemonRenderArray(searchedPokemons);
    } catch (error) {
      setIsFetching(false);
      setHighlightSearch(false);
      setError(error as Error);
    }
  };

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    localStorage.setItem(STORAGE_SEARCH, value);
    setSearch(value);
    setSearchParams((params) => {
      params.set('page', String(DEFAULT_PAGE));
      return params;
    });
  };

  const handleErrorButtonClick = () => {
    setError(new Error('No errors occurred? Click here to throw one!'));
  };

  const handlePageChange = (p: number) => {
    setSearchParams((params) => {
      params.set('page', String(p));
      return params;
    });
    setHighlightSearch(true);
  };

  const handlePageSizeChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const value = e.target.value.replace(/\D/, '');
    setHighlightSearch(pageSizeQuery !== value);
    setSearchParams((params) => {
      params.set('pageSize', value);
      params.set('page', String(DEFAULT_PAGE));
      return params;
    });
  };

  if (error) throw error;

  return (
    <main className={s.PokeSearchPage}>
      <a href="https://github.com/lazy-goose/react-components/pull/1">
        Link to Pull Request
      </a>
      <section className={s.TopSlot}>
        <form className={s.SearchContainer} onSubmit={handleSearch}>
          <TextInput
            placeholder="Search for pokemons"
            value={search}
            onChange={handleSearchChange}
          />
          <Button
            type="submit"
            className={jcn(
              s.Submit,
              highlightSearch ? s.HighlightSearch : null
            )}
          >
            Search
          </Button>
          <LinkButton onClick={handleErrorButtonClick} className={s.ErrorLink}>
            No errors occurred? Click here to throw one!
          </LinkButton>
        </form>
        <div>
          {!isFetching && (
            <>
              <Pagination
                currentPage={page}
                pageSize={pageSize}
                totalCount={pokemonNames.current.length}
                onPageChange={handlePageChange}
              />
              <input
                className={s.PageSizeInput}
                // Bug with type="number"
                type="text"
                value={pageSizeQuery}
                placeholder={String(DEFAULT_PAGE_SIZE)}
                onChange={handlePageSizeChange}
              />
            </>
          )}
        </div>
      </section>
      <section className={jcn(s.BottomSlot)}>
        {isFetching ? <Loader /> : <PokeList pokemons={pokemonRenderArray} />}
      </section>
    </main>
  );
}
