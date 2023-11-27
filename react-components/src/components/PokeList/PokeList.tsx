import { IPokemon } from 'pokeapi-typescript';
import s from './PokeList.module.scss';
import PokeCard from '../PokeCard/PokeCard';

type PokeListProps = {
  pokemons: IPokemon[];
  selected?: IPokemon;
};

export default function PokeList(props: PokeListProps) {
  const { pokemons, selected } = props;
  return (
    <div className={s.PokeList}>
      {pokemons.length ? (
        <div className={s.PokeGrid} data-testid="pokemons-container">
          {pokemons.map((pokemon) => (
            <PokeCard
              key={pokemon.name}
              name={pokemon.name}
              imageUrl={pokemon.sprites.front_default}
              types={pokemon.types.map(({ type: { name } }) => name)}
              active={pokemon === selected}
            />
          ))}
        </div>
      ) : (
        <p className={s.NoPokemons}>No pokemon found</p>
      )}
    </div>
  );
}
