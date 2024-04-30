import { defineStyleConfig } from '@chakra-ui/react';

export const Button = defineStyleConfig({
	variants: {
		input: {
			bg: 'white',
			color: 'gray.800',
			_active: {
				bg: 'gray.100',
			},
		},
		delete: {
			bg: 'red.500',
			color: 'white',
			_hover: {
				bg: 'red.600',
			},
			_active: {
				bg: 'red.700',
			},
		},
		card: {
			bg: 'white',
			color: 'gray.800',
			_hover: {
				boxShadow:
					'0 -1px 4px rgba(0, 0, 0, 0.2), 0 4px 6px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.1)',
			},
			_active: {
				bg: 'gray.200',
			},
		},
	},
});
