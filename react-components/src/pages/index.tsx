import MainLayout from '@/components/MainLayout/MainLayout';
import PokeSearch from '@/components/MainLayout/PokeSearch/PokeSearch';
import {
  InferGetServerSidePropsType,
  GetServerSideProps,
  GSSPContext,
} from '@/share/types/GSSPUtils';
import { pokemonApi, store } from '@/redux';
import { INamedApiResource, IPokemon } from 'pokeapi-typescript';

export enum Query {
  Search = 'search',
  Page = 'page',
  PageSize = 'pageSize',
}

export const DEFAULT_PAGE = 1;
export const DEFAULT_PAGE_SIZE = 25;

const inMemoryCache = {
  pokemonsList: null as null | INamedApiResource<IPokemon>[],
};

export const getPokeSearchProps = async (context: GSSPContext) => {
  const pokemonName = (context.query.name as string) || '';

  const searchTerm = context.query[Query.Search] || '';
  const page = Number(context.query[Query.Page] || DEFAULT_PAGE);
  const pageSize = Number(context.query[Query.PageSize]);

  if (!inMemoryCache.pokemonsList) {
    const { data: list = [] } = await store.dispatch(
      pokemonApi.endpoints.getPokemonsList.initiate()
    );
    inMemoryCache.pokemonsList = list;
  }

  const { data: [pokemonList, total] = [[], 0] } = await store.dispatch(
    pokemonApi.endpoints.getPokemons.initiate({
      search: searchTerm,
      list: inMemoryCache.pokemonsList,
      page,
      limit: pageSize || DEFAULT_PAGE_SIZE,
    })
  );

  return {
    searchTerm,
    pageSize,
    total,
    page,
    pokemonList,
    pokemonName,
  };
};

export const getServerSideProps = (async (context) => {
  const searchProps = await getPokeSearchProps(context);
  return {
    props: {
      searchProps,
    },
  };
}) satisfies GetServerSideProps<{
  searchProps: Awaited<ReturnType<typeof getPokeSearchProps>>;
}>;

export default function RootComponent({
  searchProps,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return <MainLayout main={<PokeSearch {...searchProps} />} />;
}
