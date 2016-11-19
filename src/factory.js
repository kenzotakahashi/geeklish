import uuid from 'uuid'

const factory = {
  Pronoun: function(w, arg) {
    const init = {
      id: uuid.v4(),
      pos: 'Pronoun',
      word: {
        n: w.base,
        a: w.a || w.base,
        p: w.p || null,
        r: w.r || null,
      },
      person: w.person || null,
      number: w.number || 'singular',
      mode: arg ? arg.mode : 'n',
      isWh: ['what','who','which'].includes(w.base) ? true : false
    }
    init.word.pp = w.pp || init.word.p
    return init
  },
  Noun: function(w) {
    const init = {
      id: uuid.v4(),
      pos: 'Noun',
      type: w.type,
      word: {
        singular: w.base,
        plural: w.plural || w.base, 
      },
      person: null,
      number: 'singular',
      mode: 'singular',
      isWh: false,
      adjectives: [],
      adjectivesAfter: [],
      determiners: [],
      prepositions: [],
      nouns: []
    }
    init.word.p = init.number === 'singular' ? `${init.word.singular}'s` :
                  `${init.word.plural}${init.word.plural[-1] === 's' ? "'" : "'s"}`
    return init
  },
  NounContainer: function() {
    return {
      id: uuid.v4(),
      pos: 'NounContainer',
      person: null,
      number: 'plural',
      isWh: false,
      adjectives: [],
      adjectivesAfter: [],
      determiners: [],
      prepositions: [],
      nouns: [],
      conjunction: null,
    }
  },
  NounClause: function() {
    return {
      id: uuid.v4(),
      pos: 'NounClause',
      person: null,
      number: 'singular',
      isWh: false,
      clause: null,
      adjectives: [],
      adjectivesAfter: [],
      determiners: [],
      prepositions: [],
      nouns: [],
    }
  },
  Determiner: function(w) {
    return {
      id: uuid.v4(),
      pos: 'Determiner',
      word: w.base,
      number: w.number,
      independent: w.independent,
      isWh: ['what','whose','which'].includes(w.base) ? true : false
    }
  },
  Verb: function(w, arg) {
    const init = {
      id: uuid.v4(),
      pos: 'Verb',
      word: {
        base: w.base,
        '3s': w['3s'],
        past: w.past,
        gerund: w.gerund 
      },
      valid_complements: w.complements,
      mode: arg ? arg.mode : 'base',
      negative: false,
      past: false,
      continuous: false,
      perfect: false,
      passive: false,
      modal: '',
      complements: [],
      predicate: null,
      adverbs: [],
      prepositions: [],
    }
    init.word.passive = w.passive || init.word.past
    return init
  },
  Be: function(w, arg) {
    return {
      id: uuid.v4(),
      pos: 'Be',
      word: {
        base: 'be',
        '1s': 'am',
        '3s': 'is',
        'plural': 'are',
        'past_s': 'was',
        'past_p': 'were',
        'past': null,
        'passive': 'been',
        'gerund': 'being'
      },
      valid_complements: [],
      mode: arg ? arg.mode : 'base',
      negative: false,
      modal: '',
      past: false,
      perfect: false,
      continuous: false,
      complements: [],
      adverbs: [],
      predicate: null,
      prepositions: []
    }
  },
  VerbContainer: function() {
    return {
      id: uuid.v4(),
      pos: 'VerbContainer',
      valid_complements: null,
      mode: null,
      negative: false,
      past: false,
      continuous: false,
      perfect: false,
      passive: false,
      modal: '',
      complements: [],
      predicate: null,
      adverbs: [],
      prepositions: [],
      verbs: [],
      conjunction: null
    }
  },
  Adjective: function(w) {
    return {
      id: uuid.v4(),
      pos: 'Adjective',
      word: {
        base: w.base,
        comparative: w.comparative || w.base,
        superlative: w.superlative || w.base
      },
      mode: 'base',
      adverbs: [],
      prepositions: [],
      isWh: false
    }
  },
  AdjectiveClause: function(w) {
    return {
      id: uuid.v4(),
      pos: 'AdjectiveClause',
      clause: null,
      isWh: false
    }
  },
  Adverb: function(w) {
    return {
      id: uuid.v4(),
      pos: 'Adverb',
      word: w.base,
      canModifyVerb: w.canModify.includes('verb'),
      canModifyAdj: w.canModify.includes('adj'),
      canModifyAdv: w.canModify.includes('adv'),
      canModifyDet: w.canModify.includes('det'),
      canModifyClause: w.canModify.includes('clause'),
      position: 'before',
      adverb: null,
      isWh: false
    }
  },
  Preposition: function(w) {
    return {
      id: uuid.v4(),
      pos: 'Preposition',
      word: w.base,
      complement: null,
      isWh: false
    }
  },
  To: function() {
    return {
      id: uuid.v4(),
      pos: 'To',
      word: 'to',
      verb: null
    }
  },
  Clause: function() {
    return {
      id: uuid.v4(),
      pos: 'Clause',
      cType: 'statement',
      subject: null,
      verb: null,
      adjectiveClause: null,
      adverbs: [],
      conjunction: null,
    }
  },
  ClauseContainer: function() {
    return {
      id: uuid.v4(),
      pos: 'ClauseContainer',
      conjunction: null,
      clauses: [],
    }
  },
  Conjunction: function(w) {
    return {
      id: uuid.v4(),
      pos: 'Conjunction',
      word: w.base,
      type: w.type
    }
  }
}

export default factory