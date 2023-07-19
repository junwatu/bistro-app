import 'styles/globals.css';
import 'react-datepicker/dist/react-datepicker.css';
import type { AppProps } from 'next/app';
import { RoqProvider, ChatProvider } from '@roq/nextjs';
import { clientConfig } from 'config';
import '@roq/nextjs/index.css';
import { ChakraProvider } from '@chakra-ui/react';
import { roqThemeLight } from 'styles/roq-theme';
import Script from 'next/script';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      {/* start tracking-scripts */}
      {/* end tracking-scripts */}
      <RoqProvider
        config={{
          host: clientConfig.roq.platformURL,
          auth: {
            useRoqAuth: true,
          },
        }}
        theme={roqThemeLight}
      >
        <ChatProvider>
          <Component {...pageProps} />
        </ChatProvider>
      </RoqProvider>
    </ChakraProvider>
  );
}
