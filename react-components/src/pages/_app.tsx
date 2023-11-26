import '@/share/globals.scss';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { setupStore } from '../redux';
import { Alegreya_Sans } from 'next/font/google';

const alegreyaSans = Alegreya_Sans({
  weight: ['400', '700'],
  subsets: ['latin'],
});

const store = setupStore();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <div className={[alegreyaSans.className, 'app'].join(' ')}>
        <Component {...pageProps} />
      </div>
    </Provider>
  );
}
