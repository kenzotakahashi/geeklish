import uuid from 'uuid'

const conjunctions = [
	{
		base: "and",
		type: "coordinating"
	},
	{
		base: "if",
		type: "subordinating"
	},
	{
		base: "when",
		type: "subordinating"
	},
].map(o => {
  return {
    ...o,
    id: uuid.v4(),
    pos: 'Conjunction'
  }
})

export default conjunctions