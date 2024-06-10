import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { GlobalStates } from "../../providers/StateActions";

function useGetCars(dispatch) {
	const [cars, setCars] = useState([]);
	useEffect(() => {
		dispatch({ type: GlobalStates.SET_LOADING, payload: true });
		axios
			.get(import.meta.env.VITE_API_URL + "/cars")
			.then((res) => {
				setCars(res.data.carros ?? []);
				toast.success("Get cars successfully!");
			})
			.catch(() => {
				toast.error("Get cars failed!");
			});
	}, []);
	return { cars, setCars };
}

export default useGetCars;
