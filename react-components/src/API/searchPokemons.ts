import PokeAPI, { IPokemon } from 'pokeapi-typescript';
import { PokemonList } from './fetchPokemonList';

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

  const descriptionPromises = pageLimited.map((n) =>
    PokeAPI.Pokemon.resolve(n)
  );
  const descriptions = (await Promise.allSettled(descriptionPromises)).filter(
    (p) => p.status === 'fulfilled'
  ) as PromiseFulfilledResult<IPokemon>[];

  return [descriptions.map((d) => d.value), filtered.length] as [
    IPokemon[],
    number,
  ];
}
