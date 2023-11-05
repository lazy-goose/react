import PokeAPI, { IPokemon } from 'pokeapi-typescript';

async function fetchPokemonDescriptions(names: string[]) {
  const pokemonPromises = names.map((n) => PokeAPI.Pokemon.fetch(n));
  const settledPokemons = await Promise.allSettled(pokemonPromises);
  const fulfilledPokemons = settledPokemons.filter(
    (p) => p.status === 'fulfilled'
  ) as PromiseFulfilledResult<IPokemon>[];
  return fulfilledPokemons.map((p) => p.value);
}

const randomBetween = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1) + min);

export async function searchPokemons(
  value: string,
  names: string[],
  page = 1,
  limit = 100
) {
  const FROM = Math.floor((page - 1) * limit);
  const TO = FROM + limit;
  const filteredNames = names
    .filter((v) => v.startsWith(value.toLowerCase().trimEnd()))
    .slice(FROM, TO);
  if (!filteredNames.length) {
    return new Promise<[]>((resolve) =>
      setTimeout(() => resolve([]), randomBetween(200, 500))
    );
  }
  return await fetchPokemonDescriptions(filteredNames);
}
