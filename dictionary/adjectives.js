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
	},
	{
		"base": "hard",
		"comparative": "harder",
		"superlative": "hardest"
	},
	{
		"base": 'hungry'
	},
	{
		'base': 'tired'
	}
].map(o => ({
	...o,
	order: 4
}))

export default adjectives
