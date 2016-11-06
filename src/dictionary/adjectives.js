import uuid from 'uuid';

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
	}
].map(o => {
  return {
    ...o,
    id: uuid.v4(),
    pos: 'Adjective'
  };
});

export default adjectives;

