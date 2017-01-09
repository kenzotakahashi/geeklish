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
	{
		type: "countable",
		base: "man",
		plural: "men"
	},
	{
		type: "countable",
		base: "brother",
	},
	{
		type: "countable",
		base: "architect",
	},
	{
		type: 'uncountable',
		base: 'Chinese',
	},
	{
		type: 'uncountable',
		base: 'China',
	},
	{
		type: "countable",
		base: 'T-shirt',
	},
	{
		type: "countable",
		base: "option"
	},
	{
		type: "both",
		base: "proxy",
		plural: 'proxies'
	},
	{
		type: "both",
		base: "yum"
	},
	{
		type: "countable",
		base: "repository",
		plural: "repositories"
	},
	{
		type: "countable",
		base: "URL"
	},
	{
		type: "both",
		base: "base"
	},
	{
		type: 'countable',
	  base: 'one',
	},
	{
		type: 'countable',
		base: 'birthday'
	},
	{
		type: 'countable',
		base: 'page'
	},
	{
		type: 'countable',
		base: 'kernel'
	},
	{
		type: 'countable',
		base: 'patch',
		plural: 'patches'
	},
	{
		type: 'countable',
		base: 'verb' 
	},
	{
		type: 'countable',
		base: 'object'
	},
	{
		type: 'uncountable',
		base: 'fun'
	},
	{
		type: 'countable',
		base: 'guest'
	}
].map(o => ({
	...o,
	order: 2
}))

export default nouns