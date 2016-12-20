const verbs = [
	{
		base: 'love',
		tps: 'loves',
		past: 'loved',
		gerund: 'loving',
		// complements: [
		// 	['N']
		// ]
	},
	{
		base: 'like',
		tps: 'likes',
		past: 'liked',
		gerund: 'liking',
		// complements: [
		// 	['N']
		// ]
	},
	{
		base: 'find',
		tps: 'finds',
		past: 'found',
		gerund: 'finding',
		// complements: [
		// 	['N']
		// ]
	},
	{
		base: 'have',
		tps: 'has',
		past: 'had',
		gerund: 'having',
		// complements: [
		// 	['N'],
		// 	['Infinitive']
		// ]
	},
	{
		base: 'want',
		tps: 'wants',
		past: 'wanted',
		gerund: 'wanting',
		// complements: [
		// 	['N'],
		// 	['Infinitive']
		// ]
	},
	{
		base: 'give',
		tps: 'gives',
		past: 'gave',
		passive: 'given',
		gerund: 'giving',
		// complements: [
		// 	['N', 'N'],
		// 	['N', 'P']
		// ]
	},
	{
		base: 'talk',
		tps: 'talks',
		past: 'talked',
		gerund: 'talking',
		// complements: [
		// 	['P']
		// ]
	},
	{
		base: 'live',
		tps: 'lives',
		past: 'lived',
		gerund: 'living',
		// complements: [
		// 	[],
		// 	['P']
		// ]
	},
	{
		base: 'work',
		tps: 'works',
		past: 'worked',
		gerund: 'working',
		// complements: [
		// 	[],
		// 	['P']
		// ]
	},
	{
		base: 'eat',
		tps: 'eats',
		past: 'ate',
		passive: 'eaten',
		gerund: 'eating',
		// complements: [
		// 	[],
		// 	['N']
		// ]
	},
	{
		base: 'walk',
		tps: 'walks',
		past: 'walked',
		gerund: 'walking',
		// complements: [
		// 	[],
		// 	['N']
		// ]
	},
	{
		base: 'tell',
		tps: 'tells',
		past: 'told',
		gerund: 'telling',
	},
	{
		base: 'go',
		tps: 'goes',
		past: 'went',
		passive: 'gone',
		gerund: 'going',
	},
	{
		base: 'do',
		tps: 'does',
		past: 'did',
		passive: 'done',
		gerund: 'doing',
	},
	{
		base: 'buy',
		tps: 'buys',
		past: 'bought',
		gerund: 'buying',
	},
	{
		base: 'think',
		tps: 'thinks',
		past: 'thought',
		gerund: 'thinking',
	},
	{
		base: 'know',
		tps: 'knows',
		past: 'knew',
		passive: 'known',
		gerund: 'knowing',
	},
	{
		base: 'drink',
		tps: 'drinks',
		past: 'drunk',
		gerund: 'drinking',
	},
	{
		base: 'need',
		tps: 'needs',
		past: 'needed',
		gerund: 'needing',
	},
	{
		base: 'trap',
		tps: 'traps',
		past: 'trapped',
		gerund: 'trapping',
	},
	{
		base: 'let',
		tps: 'lets',
		past: 'let',
		gerund: 'letting',
	},
	{
		base: 'see',
		tps: 'sees',
		past: 'saw',
		passive: 'seen',
		gerund: 'seeing',
	},
	{
		base: 'take',
		tps: 'takes',
		past: 'took',
		passive: 'taken',
		gerund: 'taking',
	},
	{
		base: 'get',
		tps: 'gets',
		past: 'got',
		passive: 'got',
		gerund: 'getting',
	},
	{
		base: 'wake',
		tps: 'wakes',
		past: 'woke',
		passive: 'woken',
		gerund: 'waking',
	},
	{
		base: 'say',
		tps: 'says',
		past: 'said',
		gerund: 'saying',
	},
	{
		base: 'speak',
		tps: 'speaks',
		past: 'spoke',
		passive: 'spoken',
		gerund: 'speaking',
	},
	{
		base: 'make',
		tps: 'makes',
		past: 'made',
		gerund: 'making',
	},
].map(o => ({
	...o,
	order: 3
}))

export default verbs