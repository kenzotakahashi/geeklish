const adverbs = [
	{
		base: "hard",
		canModify: ["verb","adj"],
		comparative: "harder",
		superlative: "hardest"
	},
	{
		base: "really",
		canModify: ["verb","clause"]
	},
	{
		base: "quickly",
		canModify: ["verb","clause"]
	},
	{
		base: "hopefully",
		canModify: ["verb","clause"]
	},
	{
		base: "why",
		canModify: ["verb"],
		comparative: "n",
	},
	{
		base: "how",
		canModify: ["verb","adj","adv"],
		comparative: "n",
	},
	{
		base: "when",
		canModify: ["verb","comp"],
		comparative: "n",
	},
	{
		base: "where",
		canModify: ["verb","comp"],
		comparative: "n",
	},
	{
		base: "almost",
		canModify: ["verb","adj","adv","det"]
	},
	{
		base: "nearly",
		canModify: ["verb","adj","adv","det"]
	},
	{
		base: "so",
		canModify: ["adj","adv"],
		comparative: "n",
	},
	{
		base: "much",
		canModify: ["verb","adj","adv"],
		comparative: "n",
	},
	{
		base: "today",
		canModify: ["verb","clause","comp"],
		comparative: "n",
	},
	{
		base: "yesterday",
		canModify: ["verb","clause","comp"],
		comparative: "n",
	},
	{
		base: "just",
		canModify: ["verb","adj","adv"],
		comparative: "n",
	},
	{
		base: 'never',
		canModify: ["verb"],
		comparative: "n",
	},
	{
		base: 'ever',
		canModify: ["verb"],
		comparative: "n",
	},
	{
		base: 'as',
		canModify: ["adj"],
		comparative: "n",
	},
	{
		base: 'soon',
		canModify: ["verb",'clause'],
		comparative: "sooner",
		superlative: "soonest"
	},
	{
		base: 'later',
		canModify: ["verb",'clause'],
	},
	{
		base: 'instead',
		canModify: ['verb','clause']
	}
].map(o => ({
	...o,
	order: 6
}))

export default adverbs