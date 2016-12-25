const verbs = [
	{
		base: 'love',
		progressive: 'loving',
		// complements: [
		// 	['N']
		// ]
	},
	{
		base: 'like',
		progressive: 'liking',
		// complements: [
		// 	['N']
		// ]
	},
	{
		base: 'find',
		past: 'found',
		progressive: 'finding',
		// complements: [
		// 	['N']
		// ]
	},
	{
		base: 'have',
		present: 'has',
		past: 'had',
		progressive: 'having',
		// complements: [
		// 	['N'],
		// 	['Infinitive']
		// ]
	},
	{
		base: 'want',
		progressive: 'wanting',
		complements: {
			base: [
				['noun'],
				['infinitive']
			]
		}
	},
	{
		base: 'give',
		past: 'gave',
		passive: 'given',
		progressive: 'giving',
		particles: ['up'],
		complements: {
			base: [
				['noun', 'noun'],
				['noun', 'preposition']
			],
			up: [
				[],
				['noun']
			]
		}
	},
	{
		base: 'talk',
		progressive: 'talking',
		// complements: [
		// 	['P']
		// ]
	},
	{
		base: 'live',
		progressive: 'living',
		// complements: [
		// 	[],
		// 	['P']
		// ]
	},
	{
		base: 'work',
		progressive: 'working',
		// complements: [
		// 	[],
		// 	['P']
		// ]
	},
	{
		base: 'eat',
		past: 'ate',
		passive: 'eaten',
		progressive: 'eating',
		// complements: [
		// 	[],
		// 	['N']
		// ]
	},
	{
		base: 'walk',
		progressive: 'walking',
		// complements: [
		// 	[],
		// 	['N']
		// ]
	},
	{
		base: 'tell',
		past: 'told',
		progressive: 'telling',
	},
	{
		base: 'go',
		present: 'goes',
		past: 'went',
		passive: 'gone',
		progressive: 'going',
	},
	{
		base: 'do',
		present: 'does',
		past: 'did',
		passive: 'done',
		progressive: 'doing',
	},
	{
		base: 'buy',
		past: 'bought',
		progressive: 'buying',
	},
	{
		base: 'think',
		past: 'thought',
		progressive: 'thinking',
	},
	{
		base: 'know',
		past: 'knew',
		passive: 'known',
		progressive: 'knowing',
	},
	{
		base: 'drink',
		past: 'drunk',
		progressive: 'drinking',
	},
	{
		base: 'need',
		progressive: 'needing',
	},
	{
		base: 'trap',
		past: 'trapped',
		progressive: 'trapping',
	},
	{
		base: 'let',
		past: 'let',
		progressive: 'letting',
	},
	{
		base: 'see',
		past: 'saw',
		passive: 'seen',
		progressive: 'seeing',
	},
	{
		base: 'take',
		past: 'took',
		passive: 'taken',
		progressive: 'taking',
	},
	{
		base: 'get',
		past: 'got',
		passive: 'got',
		progressive: 'getting',
	},
	{
		base: 'wake',
		past: 'woke',
		passive: 'woken',
		progressive: 'waking',
	},
	{
		base: 'say',
		past: 'said',
		progressive: 'saying',
	},
	{
		base: 'speak',
		past: 'spoke',
		passive: 'spoken',
		progressive: 'speaking',
	},
	{
		base: 'make',
		past: 'made',
		progressive: 'making',
	},
	{
		base: 'call',
		progressive: 'calling',
	},
].map(o => ({
	...o,
	order: 3
}))

export default verbs