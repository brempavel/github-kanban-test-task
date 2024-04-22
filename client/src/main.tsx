import React from 'react';
import ReactDOM from 'react-dom/client';

import { Provider } from 'react-redux';
import store from './store';

import { RouterProvider } from 'react-router-dom';
import router from './router';

import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import theme from './styles/chakra.ts';

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<ChakraProvider theme={theme}>
			<Provider store={store}>
				<ColorModeScript initialColorMode={theme.config.initialColorMode} />
				<RouterProvider router={router} />
			</Provider>
		</ChakraProvider>
	</React.StrictMode>
);
