const determiners = [
	{
		base: "this",
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
	}
].map(o => ({
	...o,
	order: 0
}))

export default determiners