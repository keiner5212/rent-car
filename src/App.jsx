import { Header } from "./components/header/Header";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import { MainContext } from "../providers/MainContextProvider";
import About from "./pages/about/About";
import { ToastContainer } from "react-toastify";
import useGetCars from "./hooks/useGetCars";
import { useContext, useEffect } from "react";
import { CarStates } from "../providers/StateActions";

function App() {
	const { cars } = useGetCars();
	const { dispatch } = useContext(MainContext);
	useEffect(() => {
		dispatch({
			type: CarStates.SET_CARS,
			payload: cars,
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [cars]);
	return (
		<Router>
			<Header />
			<main>
				<Routes>
					<Route path="/" element={<Navigate to="/1" />} />
					<Route path="/about" element={<About />} />
					<Route path="/:page" element={<Home />} />
				</Routes>
				<ToastContainer />
			</main>
		</Router>
	);
}

export default App;
