import { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { MainContext } from "../../../providers/MainContextProvider";
import "./Rent.css";
import Button from "../../components/animated/Button";

function Rent() {
	const { id } = useParams();
	const { state } = useContext(MainContext);
	const [car, setCar] = useState(undefined);
	useEffect(() => {
		if (state.cars) {
			const carfound = state.cars.find((c) => c.id_carro == id);
			setCar(carfound);
		}
	}, [state, id]);

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
