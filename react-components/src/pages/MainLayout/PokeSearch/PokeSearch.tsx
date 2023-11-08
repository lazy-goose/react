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

  const [isSearchFetching, setIsSearchFetching] = useState(true);
  const [isPageFetching, setIsPageFetching] = useState(true);
  const [error, setError] = useState<Error>();
  const [pokemonRenderArray, setPokemonRenderArray] = useState<IPokemon[]>([]);

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
        setIsSearchFetching(false);
        setIsPageFetching(false);
      }
    })();
  }, [page]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      setIsSearchFetching(true);
      if (page !== 1) {
        setSearchParams((params) => {
          params.set('page', String(DEFAULT_PAGE));
          return params;
        });
      }
      const searchedPokemons = await searchPokemons(
        searchQuery,
        pokemonList.current || [],
        1,
        pageSize
      );
      setPokemonRenderArray(searchedPokemons);
    } catch (error) {
      setError(error as Error);
    } finally {
      setIsSearchFetching(false);
      setIsPageFetching(false);
    }
  };

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchParams((params) => {
      params.set('search', value);
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
    setIsPageFetching(true);
  };

  const handlePageSizeChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const value = e.target.value.replace(/\D/, '');
    setSearchParams((params) => {
      params.set('pageSize', value);
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
        <form
          className={jcn(
            s.Form,
            isSearchFetching || isPageFetching ? s._Disable : null
          )}
          onSubmit={handleSubmit}
        >
          <fieldset className={s.Search}>
            <TextInput
              placeholder="Search for pokemons"
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <Button type="submit" className={s.Submit}>
              Search
            </Button>
            <LinkButton
              onClick={handleErrorButtonClick}
              className={s.ErrorLink}
            >
              No errors occurred? Click here to throw one!
            </LinkButton>
          </fieldset>
          {!isSearchFetching && (
            <fieldset className={s.Pagination}>
              <Pagination
                className={s.Pages}
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
                placeholder={`${DEFAULT_PAGE_SIZE}`}
                onChange={handlePageSizeChange}
              />
            </fieldset>
          )}
        </form>
      </section>
      <section className={s.BottomSlot}>
        {isSearchFetching || isPageFetching ? (
          <Loader />
        ) : (
          <PokeList pokemons={pokemonRenderArray} />
        )}
      </section>
    </div>
  );
}
