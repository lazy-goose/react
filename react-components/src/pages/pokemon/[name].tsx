import MainLayout from '@/components/MainLayout/MainLayout';
import PokeDetails from '@/components/MainLayout/PokeDetails/PokeDetails';
import PokeSearch from '@/components/MainLayout/PokeSearch/PokeSearch';
import { pokemonApi, store } from '@/redux';
import {
  InferGetServerSidePropsType,
  GetServerSideProps,
  GSSPContext,
} from '@/share/types/GSSPUtils';
import { getPokeSearchProps } from '..';

const getPokeDetailsProps = async (context: GSSPContext) => {
  const pokemonName = (context.query.name as string) || '';
  const { data: pokemon = null, isError } = await store.dispatch(
    pokemonApi.endpoints.getPokemonByName.initiate(pokemonName)
  );
  return {
    pokemon,
    isError,
  };
};

export const getServerSideProps = (async (context) => {
  const promises = await Promise.all([
    getPokeSearchProps(context),
    getPokeDetailsProps(context),
  ]);

  const searchProps = promises[0];
  const detailProps = promises[1];

  return {
    props: {
      searchProps,
      detailProps,
    },
  };
}) satisfies GetServerSideProps<{
  detailProps: Awaited<ReturnType<typeof getPokeDetailsProps>>;
  searchProps: Awaited<ReturnType<typeof getPokeSearchProps>>;
}>;

export default function RootComponent({
  detailProps,
  searchProps,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <MainLayout
      main={<PokeSearch {...searchProps} />}
      aside={<PokeDetails {...detailProps} />}
    />
  );
}
