import { createContext } from "react";

export const CarContext = createContext();

const reducer = (state, action) => {
	switch (action.type) {
		case "GET-ALL":
			return state.cars;
		case "ADD-CAR":
			return {
				...state,
				cars: [...state.cars, action.payload],
			};
		default:
			return state;
	}
};

export default reducer;
