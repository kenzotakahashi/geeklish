const pronouns = [
  {
    base: "there"      
  },
  {
    base: 'he',
    a: 'him',
    p: 'his',
    r: 'himself',
    person: 3,
    number: 'singular'
  },
  {
    base: 'she',
    a: 'her',
    p: 'her',
    pp: 'hers',
    r: 'herself',
    person: 3,
    number: 'singular'
  },
  {
    base: 'I',
    a: 'me',
    p: 'my',
    pp: 'mine',
    r: 'myself',
    person: 1,
    number: 'singular'
  },
  {
    base: 'you',
    a: 'you',
    p: 'your',
    pp: 'yours',
    r: 'yourself',
    person: 2,
    number: 'plural' 
  },
  {
    base: 'we',
    a: 'us',
    p: 'our',
    pp: 'ours',
    r: 'ourselves',
    person: 1,
    number: 'plural' 
  },
  {
    base: 'they',
    a: 'them',
    p: 'their',
    pp: 'theirs',
    r: 'themselves',
    person: 3,
    number: 'plural' 
  },
  {
    base: 'it',
    a: 'it',
    p: 'its',
    pp: 'its',
    r: 'itself',
    person: 3,
    number: 'singular'
  },
  {
    base: 'this',
    person: 3,
    number: 'singular'
  },
  {
    base: 'that',
    person: 3,
    number: 'singular'
  },
  {
    base: 'what',
    person: 3,
  },
  {
    base: 'who',
    person: 3,
  },
  {
    base: 'which',
    person: 3,
  },
  {
    base: 'something',
    person: 3,
  },
  {
    base: 'anything',
    person: 3,
  },
  {
    base: 'someone',
    person: 3,
  },
  {
    base: 'nothing',
    person: 3,
  },
  {
    base: 'each other',
    person: 3,
  }
].map(o => ({
  ...o,
  order: 11
}))

export default pronouns