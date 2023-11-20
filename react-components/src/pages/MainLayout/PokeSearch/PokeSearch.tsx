import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import s from './PokeSearch.module.scss';
import TextInput from '../../../components/@UIKit/TextInput/TextInput';
import Button from '../../../components/@UIKit/Button/Button';
import LinkButton from '../../../components/@UIKit/LinkButton/LinkButton';
import Loader from '../../../components/@UIKit/Loader/Loader';
import PokeList from '../../../components/PokeList/PokeList';
import jcn from '../../../utils/joinClassNames';
import Pagination from '../../../components/Pagination/Pagination';
import {
  RootState,
  STORAGE_SEARCH,
  setPage,
  setPageSize,
  setSearch,
  setTotal,
  useGetPokemons,
} from '../../../redux';

const DEFAULT_PAGE = 1;
const DEFAULT_PAGE_SIZE = 150;

export default function PokeSearch() {
  const { pokemon: pokemonName = '' } = useParams();
  const [searchParams, setSearchParams] = useSearchParams({
    search: localStorage.getItem(STORAGE_SEARCH) || '',
    page: String(DEFAULT_PAGE),
    pageSize: String(DEFAULT_PAGE_SIZE),
  });

  const query = {
    search: searchParams.get('search'),
    page: searchParams.get('page'),
    pageSize: searchParams.get('pageSize'),
  };

  const searchFromQuery = query.search || '';
  const pageFromQuery = Number(query.page || DEFAULT_PAGE);
  const pageSizeFromQuery = Number(query.pageSize || DEFAULT_PAGE_SIZE);

  const dispatch = useDispatch();

  const isSearchFetching = useSelector(
    (state: RootState) => state.search.isFetchingPokemons
  );
  const isPageFetching = isSearchFetching;

  const search = useSelector((state: RootState) => state.search.search);
  const page = useSelector((state: RootState) => state.search.page);
  const pageSize = useSelector((state: RootState) => state.search.pageSize);

  const {
    data: [pokemonRenderArray = [], total = 1],
    isError: getPokemonsError,
  } = useGetPokemons({
    search,
    page,
    limit: pageSize,
  });

  useEffect(() => {
    dispatch(setSearch(query.search || ''));
    dispatch(setPage(Number(query.page) || DEFAULT_PAGE));
    dispatch(setPageSize(Number(query.pageSize) || DEFAULT_PAGE_SIZE));
  }, []);

  useEffect(() => {
    const MAX_PAGE = Math.ceil(total / pageSizeFromQuery);
    if (pageFromQuery > MAX_PAGE) {
      setSearchParams((params) => {
        params.set('page', String(DEFAULT_PAGE));
        return params;
      });
      dispatch(setPage(DEFAULT_PAGE));
    } else {
      dispatch(setPage(pageFromQuery));
    }
  }, [total]);

  const [isError, setIsError] = useState(getPokemonsError);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(setTotal(total));
    dispatch(setSearch(searchFromQuery));
    dispatch(setPageSize(pageSizeFromQuery));
  };

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchParams((params) => {
      params.set('search', e.target.value.trimEnd());
      return params;
    });
  };

  const handlePageChange = (page: number) => {
    setSearchParams((params) => {
      params.set('page', String(page));
      return params;
    });
    dispatch(setPage(page));
  };

  const handlePageSizeChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const value = e.target.value.replace(/\D/, '').replace(/^0/, '');
    setSearchParams((params) => {
      params.set('pageSize', value);
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
          className={jcn(
            s.Form,
            isSearchFetching || isPageFetching ? s._Disable : null
          )}
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
