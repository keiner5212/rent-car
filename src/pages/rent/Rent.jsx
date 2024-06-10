import { useContext, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MainContext } from "../../../providers/MainContextProvider";
import "./Rent.css";
import Button from "../../components/animated/Button";
import { toast } from "react-toastify";
import { isCarAvailable } from "../../utils/RentCar";

function Rent() {
	const { id } = useParams();
	const { state } = useContext(MainContext);
	const [dateInfo, setDateInfo] = useState({
		"date-start": true,
		"date-end": true,
	});
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

	return (
		<div className="h-full flex  items-center justify-center">
			<form className="flex flex-col gap-[25px] p-[20px] bg-[#ffffff93] rounded-xl min-w-[500px]">
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

				<Button type="submit">Rent</Button>
			</form>
		</div>
	);
}

export default Rent;
