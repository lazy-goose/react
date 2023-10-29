import PokeAPI, { IPokemon } from 'pokeapi-typescript';

export async function fetchPokemonDescriptions(names: string[]) {
  const pokemonPromises = names.map((n) => PokeAPI.Pokemon.resolve(n));
  const settledPokemons = await Promise.allSettled(pokemonPromises);
  const fulfilledPokemons = settledPokemons.filter(
    (p) => p.status === 'fulfilled'
  ) as PromiseFulfilledResult<IPokemon>[];
  return fulfilledPokemons.map((p) => p.value);
}
