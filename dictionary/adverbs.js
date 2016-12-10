const adverbs = [
	{
		base: "hard",
		canModify: ["verb","adj"],
		comparative: "harder",
		superlative: "hardest"
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
		canModify: ["verb"],
		comparative: false,
	},
	{
		base: "how",
		canModify: ["verb", "adj", "adv"],
		comparative: false,
	},
	{
		base: "when",
		canModify: ["verb", "adj", "adv"],
		comparative: false,
	},
	{
		base: "where",
		canModify: ["verb", "adj"],
		comparative: false,
	},
	{
		base: "nearly",
		canModify: ["verb","adj","adv","det","clause"]
	},
	{
		base: "so",
		canModify: ["adj","adv"],
		comparative: false,
	},
	{
		base: "much",
		canModify: ["verb","adj","adv"],
		comparative: false,
	},
	{
		base: "today",
		canModify: ["verb","clause"],
		comparative: false,
	},
	{
		base: "yesterday",
		canModify: ["verb","clause"],
		comparative: false,
	},
	{
		base: "just",
		canModify: ["verb", "adj", "adv"],
		comparative: false,
	},
	{
		base: 'never',
		canModify: ["verb"],
		comparative: false,
	},
	{
		base: 'ever',
		canModify: ["verb"],
		comparative: false,
	},
].map(o => ({
	...o,
	order: 6
}))

export default adverbs