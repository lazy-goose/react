import Head from 'next/head';
import MainLayout from '@/components/MainLayout/MainLayout';
import PokeSearch from '@/components/MainLayout/PokeSearch/PokeSearch';

export default function RootComponent() {
  return (
    <>
      <Head>
        <title>Pokemon Search Api</title>
      </Head>
      <MainLayout main={<PokeSearch />} />
    </>
  );
}
