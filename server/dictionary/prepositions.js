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
	{
		base: "like"
	},
	{
		base: "after"
	},
	{
		base: "down"
	},
	{
		base: "over"
	},
	{
		base: "against"
	},
	{
		base: "through"
	},
	{
		base: "around"
	},
	{
		base: "into"
	},
	{
		base: "across"
	},
	{
		base: "along"
	},
	{
		base: "behind"
	},
	{
		base: 'back'
	},
	{
		base: 'out'
	},
].map(o => ({
	...o,
	order: 7
}))

export default prepositions