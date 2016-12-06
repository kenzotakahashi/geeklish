const adverbs = [
	{
		base: "hard",
		canModify: ["verb","adj"]
	},
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
	},
	{
		base: "so",
		canModify: ["adj","adv"]
	},
	{
		base: "much",
		canModify: ["verb","adj","adv"]
	},
	{
		base: "today",
		canModify: ["verb","clause"]
	},
	{
		base: "yesterday",
		canModify: ["verb","clause"]
	},
	{
		base: "just",
		canModify: ["verb", "adj", "adv"]
	},
].map(o => ({
	...o,
	order: 6
}))

export default adverbs