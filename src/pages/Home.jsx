import { useContext, useState, useEffect } from "react";
import { MainContext } from "../../providers/MainContextProvider";
import Loader from "../components/loader/Loader";
import CarItem from "../components/carItem/CarItem";
import { useParams, Link } from "react-router-dom";
import Select from "react-select";
import "./Home.css";
import Button from "../components/animated/Button";

function Home() {
	const pagesize = 10;
	const { state } = useContext(MainContext);
	const { page } = useParams();
	const [cars, setCars] = useState([]);
	const [locationsSet, setLocationsSet] = useState(new Set());
	useEffect(() => {
		setCars(state.cars.slice((page - 1) * pagesize, page * pagesize));
		setLocationsSet(
			new Set(
				state.cars.map((car) => ({
					value: car.ciudad,
					label: car.ciudad,
				}))
			)
		);
	}, [page, state]);

	function Getpages() {
		return Math.ceil(state.cars.length / pagesize);
	}

	return (
		<div className="flex flex-col w-full h-full">
			<section className="h-fit p-4 mx-5">
				<form className="filter-form">
					<div className="flex flex-col">
						<label htmlFor="location">Location</label>
						<Select
							name="location"
							id="location"
							className="min-w-[200px] p-2 rounded-lg"
							options={Array.from(locationsSet)}
						/>
					</div>
					<div className="flex flex-col">
						<label htmlFor="date-start">Start Date</label>
						<input
							className="p-2 rounded-lg w-[200px]"
							type="date"
							name="date-start"
							id="date-start"
						/>
					</div>
					<div className="flex flex-col">
						<label htmlFor="date-start">Start Date</label>
						<input
							className="p-2 rounded-lg w-[200px]"
							type="date"
							name="date-start"
							id="date-start"
						/>
					</div>
					<div className="flex flex-col">
						<Button type="submit">Search</Button>
					</div>
				</form>
			</section>
			<section className="overflow-auto flex flex-row flex-wrap p-6 h-full items-center m-6 justify-center">
				{cars && cars.length > 0 ? (
					cars.map((car) => <CarItem key={car.id_carro} car={car} />)
				) : (
					<Loader />
				)}
				<div className="flex flex-row w-full">
					{parseInt(page) - 1 > 0 && (
						<Link
							className="prev-page-btn"
							to={"/" + (parseInt(page) - 1)}
						>
							{"<"} Previous Page
						</Link>
					)}
					{parseInt(page) + 1 <= Getpages() && (
						<Link
							className="next-page-btn"
							to={"/" + (parseInt(page) + 1)}
						>
							Next Page {">"}
						</Link>
					)}
				</div>
			</section>
		</div>
	);
}

export default Home;
