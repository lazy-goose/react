import PokeAPI from 'pokeapi-typescript';

export async function fetchPokemonByName(name: string) {
  const pokemon = await PokeAPI.Pokemon.fetch(name);
  const moves = await Promise.all(
    pokemon.moves.map(({ move: m }) => PokeAPI.Move.fetch(m.name))
  );
  const stats = await Promise.all(
    pokemon.stats.map(({ stat: s }) => PokeAPI.Stat.fetch(s.name))
  );
  return {
    ...pokemon,
    overfetch: {
      moves,
      stats,
    },
  };
}
