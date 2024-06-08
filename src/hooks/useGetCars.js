import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function useGetCars() {
	const [cars, setCars] = useState([]);
	useEffect(() => {
		axios
			.get(import.meta.env.VITE_API_URL + "/cars")
			.then((res) => {
				setCars(res.data.carros);
				toast.success("Get cars successfully!");
			})
			.catch(() => {
				toast.error("Get cars failed!");
			});
	}, []);
	return { cars, setCars };
}

export default useGetCars;
