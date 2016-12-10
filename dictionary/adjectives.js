const adjectives = [
	{
		base: "good",
		comparative: "better",
		superlative: "best"
	},
	{
		base: "important"
	},
	{
		base: "honest"
	},
	{
		base: "young",
		comparative: "younger",
		superlative: "youngest"
	},
	{
		base: "old",
		comparative: "older",
		superlative: "oldest"
	},
	{
		base: "hard",
		comparative: "harder",
		superlative: "hardest"
	},
	{
		base: 'hungry'
	},
	{
		base: 'tired'
	}
].map(o => ({
	...o,
	order: 5
}))

export default adjectives
