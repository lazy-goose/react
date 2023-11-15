import { useParams } from 'react-router-dom';
import { IPokemon } from 'pokeapi-typescript';
import { fetchPokemonByName } from '../../API';
import s from './PokeDetails.module.scss';
import { useEffect, useState } from 'react';
import Loader from '../@UIKit/Loader/Loader';

export default function PokeDetails() {
  const { pokemon: pokemonName = '' } = useParams();
  const [isFetching, setIsFetching] = useState(true);
  const [error, setIsError] = useState<Error>();
  const [pokemon, setPokemon] = useState<IPokemon>();

  useEffect(() => {
    (async () => {
      try {
        if (!pokemonName) {
          return;
        }
        setIsFetching(true);
        const pokemon = await fetchPokemonByName(pokemonName);
        setPokemon(pokemon);
      } catch (error) {
        setIsError(error as Error);
      } finally {
        setIsFetching(false);
      }
    })();
  }, [pokemonName]);

  if (error) throw error;

  return (
    <div className={s.PokeDetails} data-testid="pokemon-details">
      <h2 className={s.Heading}>{pokemonName}</h2>
      <div className={s.Container}>
        {isFetching ? (
          <Loader className={s.Loader} testId="details-loader" />
        ) : (
          <ul data-testid="pokemon-details-description">
            <li>
              <h4>Weight</h4>
              <p>{pokemon?.weight}</p>
            </li>
            <li>
              <h4>height</h4>
              <p>{pokemon?.height}</p>
            </li>
            <li>
              <h4>Base Experience</h4>
              <p>{pokemon?.base_experience}</p>
            </li>
            <li>
              <h4>Stats</h4>
              <ul>
                {pokemon?.stats
                  .map((s) => [s.stat.name, s.base_stat])
                  .map(([n, v]) => (
                    <li key={n} className={s.KeyValue}>
                      <span>{n}</span>
                      <span>{v}</span>
                    </li>
                  ))}
              </ul>
            </li>
            <li>
              <h4>Abilities</h4>
              <ul>
                {pokemon?.abilities
                  .map((a) => a.ability.name)
                  .map((n) => <li key={n}>{n}</li>)}
              </ul>
            </li>
            <li>
              <h4>Types</h4>
              <ul>
                {pokemon?.types
                  .map((t) => t.type.name)
                  .map((n) => <li key={n}>{n}</li>)}
              </ul>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
}
