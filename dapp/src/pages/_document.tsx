import { Head, Html, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang='en'>
      <Head>
        <link
          rel='preload'
          href='/fonts/clashdisplay.ttf'
          as='font'
          crossOrigin='anonymous'
        />
        <link
          rel='preload'
          href='/fonts/outfit.ttf'
          as='font'
          crossOrigin='anonymous'
        />
        <link
          rel='preload'
          href='/fonts/rustyhooks.ttf'
          as='font'
          crossOrigin='anonymous'
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
