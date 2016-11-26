import mongoose from 'mongoose'
import { Dictionary, PronounDic, NounDic, DeterminerDic, VerbDic, AdjectiveDic,
         AdverbDic, ConjunctionDic, PrepositionDic, InfinitiveDic, BeDic, ClauseDic, NounContainerDic,
         NounClauseDic, AdjectiveClauseDic, ClauseContainerDic, VerbContainerDic } from './models/models'

import verb from './dictionary/verbs/verbs.js'
import determiner from './dictionary/nouns/determiners.js'
import noun from './dictionary/nouns/nouns.js'
import pronoun from './dictionary/nouns/pronouns.js'
import adjective from './dictionary/adjectives.js'
import preposition from './dictionary/prepositions.js'
import adverb from './dictionary/adverbs.js'
import others from './dictionary/others.js'
import conjunction from './dictionary/conjunctions.js'

const DicPos = {
  Infinitive: InfinitiveDic,
  Be: BeDic,
  Clause: ClauseDic,
  NounContainer: NounContainerDic,
  NounClause: NounClauseDic,
  AdjectiveClause: AdjectiveClauseDic,
  ClauseContainer: ClauseContainerDic,
  VerbContainer: VerbContainerDic
}

function insertDics() {
  for (let e of verb) {
    const w = new VerbDic(e)
    w.save((err, element) => {
      if (err) return console.error(err)
    })
  }
  for (let e of determiner) {
    const w = new DeterminerDic(e)
    w.save((err, element) => {
      if (err) return console.error(err)
    })
  }
  for (let e of noun) {
    const w = new NounDic(e)
    w.save((err, element) => {
      if (err) return console.error(err)
    })
  }
  for (let e of pronoun) {
    const w = new PronounDic(e)
    w.save((err, element) => {
      if (err) return console.error(err)
    })
  }
  for (let e of adjective) {
    const w = new AdjectiveDic(e)
    w.save((err, element) => {
      if (err) return console.error(err)
    })
  }
  for (let e of preposition) {
    const w = new PrepositionDic(e)
    w.save((err, element) => {
      if (err) return console.error(err)
    })
  }
  for (let e of adverb) {
    const w = new AdverbDic(e)
    w.save((err, element) => {
      if (err) return console.error(err)
    })
  }
  for (let e of conjunction) {
    const w = new ConjunctionDic(e)
    w.save((err, element) => {
      if (err) return console.error(err)
    })
  }
  for (let e of others) {
    const w = new DicPos[e.pos](e)
    w.save((err, element) => {
      if (err) return console.error(err)
    })
  }
}

mongoose.connect('mongodb://localhost/geeklish')
mongoose.Promise = global.Promise

const db = mongoose.connection
db.collection('dictionaries').deleteMany({})

insertDics()

mongoose.disconnect()