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
	}
].map(o => {
  return {
    ...o,
    id: uuid.v4()
  };
});

export default others;