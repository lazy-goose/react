import { ChangeEvent, FormEvent, useEffect, useState, useRef } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import s from './PokeSearch.module.scss';
import TextInput from '../../../components/@UIKit/TextInput/TextInput';
import Button from '../../../components/@UIKit/Button/Button';
import LinkButton from '../../../components/@UIKit/LinkButton/LinkButton';
import Loader from '../../../components/@UIKit/Loader/Loader';
import PokeList from '../../../components/PokeList/PokeList';
import jcn from '../../../utils/joinClassNames';
import { PokemonList, fetchPokemonList, searchPokemons } from '../../../API';
import Pagination from '../../../components/Pagination/Pagination';
import { usePokemons } from '../../../slices/Pokemons';
import { STORAGE_SEARCH, useSearchValue } from '../../../slices/SearchValue';

export default function PokeSearch() {
  const { pokemon: pokemonName = '' } = useParams();
  const pokemonList = useRef<PokemonList>([]);

  const [isSearchFetching, setIsSearchFetching] = useState(true);
  const [isPageFetching, setIsPageFetching] = useState(true);
  const [error, setError] = useState<Error>();
  const [pokemonRenderArray, setPokemonRenderArray] = usePokemons();
  const [pageCount, setPageCount] = useState(1);
  const [searchValue, setSearchValue] = useSearchValue();

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
    (async () => {
      try {
        if (!pokemonList.current.length) {
          pokemonList.current = await fetchPokemonList();
        }
        const [searchedPokemons, total] = await searchPokemons(
          searchValue,
          pokemonList.current,
          page,
          pageSize
        );
        if (page <= Math.ceil(total / pageSize)) {
          setPokemonRenderArray(searchedPokemons);
          setPageCount(total);
        } else {
          setSearchParams((params) => {
            params.set('page', '1');
            return params;
          });
        }
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
      const [searchedPokemons, total] = await searchPokemons(
        searchValue,
        pokemonList.current || [],
        1,
        pageSize
      );
      setPokemonRenderArray(searchedPokemons);
      setPageCount(total);
      localStorage.setItem(STORAGE_SEARCH, searchValue.trimEnd());
    } catch (error) {
      setError(error as Error);
    } finally {
      setIsSearchFetching(false);
      setIsPageFetching(false);
    }
  };

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value.trimEnd());
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
    const value = e.target.value.replace(/\D/, '').replace(/^0/, '');
    setSearchParams((params) => {
      params.set('pageSize', value);
      return params;
    });
  };

  if (error) throw error;

  return (
    <div>
      <a
        className={s.PrLink}
        href="https://github.com/lazy-goose/react-components/pull/3"
      >
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
              value={searchValue}
              onChange={handleSearchChange}
              data-testid="search"
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
              <input
                className={s.PageSizeInput}
                // Bug with type="number"
                type="text"
                value={pageSizeQuery}
                placeholder={`${DEFAULT_PAGE_SIZE}`}
                onChange={handlePageSizeChange}
              />
              <Pagination
                className={s.Pages}
                currentPage={page}
                pageSize={pageSize}
                totalCount={pageCount}
                onPageChange={handlePageChange}
              />
            </fieldset>
          )}
        </form>
      </section>
      <section className={s.BottomSlot} data-testid="bottom-slot">
        {isSearchFetching || isPageFetching ? (
          <Loader className={s.Loader} />
        ) : (
          <PokeList
            pokemons={pokemonRenderArray}
            selected={pokemonRenderArray.find((p) => p.name === pokemonName)}
          />
        )}
      </section>
    </div>
  );
}
