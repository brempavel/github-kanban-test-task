import { LinkProps, Link as RouterLink } from 'react-router-dom';
import { Link } from '@chakra-ui/react';

export const NavLink = ({ to, children }: LinkProps) => {
	return (
		<Link as={RouterLink} to={to}>
			{children}
		</Link>
	);
};
