import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { GlobalStates } from "../../providers/StateActions";

function useGetRents(dispatch) {
	const [prestamos, setPrestamos] = useState([]);
	useEffect(() => {
		axios
			.get(import.meta.env.VITE_API_URL + "/prestamos")
			.then((res) => {
				setPrestamos(res.data.prestamos ?? []);
				toast.success("Get prestamos successfully!");
				dispatch({ type: GlobalStates.SET_LOADING, payload: false });
			})
			.catch(() => {
				toast.error("Get prestamos failed!");
			});
	}, []);
	return { prestamos, setPrestamos };
}

export default useGetRents;
