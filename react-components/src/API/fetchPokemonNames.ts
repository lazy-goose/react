import PokeAPI from 'pokeapi-typescript';

export async function fetchPokemonNames() {
  const resourceList = await PokeAPI.Pokemon.listAll();
  return resourceList.results.map((r) => r.name);
}
