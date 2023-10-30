import PokeAPI, { IPokemon } from 'pokeapi-typescript';

async function fetchPokemonDescriptions(names: string[]) {
  const pokemonPromises = names.map((n) => PokeAPI.Pokemon.resolve(n));
  const settledPokemons = await Promise.allSettled(pokemonPromises);
  const fulfilledPokemons = settledPokemons.filter(
    (p) => p.status === 'fulfilled'
  ) as PromiseFulfilledResult<IPokemon>[];
  return fulfilledPokemons.map((p) => p.value);
}

export async function searchPokemons(
  value: string,
  names: string[],
  limit?: number
) {
  const filteredNames = names
    .filter((v) => v.startsWith(value.toLowerCase().trimEnd()))
    .slice(0, limit);
  return await fetchPokemonDescriptions(filteredNames);
}
