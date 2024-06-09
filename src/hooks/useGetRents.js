import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function useGetRents() {
	const [prestamos, setPrestamos] = useState([]);
	useEffect(() => {
		axios
			.get(import.meta.env.VITE_API_URL + "/prestamos")
			.then((res) => {
				setPrestamos(res.data.prestamos ?? []);
				toast.success("Get prestamos successfully!");
			})
			.catch(() => {
				toast.error("Get prestamos failed!");
			});
	}, []);
	return { prestamos, setPrestamos };
}

export default useGetRents;
