const verbs = [
	{
		base: 'love',
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
		particles: [],
		complements: {
			base: [
				[],
			]
		}
	},
	{
		base: 'live',
		particles: [],
		complements: {
			base: [
				[],
			]
		}
	},
	{
		base: 'work',
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
		particles: [],
		complements: {
			base: [
				[],
				['noun'],
				['noun','noun'],
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
	{
		base: 'substitute',
		particles: [],
		complements: {
			base: [
				[],
				['noun']
			]
		}
	},
	{
		base: 'provide',
		particles: [],
		complements: {
			base: [
				['noun']
			]
		}
	},
	{
		base: 'criticize',
		particles: [],
		complements: {
			base: [
				[],
				['noun']
			]
		}
	},
	{
		base: 'keep',
		past: 'kept',
		particles: ['at','back','down','in','off','on','up'],
		complements: {
			base: [
				[],
				['noun'],
				['adjective'],
				['noun','adjective'],
			],
			at: [
				['noun']
			],
			back: [
				['noun']
			],
			down: [
				['noun']
			],
			in: [
				['noun']
			],
			off: [
				['noun'],
				['noun','noun']
			],
			on: [
				['gerund']
			],
			up: [
				[],
				['noun']
			]
		}
	},
	{
		base: 'play',
		particles: ['around','along','at','back','down','off','out','on','upon',
								'with','up'],
		complements: {
			base: [
				[],
				['noun'],
				['adjective']
			],
			around: [
				[]
			],
			along: [
				[]
			],
			at: [
				['noun']
			],
			back: [
				['noun']
			],
			down: [
				['noun']
			],
			off: [
				[]
			],
			out: [
				['noun']
			],
			on: [
				['noun']
			],
			upon: [
				['noun']
			],
			with: [
				['noun']
			],
			up: [
				['noun']
			]
		}
	},
	{
		base: 'sound',
		particles: ['like','off'],
		complements: {
			base: [
				['noun'],
				['adjective']
			],
			like: [
				['noun'],
				['adjective'],
				['clause']
			],
			off: [
				[]
			]
		}	
	},
	{
		base: 'wait',
		particles: ['around','behind','in','on','out','up'],
		complements: {
			base: [
				[]
			],
			around: [
				[]
			],
			behind: [
				[]
			],
			in: [
				[]
			],
			on: [
				['noun']
			],
			out: [
				['noun']
			],
			up: [
				[]
			]
		}
	}
].map(o => ({
	...o,
	order: 14
}))

export default verbs