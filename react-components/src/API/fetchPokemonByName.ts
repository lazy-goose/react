import PokeAPI from 'pokeapi-typescript';

export async function fetchPokemonByName(name: string) {
  if (!name?.length) {
    throw new Error('Unknown name');
  }
  return await PokeAPI.Pokemon.resolve(name);
}
