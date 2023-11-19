import PokeAPI from 'pokeapi-typescript';

export async function fetchPokemonByName(name: string) {
  return await PokeAPI.Pokemon.fetch(name);
}
