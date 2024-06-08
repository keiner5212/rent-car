import { Link } from "react-router-dom";
import logo from "../../../public/logo.ico"
import "./Header.css";

export function Header() {
	return (
		<header className="flex flex-row items-center justify-around">
			<div className="flex flex-row items-center gap-4">
				<img src={logo} alt="logo" height="50px" width="50px" />
				<h1>Rent Car</h1>
			</div>
			<nav>
				<ul className="flex flex-row items-center gap-[50px]">
					<li>
						<Link className="nav-btn" to="/">Home</Link>
					</li>
					<li>
						<Link className="nav-btn" to="/about">About</Link>
					</li>
				</ul>
			</nav>
		</header>
	);
}
