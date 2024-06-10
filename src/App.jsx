import { Header } from "./components/header/Header";
import {
	BrowserRouter as Router,
	Route,
	Routes,
	Navigate,
} from "react-router-dom";
import Home from "./pages/Home";
import { MainContext } from "../providers/MainContextProvider";
import About from "./pages/about/About";
import { ToastContainer } from "react-toastify";
import useGetCars from "./hooks/useGetCars";
import { useContext, useEffect } from "react";
import { CarStates, RentStates } from "../providers/StateActions";
import Rent from "./pages/rent/Rent";
import useGetRents from "./hooks/useGetRents";
import './RentSucess.css';
function RentSucess({ id }) {

	return (
		<div className="function-wrapper">
			<h1 className="title">Rented car</h1>
			<img className="car-image" src={`https://th.bing.com/th/id/OIP.biwUDAgY2oqebC3-YgcgHwAAAA?rs=1&pid=ImgDetMain`} alt="" /> 
			<div className="info">
				<p className="car-information">CAR INFORMATION</p>
				<p>Car id: 1 {id}</p>
				<p>Brand: Toyota {id}</p>
				<p>Model: Corolla {id}</p>
				<p>Color: Rojo {id}</p>
				<p>Ciudad: Bogota {id}</p>
				<p>Precio: 20.000$</p>
			</div>
			<div className="info">
				<p className="user-information">USER INFORMATION</p>
				<p>Name: Carlos Gomez {id}</p>
				<p>Address: Carrera 7 #45-10, Bogotá {id}</p>
				<p>Phone: 3214567890 {id}</p>
			</div>
			<button>Back</button> {/*BOTON DE REGRESO A LA PAGINA PRINCIPAL (se estiliza con los botones que ya llevamos)*/}
		</div>);

		{/*AL NO TENER LA BD LO HAREMOS COMO UN 
			BOSQUEJO DE COMO QUEDARÍA EL FRONT END USANDO EL CARRO 1 DE
			 LA TABLA DE CARROS Y AL USUARIO 1 DE LA TABLA DE USUARIOS */}
}


function App() {
	const { dispatch } = useContext(MainContext);
	const { cars } = useGetCars(dispatch);
	const { prestamos } = useGetRents(dispatch);
	useEffect(() => {
		dispatch({
			type: CarStates.SET_CARS,
			payload: cars,
		});
		dispatch({
			type: RentStates.SET_RENTS,
			payload: prestamos,
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [cars, prestamos]);
	return (
		<Router>
			<Header />
			<main>
				<Routes>
					<Route path="/" element={<Navigate to="/1" />} />
					<Route path="/about" element={<About />} />
					<Route path="/:page" element={<Home />} />
					<Route path="/rent/:id" element={<Rent />} />
					<Route path="/rent-success/:id" element={<RentSucess />} />
				</Routes>
				<ToastContainer />
			</main>
		</Router>
	);
}

export default App;
