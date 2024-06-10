import { useNavigate } from "react-router-dom";
import Button from "../animated/Button";
import "./CarItem.css";
import { isCarAvailable } from "../../utils/RentCar";
import { MainContext } from "../../../providers/MainContextProvider";
import { useContext, useState, useEffect } from "react";

export default function CarItem({ car }) {
	const navigate = useNavigate();
	const [available, setAvailable] = useState(false);
	const { state } = useContext(MainContext);
	const carColors = {
		rojo: "red",
		azul: "blue",
		verde: "green",
		negro: "black",
		blanco: "white",
		gris: "gray",
		naranja: "orange",
		rosado: "pink",
	};
	useEffect(() => {
		setAvailable(
			isCarAvailable(
				car.id_carro,
				state.cars,
				state.rents,
				localStorage.getItem("date-start"),
				localStorage.getItem("date-end")
			)
		);
	}, []);

	return (
		<div className="car-item">
			<div className="image-wrapper">
				<img src={car.imagen} alt={car.marca} />
			</div>
			<p>{car.marca}</p>
			<p>{car.modelo}</p>
			<p
				className="car-color"
				style={{ color: carColors[car.color.toLowerCase()] }}
			>
				{car.color}
			</p>
			<p>{car.ciudad}</p>
			<div className="relative flex flex-row justify-end w-[90%]">
				{available ? (
					<Button OnClick={() => navigate(`/rent/${car.id_carro}`)}>
						Rent Now
					</Button>
				) : (
					<span className="text-red-500">Not Available</span>
				)}
			</div>
		</div>
	);
}
