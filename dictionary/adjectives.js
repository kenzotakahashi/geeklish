const adjectives = [
	{
		"base": "good",
		"comparative": "better",
		"superlative": "best"
	},
	{
		"base": "important"
	},
	{
		"base": "honest"
	},
	{
		"base": "old",
		"comparative": "older",
		"superlative": "oldest"
	}
].map(o => ({
	...o,
	order: 4
}))

export default adjectives
