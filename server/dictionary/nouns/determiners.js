const determiners = [
	{
		base: "this",
		type: 'determiner',
		number: "singular",
		mass: false,
	},
	{
		base: "that",
		type: 'determiner',
		number: "singular",
		mass: true,
	},
	{
		base: "a",
		type: 'determiner',
		number: "singular",
		mass: false,
	},
	{
	  base: 'those',
		type: 'determiner',
	  number: 'plural',
		mass: false,
	}, 
	{
		base: "the",
		type: 'determiner',
		number: "both",
		mass: true,
	},
	{
		base: 'what',
		type: 'determiner',
		number: 'both',
		mass: true,
	},
	{
		base: 'which',
		type: 'determiner',
		number: 'both',
		mass: false,
	},
	{
		base: 'whose',
		type: 'determiner',
		number: 'both',
		mass: true,
	},
	{
		base: 'every',
		type: 'quantifier',
		number: 'singular',
		mass: false,
		of: 'every one',
	},
	{
		base: "no",
		type: 'quantifier',
		number: "singular",
		mass: true,
		of: 'none'
	},
	{
		base: 'more',
		type: 'quantifier',
		number: 'plural',
		mass: true,
		of: '',
	},
	{
		base: 'some',
		type: 'quantifier',
		number: 'plural',
		mass: true,
		of: '',
	},
	{
		base: 'a little',
		type: 'quantifier',
		number: '',
		mass: true,
		of: '',
	},
	{
		base: 'a lot of',
		type: 'quantifier',
		number: 'plural',
		mass: true,
		of: 'a lot',
	},
	{
		base: 'many',
		type: 'quantifier',
		number: 'plural',
		mass: false,
		of: ''
	},
].map(o => ({
	...o,
	order: 10
}))

export default determiners