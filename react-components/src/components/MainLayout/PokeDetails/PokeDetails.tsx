import s from './PokeDetails.module.scss';
import Loader from '../../../components/@UIKit/Loader/Loader';
import { useGetPokemonByNameQuery } from '../../../redux';

export default function PokeDetails({ pokemonName }: { pokemonName: string }) {
  const {
    data: pokemon,
    isError,
    isLoading,
  } = useGetPokemonByNameQuery(pokemonName);

  if (isError) throw new Error('Jump to ErrorBoundary');

  const noDash = (s: string) => s.replaceAll(/[-_]/g, ' ');

  return (
    <div className={s.PokeDetails} data-testid="pokemon-details">
      <h2 className={s.Heading}>{noDash(pokemonName)}</h2>
      <div className={s.Container}>
        {isLoading ? (
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
                  .map((s) => [s.stat.name, s.base_stat] as const)
                  .map(([n, v]) => (
                    <li key={n} className={s.KeyValue}>
                      <span>{noDash(n)}</span>
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
