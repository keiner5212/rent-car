import { createContext } from "react";
import { CarStates, RentStates } from "./StateActions";

export const CarContext = createContext();

const reducer = (state, action) => {
	switch (action.type) {
		case CarStates.SET_CARS:
			return {
				...state,
				cars: action.payload,
			}
		case RentStates.GET_ALL:
			return {
				...state,
				rents: action.payload,
			}
		case CarStates.GET_ALL:
			return state.cars;
		default:
			return state;
	}
};

export default reducer;
