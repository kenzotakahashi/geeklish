const prepositions = [
	{
		"base": "in"
	},
	{
		"base": "to"
	},
	{
		"base": "at"
	},
	{
		"base": "than"
	},
	{
		"base": "with"
	}
].map(o => ({
	...o,
	order: 7
}))

export default prepositions