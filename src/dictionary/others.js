import uuid from 'uuid';

const others = [
	{
		pos: 'To',
		base: "to",
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