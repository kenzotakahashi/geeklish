import uuid from 'uuid'

const factory = {
  Pronoun: function(w, arg) {
    const init = {
      _id: uuid.v1(),
      pos: 'Pronoun',
      word: {
        nominative: w.base,
        accusative: w.a || w.base,
        possessive: w.p || null,
        reflexive: w.r || null,
      },
      person: w.person || null,
      number: w.number || 'singular',
      form: arg.form || 'nominative',
      adjectives: [],
      prepositions: [],
      isWh: ['what','who','which'].includes(w.base) ? true : false
    }
    init.word['possessive pronoun'] = w.pp || init.word.possessive
    return init
  },
  Noun: function(w) {
    const init = {
      _id: uuid.v1(),
      pos: 'Noun',
      type: w.type,
      word: {
        singular: w.base,
        plural: w.type === 'uncountable' ? w.base : w.plural || `${w.base}s`, 
      },
      person: null,
      number: 'singular',
      isWh: false,
      adjectives: [],
      adjectivesAfter: [],
      determiners: [],
      prepositions: [],
      nouns: []
    }
    return init
  },
  NounContainer: function(w, arg) {
    return {
      _id: uuid.v1(),
      pos: 'NounContainer',
      person: null,
      number: 'plural',
      isWh: false,
      adjectives: [],
      adjectivesAfter: [],
      determiners: [],
      prepositions: [],
      nouns: [arg.child],
      conjunction: null,
    }
  },
  NounClause: function() {
    return {
      _id: uuid.v1(),
      pos: 'NounClause',
      person: null,
      number: 'singular',
      isWh: false,
      that: false,
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
      _id: uuid.v1(),
      pos: 'Determiner',
      word: w.base,
      number: w.number,
      adverb: null,
      // isWh: ['what','whose','which'].includes(w.base) ? true : false
    }
  },
  Possessive: function() {
    return {
      _id: uuid.v1(),
      pos: 'Possessive',
      noun: null,
    }
  },
  Verb: function(w, arg) {
    const init = {
      _id: uuid.v1(),
      pos: 'Verb',
      word: {
        base: w.base,
        present: w.present || `${w.base}s`, 
        past: w.past || `${w.base}ed`,
        progressive: w.progressive 
      },
      valid_complements: w.complements,
      form: arg.form || 'base',
      negative: false,
      past: false,
      continuous: false,
      perfect: false,
      passive: false,
      modal: '',
      particle: null,
      complements: [],
      adverbs: [],
      prepositions: [],
    }
    init.word.passive = w.passive || init.word.past
    return init
  },
  Be: function(w, arg) {
    return {
      _id: uuid.v1(),
      pos: 'Be',
      word: {
        base: 'be',
        first: 'am',
        present: 'is',
        plural: 'are',
        past_s: 'was',
        past_p: 'were',
        past: null,
        passive: 'been',
        progressive: 'being'
      },
      valid_complements: [],
      form: arg.form || 'base',
      negative: false,
      modal: '',
      past: false,
      perfect: false,
      continuous: false,
      complements: [],
      adverbs: [],
      prepositions: []
    }
  },
  VerbContainer: function(w, arg) {
    return {
      _id: uuid.v1(),
      pos: 'VerbContainer',
      valid_complements: null,
      form: arg.form || null,
      negative: false,
      past: false,
      continuous: false,
      perfect: false,
      passive: false,
      modal: '',
      complements: [],
      adverbs: [],
      prepositions: [],
      verbs: arg.child ? [arg.child] : [],
      conjunction: null
    }
  },
  Adjective: function(w) {
    return {
      _id: uuid.v1(),
      pos: 'Adjective',
      word: {
        base: w.base,
        comparative: w.comparative || `more ${w.base}`,
        superlative: w.superlative || `most ${w.base}`
      },
      form: 'base',
      adverbs: [],
      prepositions: [],
      isWh: false
    }
  },
  AdjectiveClause: function(w) {
    return {
      _id: uuid.v1(),
      pos: 'AdjectiveClause',
      clause: null,
      isWh: false
    }
  },
  Adverb: function(w) {
    return {
      _id: uuid.v1(),
      pos: 'Adverb',
      word: {
        base: w.base,
        comparative: w.comparative === 'n' ? false : w.comparative || `more ${w.base}`,
        superlative: w.superlative || `most ${w.base}`
      },
      form: 'base',
      canModifyVerb: w.canModify.includes('verb'),
      canModifyAdj: w.canModify.includes('adj'),
      canModifyAdv: w.canModify.includes('adv'),
      canModifyDet: w.canModify.includes('det'),
      canModifyClause: w.canModify.includes('clause'),
      position: 'before',
      adverb: null,
      isWh: ['when','where','how','why'].includes(w.base) ? true : false
    }
  },
  AdverbClause: function(w) {
    return {
      _id: uuid.v1(),
      pos: 'AdverbClause',
      conjunction: null,
      clause: null,
      position: 'after',
      isWh: false
    }
  },
  Preposition: function(w, arg) {
    return {
      _id: uuid.v1(),
      pos: 'Preposition',
      word: w.base,
      complement: null,
      before: arg.before || false,
      isWh: false
    }
  },
  Infinitive: function() {
    return {
      _id: uuid.v1(),
      pos: 'Infinitive',
      word: 'to',
      verb: null,
      omit: false,
    }
  },
  Gerund: function() {
    return {
      _id: uuid.v1(),
      pos: 'Gerund',
      verb: null
    }
  },
  Participle: function() {
    return {
      _id: uuid.v1(),
      pos: 'Participle',
      verb: null,
      form: 'present',
      beginning: false,
    }
  },
  Clause: function() {
    return {
      _id: uuid.v1(),
      pos: 'Clause',
      cType: 'statement',
      subject: null,
      verb: null,
      adjective: null,
      adverbs: [],
    }
  },
  ClauseContainer: function(w, arg) {
    return {
      _id: uuid.v1(),
      pos: 'ClauseContainer',
      conjunction: null,
      clauses: [arg.child],
    }
  },
  Conjunction: function(w) {
    return {
      _id: uuid.v1(),
      pos: 'Conjunction',
      word: w.base,
      type: w.type
    }
  }
}

export default factory