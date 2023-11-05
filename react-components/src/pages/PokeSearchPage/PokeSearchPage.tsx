import { ChangeEvent, FormEvent, useEffect, useState, useRef } from 'react';
import s from './PokeSearchPage.module.scss';
import TextInput from '../../components/@UIKit/TextInput/TextInput';
import Button from '../../components/@UIKit/Button/Button';
import LinkButton from '../../components/@UIKit/LinkButton/LinkButton';
import Loader from '../../components/@UIKit/Loader/Loader';
import PokeList from '../../components/PokeList/PokeList';
import jcn from '../../utils/joinClassNames';
import { IPokemon } from 'pokeapi-typescript';
import { fetchPokemonNames, searchPokemons } from '../../API';

const STORAGE_SEARCH = 'pokeSearchString';

export default function PokeSearchPage() {
  const pokemonNames = useRef<string[]>([]);

  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState<Error>();
  const [search, setSearch] = useState('');
  const [pokemonRenderArray, setPokemonRenderArray] = useState<IPokemon[]>([]);
  const [limitRender] = useState(150);

  useEffect(() => {
    const cachedSearchString = localStorage.getItem(STORAGE_SEARCH);
    if (cachedSearchString) {
      setSearch(cachedSearchString);
    }
  }, []);

  useEffect(() => {
    (async () => {
      try {
        pokemonNames.current = await fetchPokemonNames();
        const searchedPokemons = await searchPokemons(
          search,
          pokemonNames.current,
          limitRender
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
        limitRender
      );
      setIsFetching(false);
      setPokemonRenderArray(searchedPokemons);
    } catch (error) {
      setIsFetching(false);
      setError(error as Error);
    }
  };

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);
    localStorage.setItem(STORAGE_SEARCH, value);
  };

  const handleErrorButtonClick = () => {
    setError(new Error('No errors occurred? Click here to throw one!'));
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
          <Button type="submit">Search</Button>
          <LinkButton onClick={handleErrorButtonClick} className={s.ErrorLink}>
            No errors occurred? Click here to throw one!
          </LinkButton>
        </form>
      </section>
      <section className={jcn(s.BottomSlot)}>
        {isFetching ? <Loader /> : <PokeList pokemons={pokemonRenderArray} />}
      </section>
    </main>
  );
}
