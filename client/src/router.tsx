import { createBrowserRouter } from 'react-router-dom';

import App from './App';
import { Board } from './pages/Board';
import { Error } from './pages/Error';

const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
		errorElement: <Error />,
		children: [
			{
				path: '/boards/:boardID',
				element: <Board />,
			},
		],
	},
]);

export default router;
