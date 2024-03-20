import { Outlet } from 'react-router-dom';
import { SearchBar } from './components/SearchBar';

function App() {
	return (
		<>
			<SearchBar />
			<Outlet />
		</>
	);
}

export default App;
