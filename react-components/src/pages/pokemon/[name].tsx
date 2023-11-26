import { useRouter } from 'next/router';
import MainLayout from '@/components/MainLayout/MainLayout';
import PokeDetails from '@/components/MainLayout/PokeDetails/PokeDetails';
import PokeSearch from '@/components/MainLayout/PokeSearch/PokeSearch';

export default function RootComponent() {
  const router = useRouter();
  const pokemonName = (router.query.name as string) || '';

  return (
    <MainLayout
      main={<PokeSearch pokemonName={pokemonName} />}
      aside={<PokeDetails pokemonName={pokemonName} />}
    />
  );
}
