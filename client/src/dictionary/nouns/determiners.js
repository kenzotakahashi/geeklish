import uuid from 'uuid';

const determiners = [
	{
		base: "this",
		number: "singular",
		independent: true
	},
	{
		base: "a",
		number: "singular",
		independent: false	
	},
	{
		base: "the",
		number: "both",
		independent: false			
	}
].map(o => {
  return {
    ...o,
    id: uuid.v4(),
    pos: 'Determiner'
  };
});
export default determiners;