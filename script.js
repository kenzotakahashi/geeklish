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

mongoose.connect('mongodb://localhost/geeklish')
mongoose.Promise = global.Promise

const db = mongoose.connection

for (let e of verb) {
  // const w = new VerbDic(e)
  // w.save((err, element) => {
  //   if (err) return console.error(err)
  // })
  VerbDic.findOne({base: e.base}, (err, result) => {
    if (err) return console.error(err)
    if (result === null) {
      const w = new VerbDic(e)
      w.save().then((element) => {
        console.log(element)
      })
    }
  })
}

// const I_ = {
//   base: 'I',
//   a: 'me',
//   p: 'my',
//   pp: 'mine',
//   r: 'myself',
//   person: 1,
//   number: 'singular'
// }
// const I = new PronounDic(I_)
// I.save((err, element) => {
//   if (err) return console.error(err)
//   console.log(element)
// })
// PronounDic.findOne({base: 'Ie'}, (err, elements) => {
//   if (err) return console.error(err)
//   console.log(elements)
// })

mongoose.disconnect()