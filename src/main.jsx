// import React from 'react'
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";
import { MainProvider } from "../providers/MainContextProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
	// <React.StrictMode>
	<MainProvider>
		<App />
	</MainProvider>
	// </React.StrictMode>,
);
