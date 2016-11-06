import uuid from 'uuid';

const verbs = [
	{
		base: 'love',
		'3s': 'loves',
		past: 'loved',
		gerund: 'loving',
		complements: [
			['N']
		]
	},
	{
		base: 'like',
		'3s': 'likes',
		past: 'liked',
		gerund: 'liking',
		complements: [
			['N']
		]
	},
	{
		base: 'find',
		'3s': 'finds',
		past: 'found',
		gerund: 'finding',
		complements: [
			['N']
		]
	},
	{
		base: 'have',
		'3s': 'has',
		past: 'had',
		gerund: 'having',
		complements: [
			['N'],
			['To']
		]
	},
	{
		base: 'give',
		'3s': 'gives',
		past: 'gave',
		passive: 'given',
		gerund: 'giving',
		complements: [
			['N', 'N'],
			['N', 'P']
		]
	},
	{
		base: 'talk',
		'3s': 'talks',
		past: 'talked',
		gerund: 'talking',
		complements: [
			['P']
		]
	},
	{
		base: 'live',
		'3s': 'lives',
		past: 'lived',
		gerund: 'living',
		complements: [
			[],
			['P']
		]
	},
	{
		base: 'work',
		'3s': 'works',
		past: 'worked',
		gerund: 'working',
		complements: [
			[],
			['P']
		]
	},
	{
		base: 'eat',
		'3s': 'eats',
		past: 'ate',
		passive: 'eaten',
		gerund: 'eating',
		complements: [
			[],
			['N']
		]
	},
	{
		base: 'walk',
		'3s': 'walks',
		past: 'walked',
		gerund: 'walking',
		complements: [
			[],
			['N']
		]
	}
].map(o => {
  return {
    ...o,
    id: uuid.v4(),
    pos: 'Verb',
  };
});

export default verbs;
