import { Link } from "react-router-dom";
import "./Header.css";

export function Header() {
	return (
		<header>
			<div>
				<h1>Rent Car</h1>
			</div>
			<nav>
				<ul>
					<Link to="/"></Link>
				</ul>
			</nav>
		</header>
	);
}
