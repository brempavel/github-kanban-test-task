import { Outlet } from 'react-router-dom';
import { Box } from '@chakra-ui/react';

import { Nav } from './components/Nav';

function App() {
	return (
		<Box userSelect="none" overflow="hidden">
			<Nav />
			<Outlet />
		</Box>
	);
}

export default App;
