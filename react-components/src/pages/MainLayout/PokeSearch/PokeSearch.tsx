import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import s from './PokeSearch.module.scss';
import TextInput from '../../../components/@UIKit/TextInput/TextInput';
import Button from '../../../components/@UIKit/Button/Button';
import LinkButton from '../../../components/@UIKit/LinkButton/LinkButton';
import Loader from '../../../components/@UIKit/Loader/Loader';
import PokeList from '../../../components/PokeList/PokeList';
import jcn from '../../../utils/joinClassNames';
import Pagination from '../../../components/Pagination/Pagination';
import { useGetPokemons } from '../../../redux';
import { useDispatch } from 'react-redux';
import {
  setPage,
  setPageSize,
  setPokemons,
  setSearch,
} from '../../../redux/pokemonSlice';

const STORAGE_SEARCH = 'pokeSearchString';

const DEFAULT_PAGE = 1;
const DEFAULT_PAGE_SIZE = 150;

enum Query {
  Search = 'search',
  Page = 'page',
  PageSize = 'pageSize',
}

export default function PokeSearch() {
  const { pokemon: pokemonName = '' } = useParams();
  const [searchParams, setSearchParams] = useSearchParams({
    [Query.Search]: localStorage.getItem(STORAGE_SEARCH) || '',
    [Query.Page]: String(DEFAULT_PAGE),
    [Query.PageSize]: String(DEFAULT_PAGE_SIZE),
  });

  const query = {
    [Query.Search]: searchParams.get(Query.Search),
    [Query.Page]: searchParams.get(Query.Page),
    [Query.PageSize]: searchParams.get(Query.PageSize),
  };

  const searchFromQuery = query.search || '';
  const pageFromQuery = Number(query.page || DEFAULT_PAGE);
  const pageSizeFromQuery = Number(query.pageSize || DEFAULT_PAGE_SIZE);

  const useGetPokemonsParam = {
    search: searchFromQuery,
    page: pageFromQuery,
    limit: pageSizeFromQuery,
  } satisfies Parameters<typeof useGetPokemons>[0];

  const [triggerGetPokemons, useGetPokemonsResult] =
    useGetPokemons(useGetPokemonsParam);

  const {
    data: [pokemonRenderArray = [], total = 0],
    isFetching: useGetPokemonsIsFetching,
    isError: useGetPokemonsError,
  } = useGetPokemonsResult;

  const [isError, setIsError] = useState(useGetPokemonsError);

  const MAX_PAGE = Math.ceil(total / pageSizeFromQuery);

  const triggerSearch = (arg: Partial<typeof useGetPokemonsParam> = {}) => {
    const params = {
      ...useGetPokemonsParam,
      ...arg,
    };
    if (pageFromQuery > MAX_PAGE) {
      setSearchParams((params) => {
        params.set(Query.Page, '1');
        return params;
      });
      triggerGetPokemons({ ...params, page: 1 });
    } else {
      triggerGetPokemons(params);
    }
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSearch(searchFromQuery));
    dispatch(setPage(pageFromQuery));
    dispatch(setPageSize(pageSizeFromQuery));
    dispatch(setPokemons(pokemonRenderArray));
  }, [searchFromQuery, pageFromQuery, pageSizeFromQuery]);

  useEffect(() => {
    if (pageFromQuery > MAX_PAGE) {
      setSearchParams((params) => {
        params.set(Query.Page, '1');
        return params;
      });
    }
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    triggerSearch();
    localStorage.setItem(STORAGE_SEARCH, searchFromQuery);
  };

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trimEnd();
    setSearchParams((params) => {
      params.set(Query.Search, value);
      return params;
    });
    localStorage.setItem(STORAGE_SEARCH, value);
  };

  const handlePageChange = (page: number) => {
    setSearchParams((params) => {
      params.set(Query.Page, String(page));
      return params;
    });
    triggerSearch({ page });
  };

  const handlePageSizeChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const value = e.target.value.replace(/\D/, '').replace(/^0/, '');
    setSearchParams((params) => {
      params.set(Query.PageSize, value);
      return params;
    });
  };

  const handleErrorButtonClick = () => {
    setIsError(true);
  };

  if (isError) throw new Error('Jump to ErrorBoundary');

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
          className={jcn(s.Form, useGetPokemonsIsFetching ? s._Disable : null)}
          onSubmit={handleSubmit}
        >
          <fieldset className={s.Search}>
            <TextInput
              placeholder="Search for pokemons"
              value={searchFromQuery}
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
          {
            <fieldset className={s.Pagination}>
              <input
                className={s.PageSizeInput}
                // Bug with type="number"
                type="text"
                value={query.pageSize || ''}
                placeholder={String(DEFAULT_PAGE_SIZE)}
                onChange={handlePageSizeChange}
              />
              <Pagination
                className={s.Pages}
                currentPage={pageFromQuery}
                pageSize={pageSizeFromQuery}
                totalCount={total}
                onPageChange={handlePageChange}
              />
            </fieldset>
          }
        </form>
      </section>
      <section className={s.BottomSlot} data-testid="bottom-slot">
        {useGetPokemonsIsFetching ? (
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
