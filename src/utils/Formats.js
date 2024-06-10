//example input: 2024-06-01T05:00:00.000+00:00
export function StringDateToReadable(date) {
	return new Date(date).toLocaleDateString("en-GB", {
		day: "numeric",
		month: "short",
		year: "numeric",
	});
}
