import '@/styles/globals.css';
import { AppProps } from 'next/app';
export default function MyApp({ Component, pageProps }: AppProps) {
    return <Component {...pageProps} />;
}

// import type { AppProps } from 'next/app';

// const jetBrainsMono = JetBrains_Mono({ subsets: ['latin'] });

// export default function MyApp({ Component, pageProps }: AppProps) {
//   return (
//     <main className={`${jetBrainsMono.className} min-h-screen bg-aura-bg text-aura-fg`}>
//       <Component {...pageProps} />
//     </main>
//   );
// }
