import uuid from 'uuid';

const others = [
	{
		pos: 'Infinitive',
		base: 'Infinitive',
	},
	{
		pos: 'Be',
		base: 'be'
	},
	{
		pos: 'Clause',
		base: 'Clause'
	},
	{
		pos: 'NounContainer',
		base: 'NounContainer'
	},
	{
		pos: 'NounClause',
		base: 'NounClause'
	},
	{
		pos: 'AdjectiveClause',
		base: 'AdjectiveClause'
	},
	{
		pos: 'ClauseContainer',
		base: 'ClauseContainer'
	},
	{
		pos: 'VerbContainer',
		base: 'VerbContainer'		
	}
].map(o => {
  return {
    ...o,
    id: uuid.v4()
  };
});

export default others;