export const formatDate = (isoString: string) => {
	const date = new Date(isoString)
	const monthNames = [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December'
	]
	const day = date.getDate()
	const month = monthNames[date.getMonth()]
	const year = date.getFullYear()

	return `${month} ${day}, ${year}`
}
