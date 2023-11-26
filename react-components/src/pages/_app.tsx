import '@/share/globals.scss';
import ErrorBoundary from '@/components/ErrorBoundary';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { store } from '../redux';
import { Alegreya_Sans } from 'next/font/google';
import ErrorPage from './error';

const alegreyaSans = Alegreya_Sans({
  weight: ['400', '700'],
  subsets: ['latin'],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ErrorBoundary fallback={<ErrorPage />}>
      <Provider store={store}>
        <div className={[alegreyaSans.className, 'app'].join(' ')}>
          <Component {...pageProps} />
        </div>
      </Provider>
    </ErrorBoundary>
  );
}
