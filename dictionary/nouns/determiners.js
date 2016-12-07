const determiners = [
	{
		base: "this",
		number: "singular"
	},
	{
		base: "that",
		number: "singular"
	},
	{
		base: "a",
		number: "singular"
	},
	{
	  base: 'those',
	  number: 'plural'
	}, 
	{
		base: "the",
		number: "both"
	},
	{
		base: "my",
		number: "both"
	},
	{
		base: "your",
		number: "both"
	},
	{
		base: "our",
		number: "both",
	},
	{
		base: "his",
		number: "both",
	},
	{
		base: "her",
		number: "both",
	},
	{
		base: "their",
		number: "both",
	},
	{
		base: "its",
		number: "both",
	},
].map(o => ({
	...o,
	order: 0
}))

export default determiners