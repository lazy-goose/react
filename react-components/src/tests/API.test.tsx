import {
  vi,
  describe,
  test,
  expect,
  beforeAll,
  afterEach,
  afterAll,
  Mock,
} from 'vitest';
import { setupServer } from 'msw/node';
import { http, HttpResponse } from 'msw';
import { fetchPokemonByName, fetchPokemonList, searchPokemons } from '../API';
import pokemons from './data/pokemons.json';
import names from './data/names.json';
import pikachu from './data/pikachu.json';
import { getServerSideProps as getRootPageSSP } from '@/pages/index';
import { getServerSideProps as getPokemonPageSSP } from '@/pages/index';
import { GSSPContext } from '@/share/types/GSSPUtils';

let calls: Mock[] = [];

const POKE_URL = 'https://pokeapi.co/api/v2';

enum Calls {
  Pikachu,
  PokemonList,
  Pokemon,
}

const pushCall = (callWith: Calls) => {
  const func = vi.fn();
  func(callWith);
  calls.push(func);
};

const escapeString = (s: string) => s.replace(/[/\-\\^$*+?.()|[\]{}]/g, '\\$&');

const server = setupServer(
  http.get(`${POKE_URL}/pokemon/pikachu`, () => {
    pushCall(Calls.Pikachu);
    return HttpResponse.json(pikachu);
  }),
  http.get(`${POKE_URL}/pokemon`, () => {
    pushCall(Calls.PokemonList);
    return HttpResponse.json(pokemons);
  }),
  http.get(new RegExp(`${escapeString(POKE_URL)}/.+`), () => {
    pushCall(Calls.Pokemon);
    return HttpResponse.json(pikachu);
  })
);

describe('Test API layer', () => {
  beforeAll(() => {
    server.listen({ onUnhandledRequest: 'error' });
  });
  afterEach(() => {
    server.resetHandlers();
    calls = [];
  });
  afterAll(() => {
    server.close();
  });

  test(`fetchPokemonByName('pikachu') calls ${POKE_URL}/pokemon/pikachu`, async () => {
    await fetchPokemonByName('pikachu');
    expect(calls.length).toEqual(1);
    expect(calls.at(0)).toBeCalledWith(Calls.Pikachu);
  });

  test(`fetchPokemonList() calls ${POKE_URL}/pokemon`, async () => {
    await fetchPokemonList();
    expect(calls.length).toBeLessThanOrEqual(2);
    calls.forEach((call) => {
      expect(call).toBeCalledWith(Calls.PokemonList);
    });
  });

  test(`searchPokemons() makes request for each entry ${POKE_URL}/pokemon/{name}`, async () => {
    const pageLimit = 5;
    await searchPokemons('', names, 1, pageLimit);
    expect(calls.length).toBe(pageLimit);
    calls.forEach((call) => {
      expect(call).toBeCalledWith(Calls.Pokemon);
    });
  });

  test(`getServerSideProps() for router '/' matches snapshot props`, async () => {
    const routeData = await getRootPageSSP({
      query: { name: '' },
    } as unknown as GSSPContext);
    expect(routeData).toMatchSnapshot();
  });

  test(`getServerSideProps() for route '/pokemon/pikachu' matches snapshot props`, async () => {
    const routeData = await getPokemonPageSSP({
      query: { name: 'pikachu' },
    } as unknown as GSSPContext);
    expect(routeData).toMatchSnapshot();
  });
});
