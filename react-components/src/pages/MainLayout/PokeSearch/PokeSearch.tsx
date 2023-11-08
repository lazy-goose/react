import { ChangeEvent, FormEvent, useEffect, useState, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import s from './PokeSearch.module.scss';
import TextInput from '../../../components/@UIKit/TextInput/TextInput';
import Button from '../../../components/@UIKit/Button/Button';
import LinkButton from '../../../components/@UIKit/LinkButton/LinkButton';
import Loader from '../../../components/@UIKit/Loader/Loader';
import PokeList from '../../../components/PokeList/PokeList';
import jcn from '../../../utils/joinClassNames';
import { IPokemon } from 'pokeapi-typescript';
import { PokemonList, fetchPokemonList, searchPokemons } from '../../../API';
import Pagination from '../../../components/Pagination/Pagination';

export default function PokeSearch() {
  const pokemonList = useRef<PokemonList>([]);

  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState<Error>();
  const [pokemonRenderArray, setPokemonRenderArray] = useState<IPokemon[]>([]);
  const [highlightSearch, setHighlightSearch] = useState(false);

  const DEFAULT_PAGE = 1;
  const DEFAULT_PAGE_SIZE = 150;

  const [searchParams, setSearchParams] = useSearchParams({
    search: '',
    page: String(DEFAULT_PAGE),
    pageSize: String(DEFAULT_PAGE_SIZE),
  });

  const searchQuery = searchParams.get('search') || '';
  const pageQuery = searchParams.get('page') || '';
  const pageSizeQuery = searchParams.get('pageSize') || '';

  const page = Number(pageQuery || DEFAULT_PAGE);
  const pageSize = Number(pageSizeQuery || DEFAULT_PAGE_SIZE);

  useEffect(() => {
    (async () => {
      try {
        if (!pokemonList.current.length) {
          pokemonList.current = await fetchPokemonList();
        }
        const searchedPokemons = await searchPokemons(
          searchQuery,
          pokemonList.current,
          page,
          pageSize
        );
        setPokemonRenderArray(searchedPokemons);
      } catch (error) {
        setError(error as Error);
      } finally {
        setIsFetching(false);
      }
    })();
  }, []);

  const handleSearch = async (e: FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      setIsFetching(true);
      const searchedPokemons = await searchPokemons(
        searchQuery,
        pokemonList.current || [],
        page,
        pageSize
      );
      setPokemonRenderArray(searchedPokemons);
    } catch (error) {
      setError(error as Error);
    } finally {
      setIsFetching(false);
      setHighlightSearch(false);
    }
  };

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchParams((params) => {
      params.set('search', value);
      params.set('page', String(DEFAULT_PAGE));
      return params;
    });
    setHighlightSearch(true);
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
    <div>
      <a href="https://github.com/lazy-goose/react-components/pull/2">
        Link to Pull Request
      </a>
      <section className={s.TopSlot}>
        <form className={s.SearchContainer} onSubmit={handleSearch}>
          <TextInput
            placeholder="Search for pokemons"
            value={searchQuery}
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
                className={s.Pagination}
                currentPage={page}
                pageSize={pageSize}
                totalCount={pokemonList.current.length}
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
    </div>
  );
}
