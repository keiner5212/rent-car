import { createContext } from "react";
import { CarStates, GlobalStates, RentStates } from "./StateActions";

export const CarContext = createContext();

const reducer = (state, action) => {
	switch (action.type) {
		case CarStates.SET_CARS:
			return {
				...state,
				cars: action.payload,
			}
		case RentStates.SET_RENTS:
			return {
				...state,
				rents: action.payload,
			}
		case GlobalStates.SET_LOADING:
			return {
				...state,
				loading: action.payload,
			}
		default:
			return state;
	}
};

export default reducer;
