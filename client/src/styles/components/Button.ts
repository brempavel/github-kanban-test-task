import { defineStyleConfig } from '@chakra-ui/react';

export const Button = defineStyleConfig({
	variants: {
		default: {
			bg: 'gray.700',
			color: 'white',
			_hover: {
				bg: 'gray.600',
				_disabled: {
					bg: 'gray.500',
				},
			},
			_active: {
				bg: 'gray.500',
			},
		},
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
	defaultProps: {
		variant: 'default',
	},
});
