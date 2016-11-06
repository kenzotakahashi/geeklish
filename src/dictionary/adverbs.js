import uuid from 'uuid';

const adverbs = [
	{
		base: "really",
		can_modify: ["verb","adj","adv","clause"]
	},
	{
		base: "quickly",
		can_modify: ["verb","adj","adv","clause"]
	},
	{
		base: "hopefully",
		can_modify: ["verb","adj","adv","clause"]
	},
	{
		base: "why",
		can_modify: ["verb"]
	},
	{
		base: "how",
		can_modify: ["verb", "adj", "adv"]
	},
	{
		base: "when",
		can_modify: ["verb", "adj", "adv"]
	},
	{
		base: "where",
		can_modify: ["verb", "adj"]
	},
	{
		base: "nearly",
		can_modify: ["verb","adj","adv","det","clause"]
	}
].map(o => {
  return {
    ...o,
    id: uuid.v4(),
    pos: 'Adverb'
  };
});

export default adverbs;

