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
    number: 'singular' 
  },
  {
    base: 'it',
    person: 3,
    number: 'singular'
  },
  {
    base: 'what',
    person: 3,
    number: 'singular'
  },
  {
    base: 'who',
    person: 3,
    number: 'singular'
  },
  {
    base: 'that',
    person: 3,
    number: 'singular'
  },
  {
    base: 'which',
    person: 3,
    number: 'singular'
  },
].map(o => ({
  ...o,
  order: 2
}))

export default pronouns