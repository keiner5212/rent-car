import { useContext, useState, useEffect } from "react";
import { MainContext } from "../../providers/MainContextProvider";
import Loader from "../components/loader/Loader";
import CarItem from "../components/carItem/CarItem";
import { useParams, Link } from "react-router-dom";
import Select from "react-select";
import "./Home.css";
import { toast } from "react-toastify";

function Home() {
	const pagesize = 5;
	const { state } = useContext(MainContext);
	const { page } = useParams();
	const [cars, setCars] = useState([]);
	const [fileredCars, setFileredCars] = useState([]);
	const [locationsSet, setLocationsSet] = useState(new Set());
	const [filters, setFilters] = useState({
		location: undefined,
		"date-start": undefined,
		"date-end": undefined,
	});
	useEffect(() => {
		if (!filters["date-start"] || !filters["date-end"]) return;
		if (filters.location) {
			setFileredCars(
				state.cars.filter((car) => {
					return car.ciudad === filters.location;
				})
			);
		} else {
			setFileredCars(state.cars);
		}
		setLocationsSet(new Set(state.cars.map((car) => car.ciudad)));
	}, [state, filters["date-start"], filters["date-end"], filters.location]);

	useEffect(() => {
		setCars(fileredCars.slice((page - 1) * pagesize, page * pagesize));
	}, [page, fileredCars]);

	function Getpages() {
		if (!filters["date-start"] || !filters["date-end"]) return;
		return Math.ceil(fileredCars.length / pagesize);
	}
	function handleFilterLocation(e) {
		setFilters({ ...filters, location: e.value });
	}

	function handleFilterStart(e) {
		setFilters({ ...filters, [e.target.name]: e.target.value });
	}

	function handleFilterEnd(e) {
		if (e.target.value != "" && e.target.value > filters["date-start"]) {
			setFilters({ ...filters, [e.target.name]: e.target.value });
		} else {
			if (e.target.value != "")
				toast.error("End date must be greater than start date");
			e.target.value = "";
			setFilters({ ...filters, [e.target.name]: undefined });
		}
	}

	return (
		<div className="flex flex-col w-full h-full">
			<section className="h-fit p-4 mx-5">
				<div className="filter-form">
					<div className="flex flex-col">
						<label htmlFor="location">Location</label>
						<Select
							name="location"
							id="location"
							onChange={handleFilterLocation}
							className="min-w-[200px] p-2 rounded-lg"
							options={Array.from(locationsSet).map(
								(location) => ({
									value: location,
									label: location,
								})
							)}
						/>
					</div>
					<div className="flex flex-col">
						<label htmlFor="date-start">Start Date</label>
						<input
							className="p-2 rounded-lg w-[200px]"
							type="date"
							name="date-start"
							onChange={handleFilterStart}
							id="date-start"
						/>
					</div>
					<div className="flex flex-col">
						<label htmlFor="date-end">End Date</label>
						<input
							className="p-2 rounded-lg w-[200px]"
							type="date"
							name="date-end"
							onChange={handleFilterEnd}
							id="date-end"
						/>
					</div>
				</div>
			</section>
			<section className="overflow-auto flex flex-row flex-wrap p-6 h-full items-center m-6 justify-center">
				{filters["date-start"] && filters["date-end"] ? (
					<>
						{cars && cars.length > 0 ? (
							cars.map((car) => (
								<CarItem key={car.id_carro} car={car} />
							))
						) : (
							<Loader />
						)}
					</>
				) : (
					<>First select a start and end date</>
				)}

				<div className="flex flex-row w-full">
					{filters["date-start"] && filters["date-end"] ? (
						<>
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
						</>
					) : (
						<></>
					)}
				</div>
			</section>
		</div>
	);
}

export default Home;
