import PokeAPI, { INamedApiResource, IPokemon } from 'pokeapi-typescript';

export async function fetchPokemonList() {
  return (await PokeAPI.Pokemon.listAll()).results;
}

export type PokemonList = INamedApiResource<IPokemon>[];
