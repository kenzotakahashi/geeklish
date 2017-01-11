const adverbs = [
	{
		base: "hard",
		usage: ["verb","adj"],
		comparative: "harder",
		superlative: "hardest"
	},
	{
		base: "really",
		usage: ["verb","clause"]
	},
	{
		base: "quickly",
		usage: ["verb","clause"]
	},
	{
		base: "hopefully",
		usage: ["verb","clause"]
	},
	{
		base: "why",
		usage: ["verb"],
		comparative: "n",
	},
	{
		base: "how",
		usage: ["verb","adj","adv"],
		comparative: "n",
	},
	{
		base: "when",
		usage: ["verb","comp"],
		comparative: "n",
	},
	{
		base: "where",
		usage: ["verb","comp"],
		comparative: "n",
	},
	{
		base: "almost",
		usage: ["verb","adj","adv","det"]
	},
	{
		base: "nearly",
		usage: ["verb","adj","adv","det"]
	},
	{
		base: "so",
		usage: ["adj","adv"],
		comparative: "n",
	},
	{
		base: "much",
		usage: ["verb","adj","adv"],
		comparative: "n",
	},
	{
		base: "today",
		usage: ["verb","clause","comp"],
		comparative: "n",
	},
	{
		base: "yesterday",
		usage: ["verb","clause","comp"],
		comparative: "n",
	},
	{
		base: "just",
		usage: ["verb","adj","adv"],
		comparative: "n",
	},
	{
		base: 'never',
		usage: ["verb"],
		comparative: "n",
	},
	{
		base: 'ever',
		usage: ["verb"],
		comparative: "n",
	},
	{
		base: 'as',
		usage: ["adj"],
		comparative: "n",
	},
	{
		base: 'soon',
		usage: ["verb",'clause'],
		comparative: "sooner",
		superlative: "soonest"
	},
	{
		base: 'later',
		usage: ["verb",'clause'],
	},
	{
		base: 'instead',
		usage: ['verb','clause']
	},
	{
		base: 'together',
		usage: ['verb','clause','particle']
	}
].map(o => ({
	...o,
	order: 16
}))

export default adverbs