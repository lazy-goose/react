import { ChangeEvent, Component } from 'react';
import s from './PokeSearchPage.module.scss';
import TextInput from '../../components/@UIKit/TextInput/TextInput';
import Button from '../../components/@UIKit/Button/Button';
import LinkButton from '../../components/@UIKit/LinkButton/LinkButton';
import PokeCard from '../../components/PokeCard/PokeCard';
import Loader from '../../components/@UIKit/Loader/Loader';
import jcn from '../../utils/joinClassNames';
import { IPokemon } from 'pokeapi-typescript';
import {
  fetchPokemonNames,
  fetchPokemonDescriptions,
  searchPokemons,
} from '../../API';

type PokeSearchPageProps = Record<string, never>;

type PokeSearchPageState = {
  isFetching: boolean;
  error: Error | null;
  search: string;
  pokemonNames: string[];
  pokemonRenderArray: IPokemon[];
  limitRender: number;
};

export default class PokeSearchPage extends Component<
  PokeSearchPageProps,
  PokeSearchPageState
> {
  static STORAGE_SEARCH = 'pokeSearchString';

  state: PokeSearchPageState = {
    isFetching: true,
    error: null,
    search: '',
    pokemonNames: [],
    pokemonRenderArray: [],
    limitRender: 150,
  };

  constructor(props: PokeSearchPageProps) {
    super(props);
    const cachedSearchString = localStorage.getItem(
      PokeSearchPage.STORAGE_SEARCH
    );
    if (cachedSearchString) {
      this.state.search = cachedSearchString;
    }
  }

  static getDerivedStateFromError() {
    return { isFetching: false };
  }

  async componentDidMount() {
    try {
      const pokemonNames = await fetchPokemonNames();
      const pokemonRenderArray = this.state.search
        ? await searchPokemons(this.state.search, pokemonNames)
        : await fetchPokemonDescriptions(
            pokemonNames.slice(0, this.state.limitRender)
          );
      this.setState({
        isFetching: false,
        pokemonNames,
        pokemonRenderArray,
      });
    } catch (error) {
      this.setState({
        isFetching: false,
        error: error as Error,
      });
    }
  }

  handleSearchClick = async () => {
    try {
      this.setState({ isFetching: true });
      const searchedPokemons = await searchPokemons(
        this.state.search,
        this.state.pokemonNames.slice(0, this.state.limitRender)
      );
      this.setState({
        isFetching: false,
        pokemonRenderArray: searchedPokemons,
      });
    } catch (error) {
      this.setState({
        isFetching: false,
        error: error as Error,
      });
    }
  };

  handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({ search: e.target.value });
    localStorage.setItem(PokeSearchPage.STORAGE_SEARCH, e.target.value);
  };

  handleErrorButtonClick = () => {
    this.setState({
      error: new Error('No errors occurred? Click here to throw one!'),
    });
  };

  render() {
    if (this.state.error) throw this.state.error;

    return (
      <main className={s.PokeSearchPage}>
        <a href="https://github.com/lazy-goose/react-components/pull/1">
          Link to Pull Request
        </a>
        <section className={s.TopSlot}>
          <TextInput
            placeholder="Search for pokemons"
            value={this.state.search}
            onChange={this.handleSearchChange}
          />
          <Button onClick={this.handleSearchClick}>Search</Button>
          <LinkButton
            onClick={this.handleErrorButtonClick}
            className={s.ErrorLink}
          >
            No errors occurred? Click here to throw one!
          </LinkButton>
        </section>
        <section className={jcn(s.BottomSlot)}>
          {this.state.isFetching ? (
            <Loader delay={200} />
          ) : (
            <div className={s.PokeList}>
              {this.state.pokemonRenderArray.map((pokemon) => (
                <PokeCard
                  key={pokemon.name}
                  name={pokemon.name}
                  imageUrl={pokemon.sprites.front_default}
                  types={pokemon.types.map(({ type: { name } }) => name)}
                />
              ))}
            </div>
          )}
        </section>
      </main>
    );
  }
}
