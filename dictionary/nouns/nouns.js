const nouns = [
	{
		type: "countable",
		base: "dog",
		plural: "dogs"
	},
	{
		type: "both",
		base: "John"
	},
	{
		type: "countable",
		base: 'park',
		plural: 'parks'
	},
	{
		type: "countable",
		base: 'child',
		plural: 'children'
	},
	{
		type: "countable",
		base: 'student',
		plural: 'students'
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
		plural: 'times'
	},
	{
		type: 'uncountable',
		base: 'water',
	},
	{
		type: "countable",
		base: 'friend',
		plural: 'friends'
	},
	{
		type: "countable",
		base: 'dogma',
		plural: 'dogmas'
	},
].map(o => ({
	...o,
	order: 1
}))

export default nouns