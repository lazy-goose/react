import PokeAPI, { IPokemon } from 'pokeapi-typescript';
import { PokemonList } from './fetchPokemonList';

const randomBetween = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1) + min);

export async function searchPokemons(
  value: string,
  list: PokemonList,
  page = 1,
  limit = 100
) {
  const FROM = Math.floor((page - 1) * limit);
  const TO = FROM + limit;

  const filtered = list
    .map((i) => i.name)
    .filter((n) => n.startsWith(value.toLowerCase().trimEnd()));

  const pageLimited = filtered.slice(FROM, TO);

  if (!pageLimited.length) {
    return new Promise<[[], 1]>((resolve) =>
      setTimeout(() => resolve([[], 1]), randomBetween(200, 500))
    );
  }

  const descriptionPromises = pageLimited.map((n) =>
    PokeAPI.Pokemon.resolve(n)
  );
  const descriptions = (await Promise.allSettled(descriptionPromises)).filter(
    (p) => p.status === 'fulfilled'
  ) as PromiseFulfilledResult<IPokemon>[];

  return [descriptions.map((d) => d.value), filtered.length] as const;
}
