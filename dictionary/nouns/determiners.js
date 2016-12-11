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
		base: "no",
		number: "singular",
	},
	{
		base: 'what',
		number: 'both'
	},
	{
		base: 'which',
		number: 'both'
	},
	{
		base: 'whose',
		number: 'both'
	}
].map(o => ({
	...o,
	order: 0
}))

export default determiners