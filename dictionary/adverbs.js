const adverbs = [
	{
		base: "really",
		canModify: ["verb","adj","adv","clause"]
	},
	{
		base: "quickly",
		canModify: ["verb","adj","adv","clause"]
	},
	{
		base: "hopefully",
		canModify: ["verb","adj","adv","clause"]
	},
	{
		base: "why",
		canModify: ["verb"]
	},
	{
		base: "how",
		canModify: ["verb", "adj", "adv"]
	},
	{
		base: "when",
		canModify: ["verb", "adj", "adv"]
	},
	{
		base: "where",
		canModify: ["verb", "adj"]
	},
	{
		base: "nearly",
		canModify: ["verb","adj","adv","det","clause"]
	}
].map(o => ({
	...o,
	order: 5
}))

export default adverbs