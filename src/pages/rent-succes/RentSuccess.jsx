import { useParams } from "react-router-dom";
import "./RentSuccess.css";
import { useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Loader from "../../components/loader/Loader";
import { StringDateToReadable } from "../../utils/Formats";

function RentSucess() {
	const { id } = useParams();
	const navigate = useNavigate();
	const [rentData, setRentData] = useState(undefined);

	useEffect(() => {
		axios
			.get(import.meta.env.VITE_API_URL + `/prestamos/${id}`)
			.then((res) => {
				if (res.status === 200) {
					setRentData(res.data);
				} else {
					toast.error("Error getting Rent data, redirecting...");
					setTimeout(() => {
						navigate("/");
					}, 3000);
				}
			})
			.catch(() => {
				toast.error("Error getting Rent data, redirecting...");
				setTimeout(() => {
					navigate("/");
				}, 3000);
			});
	}, [id]);

	return (
		<div className="flex flex-col items-center justify-center h-full">
			{!rentData ? (
				<Loader />
			) : (
				<>
					<h1 className="title">Rented car</h1>
					<img
						className="car-image"
						src={rentData.carro.imagen}
						alt=""
					/>
					<div className="info">
						<p className="car-information">CAR INFORMATION</p>
						<p>Brand: {rentData.carro.marca}</p>
						<p>Model: {rentData.carro.modelo}</p>
						<p>Color: {rentData.carro.color}</p>
						<p>Ciudad: {rentData.carro.ciudad}</p>
						<p>Precio: {rentData.carro.precio}$</p>
					</div>
					<div className="info">
						<p className="user-information">USER INFORMATION</p>
						<p>
							Name:{" "}
							{rentData.usuario.nombre +
								" " +
								rentData.usuario.apellido}{" "}
						</p>
						<p>Address: {rentData.usuario.direccion}</p>
						<p>Phone: {rentData.usuario.telefono}</p>
						<p>Start Date: {StringDateToReadable(rentData.prestamo.fechaInicio)}</p>
						<p>End Date: {StringDateToReadable(rentData.prestamo.fechaFin)}</p>
					</div>
				</>
			)}
		</div>
	);
}

export default RentSucess;
