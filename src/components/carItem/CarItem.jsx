import { useNavigate } from "react-router-dom";
import Button from "../animated/Button";
import "./CarItem.css";

export default function CarItem({ car }) {
	const navigate= useNavigate()
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
				<Button OnClick={() => navigate(`/rent/${car.id_carro}`)}>Rent Now</Button>
			</div>
		</div>
	);
}
