import { useContext, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MainContext } from "../../../providers/MainContextProvider";
import "./Rent.css";
import Button from "../../components/animated/Button";
import { toast } from "react-toastify";
import { isCarAvailable } from "../../utils/RentCar";
import axios from "axios";
import {
	validateOnlyLetters,
	validateOnlyNumbers,
} from "../../utils/Validations";
import Loader from "../../components/loader/Loader";

function Rent() {
	const { id } = useParams();
	const { state } = useContext(MainContext);
	const [dateInfo, setDateInfo] = useState({
		"date-start": true,
		"date-end": true,
	});
	const [loading, setLoading] = useState(false);
	const [car, setCar] = useState({});
	const [stateLoaded, setStateLoaded] = useState(false);
	const navigate = useNavigate();
	useEffect(() => {
		if (state.cars) {
			const carfound = state.cars.find((c) => c.id_carro == id);
			setCar(carfound);
		}
		const dateStart = localStorage.getItem("date-start");
		const dateEnd = localStorage.getItem("date-end");
		setDateInfo({
			"date-start": dateStart,
			"date-end": dateEnd,
		});
		setStateLoaded(true);
	}, [state, id]);

	useEffect(() => {
		if (!stateLoaded || state.loading) {
			return;
		}
		if (!car) {
			toast.error("Car not found");
			navigate("/");
		}
		if (!dateInfo["date-start"] || !dateInfo["date-end"]) {
			toast.error("Date info not provided");
			navigate("/");
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [stateLoaded]);

	const formLabelDefaults = {
		name: "Name",
		lastname: "Lastname",
		document: "CC",
		address: "Address",
		phone: "Phone",
	};

	const [formLabelvalues, setFormLabelvalues] = useState({
		name: "Name",
		lastname: "Lastname",
		document: "CC",
		address: "Address",
		phone: "Phone",
	});

	const [formInputValues, setFormInputValues] = useState({
		name: "",
		lastname: "",
		document: "",
		address: "",
		phone: "",
	});

	function handleChange(e) {
		setFormInputValues({
			...formInputValues,
			[e.target.name]: e.target.value,
		});
		if (e.target.value === "") {
			setFormLabelvalues({
				...formLabelvalues,
				[e.target.name]: formLabelDefaults[e.target.name],
			});
		} else {
			setFormLabelvalues({
				...formLabelvalues,
				[e.target.name]: "",
			});
		}
	}

	useEffect(() => {
		if (!car) return;
		if (!stateLoaded || state.loading) {
			return;
		}
		if (
			!isCarAvailable(
				car.id_carro,
				state.cars,
				state.rents,
				dateInfo["date-start"],
				dateInfo["date-end"]
			)
		) {
			toast.error("Car not available");
			navigate("/");
		}
	}, [car, state, dateInfo]);

	function handleSubmit(e) {
		e.preventDefault();
		setLoading(true);
		if (
			formInputValues.name === "" ||
			formInputValues.lastname === "" ||
			formInputValues.document === "" ||
			formInputValues.address === "" ||
			formInputValues.phone === ""
		) {
			toast.error("All fields are required");
			setLoading(false);
			return;
		}
		if (!validateOnlyLetters(formInputValues.name)) {
			toast.error("Invalid name, must be only letters");
			setLoading(false);
			return;
		}
		if (!validateOnlyLetters(formInputValues.lastname)) {
			toast.error("Invalid lastname, must be only letters");
			setLoading(false);
			return;
		}
		if (!validateOnlyNumbers(formInputValues.document)) {
			toast.error("Invalid document, must be only numbers");
			setLoading(false);
			return;
		}
		if (!formInputValues.address.length > 5) {
			toast.error("Invalid address, must be at least 5 characters");
			setLoading(false);
			return;
		}
		if (!validateOnlyNumbers(formInputValues.phone)) {
			toast.error("Invalid phone, must be only numbers");
			setLoading(false);
			return;
		}

		axios
			.get(
				import.meta.env.VITE_API_URL +
					"/users/" +
					formInputValues.document
			)
			.then((response) => {
				if (response.status == 204) {
					//means user not found
					axios
						.post(import.meta.env.VITE_API_URL + "/users", {
							nombre: formInputValues.name,
							apellido: formInputValues.lastname,
							cedula: formInputValues.document,
							direccion: formInputValues.address,
							telefono: formInputValues.phone,
						})
						.then((response) => {
							toast.success("User created successfully");
							axios
								.post(
									import.meta.env.VITE_API_URL + "/prestamos",
									{
										carro_id: car.id_carro,
										usuario_id:
											response.data.success.id_usuario,
										fechaInicio: dateInfo["date-start"],
										fechaFin: dateInfo["date-end"],
									}
								)
								.then((response) => {
									toast.success("Rent created successfully");
									navigate(
										"/rent-success/" +
											response.data.success.id_prestamo
									);
								})
								.catch(() => {
									toast.error(
										"Error while trying to create Rent"
									);
								});
						})
						.catch(() => {
							toast.error("Error while trying to create user");
						});
				} else if (response.status == 200) {
					toast.success(
						"User with this document found, proceed with the rent"
					);
					//means user found
					axios
						.post(import.meta.env.VITE_API_URL + "/prestamos", {
							carro_id: car.id_carro,
							usuario_id: response.data["user-found"].id_usuario,
							fechaInicio: dateInfo["date-start"],
							fechaFin: dateInfo["date-end"],
						})
						.then((response) => {
							toast.success("Rent created successfully");
							navigate(
								"/rent-success/" +
									response.data.success.id_prestamo
							);
						})
						.catch(() => {
							toast.error("Error while trying to create Rent");
						});
				}
			})
			.catch(() => {
				setLoading(false);
				toast.error("Error while trying to create user");
			});
	}

	return (
		<div className="h-full flex  items-center justify-center">
			<form
				onSubmit={handleSubmit}
				className="flex flex-col gap-[25px] p-[20px] bg-[#ffffff93] rounded-xl min-w-[500px]"
			>
				<h2 className="text-xl">
					Rent {car?.marca} {car?.modelo}
				</h2>
				<div className="flex items-center justify-center">
					<div className="relative min-w-[400px]">
						<input
							id="name"
							name="name"
							type="text"
							onChange={handleChange}
							className="w-full border-b border-gray-300 py-1 focus:border-b-2 focus:border-blue-700 transition-colors focus:outline-none peer bg-inherit"
						/>
						<label
							htmlFor="name"
							className="absolute left-0 top-1 cursor-text peer-focus:text-xs peer-focus:-top-4 transition-all peer-focus:text-blue-700"
						>
							{formLabelvalues.name}
						</label>
					</div>
				</div>
				<div className="flex items-center justify-center">
					<div className="relative min-w-[400px]">
						<input
							id="lastname"
							name="lastname"
							type="text"
							onChange={handleChange}
							className="w-full border-b border-gray-300 py-1 focus:border-b-2 focus:border-blue-700 transition-colors focus:outline-none peer bg-inherit"
						/>
						<label
							htmlFor="lastname"
							className="absolute left-0 top-1 cursor-text peer-focus:text-xs peer-focus:-top-4 transition-all peer-focus:text-blue-700"
						>
							{formLabelvalues.lastname}
						</label>
					</div>
				</div>
				<div className="flex items-center justify-center">
					<div className="relative min-w-[400px]">
						<input
							id="document"
							name="document"
							type="text"
							onChange={handleChange}
							className="w-full border-b border-gray-300 py-1 focus:border-b-2 focus:border-blue-700 transition-colors focus:outline-none peer bg-inherit"
						/>
						<label
							htmlFor="document"
							className="absolute left-0 top-1 cursor-text peer-focus:text-xs peer-focus:-top-4 transition-all peer-focus:text-blue-700"
						>
							{formLabelvalues.document}
						</label>
					</div>
				</div>
				<div className="flex items-center justify-center">
					<div className="relative min-w-[400px]">
						<input
							id="address"
							name="address"
							type="text"
							onChange={handleChange}
							className="w-full border-b border-gray-300 py-1 focus:border-b-2 focus:border-blue-700 transition-colors focus:outline-none peer bg-inherit"
						/>
						<label
							htmlFor="address"
							className="absolute left-0 top-1 cursor-text peer-focus:text-xs peer-focus:-top-4 transition-all peer-focus:text-blue-700"
						>
							{formLabelvalues.address}
						</label>
					</div>
				</div>
				<div className="flex items-center justify-center">
					<div className="relative min-w-[400px]">
						<input
							id="phone"
							name="phone"
							type="text"
							onChange={handleChange}
							className="w-full border-b border-gray-300 py-1 focus:border-b-2 focus:border-blue-700 transition-colors focus:outline-none peer bg-inherit"
						/>
						<label
							htmlFor="phone"
							className="absolute left-0 top-1 cursor-text peer-focus:text-xs peer-focus:-top-4 transition-all peer-focus:text-blue-700"
						>
							{formLabelvalues.phone}
						</label>
					</div>
				</div>
				{loading && (
					<>
						<div className="w-full flex items-center justify-center">
							<Loader />
						</div>
					</>
				)}
				<Button disabled={loading} type="submit">
					Rent
				</Button>
			</form>
		</div>
	);
}

export default Rent;
