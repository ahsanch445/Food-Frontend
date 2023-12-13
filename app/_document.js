import { Html, Head, Main, NextScript } from 'next/document';
import Models from './Models'; // Check the correct path

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <Main />
        <NextScript />
        <div id='model-root'>
          <Models />
        </div>
      </body>
    </Html>
  );
}
