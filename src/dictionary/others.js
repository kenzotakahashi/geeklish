import uuid from 'uuid';

const others = [
	{
		pos: 'To',
		base: "to",
	},
	{
		pos: 'Be',
		base: 'be'
	}
].map(o => {
  return {
    ...o,
    id: uuid.v4()
  };
});

export default others;