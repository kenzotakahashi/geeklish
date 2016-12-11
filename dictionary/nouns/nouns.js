const nouns = [
	{
		type: "countable",
		base: "dog",
	},
	{
		type: "both",
		base: "John",
	},
	{
		type: "countable",
		base: 'park',
	},
	{
		type: "countable",
		base: 'child',
		plural: 'children'
	},
	{
		type: "countable",
		base: 'student',
	},
	{
		type: 'both',
		base: 'life',
		plural: 'lives'
	},
	{
		type: "countable",
		base: 'person',
		plural: 'people'
	},
	{
		type: 'both',
		base: 'lunch',
		plural: 'lunches'
	},
	{
		type: 'both',
		base: 'time',
	},
	{
		type: 'uncountable',
		base: 'water',
	},
	{
		type: "countable",
		base: 'friend',
	},
	{
		type: "countable",
		base: 'dogma',
	},
].map(o => ({
	...o,
	order: 1
}))

export default nouns