import { defineStyleConfig } from '@chakra-ui/react';

export const Button = defineStyleConfig({
	variants: {
		// default: {
		// 	bg: '#0076df',
		// 	color: 'white',
		// 	_hover: {
		// 		bg: '#bbbbbb',
		// 		_disabled: {
		// 			bg: 'cccccc',
		// 		},
		// 	},
		// 	_active: {
		// 		bg: '#cccccc',
		// 	},
		// },
		input: {
			color: 'gray.800',
			_active: {
				bg: 'gray.100',
			},
		},
		red: {
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
			_active: {
				bg: 'gray.200',
			},
		},
	},
	// The default variant value
});
