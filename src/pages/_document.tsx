import { Head, Html, Main, NextScript } from 'next/document';
import { SpeedInsights } from '@vercel/speed-insights/next';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta charSet="UTF-8" />
        <meta name="theme-color" content="#ffffff" />
      </Head>
      <body>
        <Main />
        <SpeedInsights />
        <NextScript />
      </body>
    </Html>
  );
}
