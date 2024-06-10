export function isCarAvailable(id, cars, rents, dateStart, dateEnd) {
	if (!dateStart || !dateEnd) {
		return false;
	}

	const foudnCar = cars.find((car) => car.id_carro === parseInt(id));

	if (!foudnCar) {
		return false;
	}

	const rentsByCar = rents.filter((rent) => rent.carro_id === parseInt(id));

	if (rentsByCar.length > 0) {
		return !rentsByCar.some(
			(rent) =>
				(dateStart >= rent.fechaInicio && dateStart <= rent.fechaFin) ||
				(dateEnd >= rent.fechaInicio && dateEnd <= rent.fechaFin)
		);
	} else {
		return true;
	}
}
