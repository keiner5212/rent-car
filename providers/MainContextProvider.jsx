/* eslint-disable react/prop-types */
import { useReducer } from "react";
import { createContext } from "react";
import reducer from "./StateReducer";
import { initialState } from "./stateInit";

export const MainContext = createContext();

export function MainProvider({ children }) {
	const [state, dispatch] = useReducer(reducer, initialState);
	return (
		<MainContext.Provider
			value={{
				state,
				dispatch,
			}}
		>
			{children}
		</MainContext.Provider>
	);
}
