import uuid from 'uuid';

const prepositions = [
	{
		"base": "in"
	},
	{
		"base": "to"
	},
	{
		"base": "at"
	},
	{
		"base": "than"
	},
	{
		"base": "with"
	}
].map(o => {
  return {
    ...o,
    id: uuid.v4(),
    pos: 'Preposition'
  };
});

export default prepositions;