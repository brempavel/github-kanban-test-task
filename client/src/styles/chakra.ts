import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
	fonts: {
		heading: '"Encode Sans SC", sans-serif',
		body: '"Encode Sans SC", sans-serif',
	},
	styles: {
		global: {
			body: {
				color: '#ffffff',
				bg: '#000000',
			},
		},
	},
});

export default theme;
