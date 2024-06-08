import { useContext, useState, useEffect } from "react";
import { MainContext } from "../../providers/MainContextProvider";
import Loader from "../components/loader/Loader";
import CarItem from "../components/carItem/CarItem";
import { useParams, Link } from "react-router-dom";

function Home() {
	const pagesize = 15;
	const { state } = useContext(MainContext);
	const { page } = useParams();
	const [cars, setCars] = useState([]);
	useEffect(() => {
		setCars(state.cars.slice((page - 1) * pagesize, page * pagesize));
	}, [page, state]);

	function Getpages() {
		return Math.ceil(state.cars.length / pagesize);
	}

	return (
		<div className="flex flex-col w-full h-full">
			<section className="h-[100px]">
				{parseInt(page) - 1 > 0 && (
					<Link to={"/" + (parseInt(page) - 1)}>Previous Page</Link>
				)}
				{parseInt(page) + 1 <= Getpages() && (
					<Link to={"/" + (parseInt(page) + 1)}>Next Page</Link>
				)}
			</section>
			<section className="overflow-auto flex flex-row flex-wrap p-6 h-full items-center m-6 justify-center">
				{cars && cars.length > 0 ? (
					cars.map((car) => <CarItem key={car.id_carro} car={car} />)
				) : (
					<Loader />
				)}
			</section>
		</div>
	);
}

export default Home;
