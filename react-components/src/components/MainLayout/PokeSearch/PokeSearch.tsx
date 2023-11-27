import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import s from './PokeSearch.module.scss';
import TextInput from '@/components/@UIKit/TextInput/TextInput';
import Button from '@/components/@UIKit/Button/Button';
import LinkButton from '@/components/@UIKit/LinkButton/LinkButton';
import PokeList from '@/components/PokeList/PokeList';
import Pagination from '@/components/Pagination/Pagination';
import { useDispatch } from 'react-redux';
import {
  setPage,
  setPageSize,
  setPokemons,
  setSearch,
} from '@/redux/pokemonSlice';
import useQueryParams from '@/hooks/useQueryParams';
import { IPokemon } from 'pokeapi-typescript';
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE, Query } from '@/pages';

const STORAGE_SEARCH = 'pokeSearchString';

export default function PokeSearch({
  searchTerm,
  pageSize,
  total,
  page,
  pokemonList,
  pokemonName,
}: {
  searchTerm: string;
  pageSize: number;
  total: number;
  page: number;
  pokemonList: IPokemon[];
  pokemonName: string;
}) {
  const { setQueryParams } = useQueryParams();
  const [isError, setIsError] = useState(false);

  const query = {
    [Query.Search]: searchTerm,
    [Query.Page]: page,
    [Query.PageSize]: pageSize,
  };

  const [searchInput, setSearchInput] = useState(() => searchTerm || '');

  const searchFromQuery = query.search || '';
  const pageFromQuery = Number(query.page) || DEFAULT_PAGE;
  const pageSizeFromQuery = Number(query.pageSize) || DEFAULT_PAGE_SIZE;

  const MAX_PAGE = Math.ceil(total / pageSizeFromQuery);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSearch(searchFromQuery));
    dispatch(setPage(pageFromQuery));
    dispatch(setPageSize(pageSizeFromQuery));
    dispatch(setPokemons(pokemonList));
  }, [searchFromQuery, pageFromQuery, pageSizeFromQuery]);

  useEffect(() => {
    if (pageFromQuery > MAX_PAGE) {
      setQueryParams({ [Query.Page]: '1' });
    }
    localStorage.getItem(STORAGE_SEARCH);
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const value = searchInput;
    if (pageFromQuery > MAX_PAGE) {
      setQueryParams({ [Query.Page]: '1' });
    }
    setQueryParams({
      [Query.Search]: value,
    });
    localStorage.setItem(STORAGE_SEARCH, value);
  };

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trimEnd();
    if (pageFromQuery > MAX_PAGE) {
      setQueryParams({ [Query.Page]: '1' });
    }
    setQueryParams({ [Query.Search]: value }, false);
    setSearchInput(value);
    localStorage.setItem(STORAGE_SEARCH, value);
  };

  const handlePageChange = (page: number) => {
    setQueryParams({
      [Query.Page]: String(page),
    });
  };

  const handlePageSizeChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const value = e.target.value.replace(/\D/, '').replace(/^0/, '');
    setQueryParams({
      [Query.PageSize]: value,
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
        <form className={s.Form} onSubmit={handleSubmit}>
          <fieldset className={s.Search}>
            <TextInput
              placeholder="Search for pokemons"
              value={searchInput}
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
        <PokeList
          pokemons={pokemonList}
          selected={pokemonList.find((p) => p.name === pokemonName)}
        />
      </section>
    </div>
  );
}
