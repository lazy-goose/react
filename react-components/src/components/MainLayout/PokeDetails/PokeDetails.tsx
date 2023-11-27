import s from './PokeDetails.module.scss';
import Loader from '../../../components/@UIKit/Loader/Loader';
import { IPokemon } from 'pokeapi-typescript';

export default function PokeDetails({
  pokemon,
  isError,
}: {
  pokemon: IPokemon | null;
  isError: boolean;
}) {
  const noDash = (s: string) => s.replaceAll(/[-_]/g, ' ');
  const isLoading = false;

  return (
    <div className={s.PokeDetails} data-testid="pokemon-details">
      {isLoading ? (
        <Loader className={s.Loader} testId="details-loader" />
      ) : isError || !pokemon ? (
        <h2 className={s.Heading}>No pokemon found</h2>
      ) : (
        <>
          <h2 className={s.Heading}>{noDash(pokemon.name)}</h2>
          <div className={s.Container}>
            <ul data-testid="pokemon-details-description">
              <li>
                <h4>Weight</h4>
                <p>{pokemon.weight}</p>
              </li>
              <li>
                <h4>height</h4>
                <p>{pokemon.height}</p>
              </li>
              <li>
                <h4>Base Experience</h4>
                <p>{pokemon.base_experience}</p>
              </li>
              <li>
                <h4>Stats</h4>
                <ul>
                  {pokemon.stats
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
                  {pokemon.abilities
                    .map((a) => a.ability.name)
                    .map((n) => (
                      <li key={n}>{n}</li>
                    ))}
                </ul>
              </li>
              <li>
                <h4>Types</h4>
                <ul>
                  {pokemon.types
                    .map((t) => t.type.name)
                    .map((n) => (
                      <li key={n}>{n}</li>
                    ))}
                </ul>
              </li>
            </ul>
          </div>
        </>
      )}
    </div>
  );
}
