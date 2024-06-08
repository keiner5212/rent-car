import { Header } from "./components/header/Header";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import MainProvider from "../providers/MainContextProvider";

function App() {
	return (
		<MainProvider>
			<Router>
				<Header />
				<main>
					<Routes>
						<Route path="/" element={<Home />} />
					</Routes>
				</main>
			</Router>
		</MainProvider>
	);
}

export default App;
