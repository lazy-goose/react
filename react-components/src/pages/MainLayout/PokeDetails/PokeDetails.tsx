import { useParams } from 'react-router-dom';
import s from './PokeDetails.module.scss';
import Loader from '../../../components/@UIKit/Loader/Loader';
import { useGetPokemonByNameQuery } from '../../../redux';

export default function PokeDetails() {
  const { pokemon: pokemonName = '' } = useParams();
  const {
    data: pokemon,
    isError,
    isFetching,
  } = useGetPokemonByNameQuery(pokemonName);

  if (isError) throw new Error('Jump to ErrorBoundary');

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
