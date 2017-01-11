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
      quantifier: null,
      determiner: null,
      adjectives: [],
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
      quantifier: null,
      determiner: null,
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
      quantifier: null,
      prepositions: [],
      nouns: [],
    }
  },
  Determiner: function(w) {
    return {
      _id: uuid.v1(),
      pos: 'Determiner',
      word: w.base,
      type: w.type,
      number: w.number,
      mass: w.mass,
      of: w.of || w.base,
      isOf: false,
      adverb: null,
      // isWh: ['what','whose','which'].includes(w.base) ? true : false
    }
  },
  Possessive: function() {
    return {
      _id: uuid.v1(),
      pos: 'Possessive',
      number: 'both',
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
        past: w.past ||
          (w.base.slice(-1) === 'e' ? `${w.base}d` : `${w.base}ed`),
        progressive: w.progressive ||
          (w.base.slice(-1) === 'e' ? `${w.base.slice(0,-1)}ing` : `${w.base}ing`),
      },
      valid_complements: w.complements,
      valid_particles: w.particles,
      complementIndex: w.complements.base[0].length === 0 ? 0 : null,
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
      valid_complements: {
        base: [
          [],
          ['noun'],
          ['adjective'],
          ['adverb'],
          ['preposition'],
          ['infinitive']
        ]
      },
      complementIndex: 0,
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
      complement: null,
      after: false,
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
        comparative: w.comparative === 'n' ? '' : w.comparative || `more ${w.base}`,
        superlative: w.superlative || `most ${w.base}`
      },
      form: 'base',
      usage: w.usage,
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
      before: false,
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
  },
  Appositive: function(w) {
    return {
      _id: uuid.v1(),
      pos: 'Appositive',
      noun: null,
      essential: false,
    }
  }
}

export default factory