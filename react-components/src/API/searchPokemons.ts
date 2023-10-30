import { fetchPokemonDescriptions } from './fetchPokemonDescriptions';

export async function searchPokemons(value: string, names: string[]) {
  const filteredNames = names.filter((v) =>
    v.startsWith(value.toLowerCase().trimEnd())
  );
  return await fetchPokemonDescriptions(filteredNames);
}
