const verbs = [
	{
		base: 'love',
		progressive: 'loving',
		particles: [],
		complements: {
			base: [
				['noun'],
				['clause']
			]
		}
	},
	{
		base: 'like',
		progressive: 'liking',
		particles: [],
		complements: {
			base: [
				['noun'],
				['clause']
			]
		}
	},
	{
		base: 'find',
		past: 'found',
		progressive: 'finding',
		particles: ['out'],
		complements: {
			base: [
				['noun'],
				['clause'],
				['noun','noun'],
			],
			out: [
				[],
				['noun'],
				['clause']
			]
		}
	},
	{
		base: 'have',
		present: 'has',
		past: 'had',
		progressive: 'having',
		particles: [],
		complements: {
			base: [
				['noun'],
				['infinitive'],
			]
		}
	},
	{
		base: 'want',
		progressive: 'wanting',
		particles: [],
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
		particles: [],
		complements: {
			base: [
				[],
			]
		}
	},
	{
		base: 'live',
		progressive: 'living',
		particles: [],
		complements: {
			base: [
				[],
			]
		}
	},
	{
		base: 'work',
		progressive: 'working',
		particles: ['out'],
		complements: {
			base: [
				[],
			],
			out: [
				[],
			]
		}
	},
	{
		base: 'eat',
		past: 'ate',
		passive: 'eaten',
		progressive: 'eating',
		particles: ['out'],
		complements: {
			base: [
				[],
				['noun']
			],
			out: [
				[]
			]
		}
	},
	{
		base: 'walk',
		progressive: 'walking',
		particles: ['away','down'],
		complements: {
			base: [
				[],
				['noun']
			],
			away: [
				[]
			],
			down: [
				[]
			]
		}
	},
	{
		base: 'tell',
		past: 'told',
		progressive: 'telling',
		particles: [],
		complements: {
			base: [
				[],
				['noun'],
				['noun','clause'],
				['clause']
			],
		}
	},
	{
		base: 'go',
		present: 'goes',
		past: 'went',
		passive: 'gone',
		progressive: 'going',
		particles: ['on','up','down','about','after','against','ahead','through',
								'over','out','around','by'],
		complements: {
			base: [
				[],
				['noun'],
				['adjective'],
			],
			on: [
				[]
			],
			up: [
				[],
				['noun']
			],
			down: [
				[],
				['noun']
			],
			about: [
				['noun']
			],
			after: [
				['noun']
			],
			against: [
				['noun']
			],
			ahead: [
				[]
			],
			'through': [
				['noun']
			],
			'over': [
				[],
				['noun']
			],
			'out': [
				[]
			],
			'by': [
				[],
				['noun']
			]
		}
	},
	{
		base: 'do',
		present: 'does',
		past: 'did',
		passive: 'done',
		progressive: 'doing',
		particles: [],
		complements: {
			base: [
				[],
				['noun']
			],
		}
	},
	{
		base: 'buy',
		past: 'bought',
		progressive: 'buying',
		particles: ['into'],
		complements: {
			base: [
				[],
				['noun'],
				['noun','noun']
			],
			into: [
				['noun']
			],
		}
	},
	{
		base: 'think',
		past: 'thought',
		progressive: 'thinking',
		particles: [],
		complements: {
			base: [
				[],
				['noun'],
				['clause'],
				['adjective']
			],
		}
	},
	{
		base: 'know',
		past: 'knew',
		passive: 'known',
		progressive: 'knowing',
		particles: [],
		complements: {
			base: [
				[],
				['noun'],
				['clause']
			],
		}
	},
	{
		base: 'drink',
		past: 'drunk',
		progressive: 'drinking',
		particles: ['up'],
		complements: {
			base: [
				[],
				['noun']
			],
			up: [
				[],
				['noun']
			],
		}
	},
	{
		base: 'need',
		progressive: 'needing',
		particles: [],
		complements: {
			base: [
				[],
				['noun'],
				['infinitive'],
				['noun','infinitive']
			],
		}
	},
	{
		base: 'trap',
		past: 'trapped',
		progressive: 'trapping',
		particles: [],
		complements: {
			base: [
				['noun']
			],
		}
	},
	{
		base: 'let',
		past: 'let',
		progressive: 'letting',
		particles: [],
		complements: {
			base: [
				['noun','infinitive'],
			],
		}
	},
	{
		base: 'see',
		past: 'saw',
		passive: 'seen',
		progressive: 'seeing',
		particles: ['through'],
		complements: {
			base: [
				[],
				['noun'],
				['clause']
			],
			through: [
				['noun']
			],
		}
	},
	{
		base: 'take',
		past: 'took',
		passive: 'taken',
		progressive: 'taking',
		particles: ['over','up','away','off','into'],
		complements: {
			base: [
				['noun'],
				['noun','adverb']
			],
			over: [
				[],
				['noun']
			],
			up: [
				[],
				['noun']
			],
			away: [
				[],
				['noun']
			],
			off: [
				[],
				['noun']
			],
			into: [
				['noun','noun']
			]
		}
	},
	{
		base: 'get',
		past: 'got',
		passive: 'got',
		progressive: 'getting',
		particles: ['across','away','along','around','back','behind','by','down','in',
		            'into','off','on','out','over','up'],
		complements: {
			base: [
				['noun'],
				['adverb'],
				['adjective'],
				['noun','noun']
			],
			across: [
				['noun']
			],
			away: [
				[]
			],
			along: [
				[]
			],
			around: [
				[],
				['noun']
			],
			back: [
				[],
				['noun']
			],
			behind: [
				[],
				['noun']
			],
			by: [
				[]
			],
			down: [
				[]
			],
			in: [
				[]
			],
			into: [
				[]
			],
			off: [
				[],
				['noun']
			],
			on: [
				[],
				['noun']
			],
			out: [
				[],
				['noun']
			],
			over: [
				['noun']
			],
			through: [
				['noun']
			],
			up: [
				[]
			]
		}
	},
	{
		base: 'wake',
		past: 'woke',
		passive: 'woken',
		progressive: 'waking',
		particles: ['up'],
		complements: {
			base: [
				[],
				['noun']
			],
			up: [
				[],
				['noun']
			],
		}
	},
	{
		base: 'say',
		past: 'said',
		progressive: 'saying',
		particles: [],
		complements: {
			base: [
				[],
				['noun'],
				['clause']
			],
		}
	},
	{
		base: 'speak',
		past: 'spoke',
		passive: 'spoken',
		progressive: 'speaking',
		particles: ['up'],
		complements: {
			base: [
				[],
				['noun']
			],
			up: [
				[]
			],
		}
	},
	{
		base: 'make',
		past: 'made',
		progressive: 'making',
		particles: ['out','up'],
		complements: {
			base: [
				['noun'],
				['noun','infinitive']
			],
			out: [
				[],
				['noun']
			],
			up: [
				['noun']
			]
		}
	},
	{
		base: 'call',
		progressive: 'calling',
		particles: ['back'],
		complements: {
			base: [
				[],
				['noun'],
				['noun','noun']
			],
			back: [
				[],
				['noun']
			],
		}
	},
].map(o => ({
	...o,
	order: 3
}))

export default verbs