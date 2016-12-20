const conjunctions = [
	{
		base: "and",
		type: "coordinating"
	},
	{
		base: "or",
		type: "coordinating"
	},
	{
		base: "but",
		type: "coordinating"
	},
	{
		base: "so",
		type: "coordinating"
	},
	{
		base: "if",
		type: "subordinating"
	},
	{
		base: "when",
		type: "subordinating"
	},
	{
		base: "because",
		type: "subordinating"
	},
	{
		base: "as",
		type: "subordinating"
	},
].map(o => ({
	...o,
	order: 7
}))

export default conjunctions