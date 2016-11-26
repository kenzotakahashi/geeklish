const determiners = [
	{
		base: "this",
		number: "singular",
		independent: true
	},
	{
		base: "a",
		number: "singular",
		independent: false	
	},
	{
		base: "the",
		number: "both",
		independent: false			
	}
].map(o => ({
	...o,
	order: 0
}))

export default determiners