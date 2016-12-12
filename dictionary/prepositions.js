const prepositions = [
	{
		base: "in"
	},
	{
		base: "to"
	},
	{
		base: "at"
	},
	{
		base: "than"
	},
	{
		base: "with"
	},
	{
		base: "on"
	},
	{
		base: "for"
	},
	{
		base: "by"
	},
	{
		base: "about"
	},
	{
		base: "as"
	},
	{
		base: "up"
	},
].map(o => ({
	...o,
	order: 7
}))

export default prepositions