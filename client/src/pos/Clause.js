import { createWord } from './util.js'

export const Clause = {
  init: function(c) {
    this.id = c.id
    this.pos = c.pos
    this.cType = c.cType
    this.subject = createWord(c.subject)
    this.verb = createWord(c.verb)
    this.adjectiveClause = createWord(c.adjectiveClause)
    this.adverbs = c.adverbs.map(o => createWord(o))
    this.conjunction = createWord(c.conjunction)
    return this
  },
  getVerbForQuestion: function(v) {
    const s = this.subject
    const negative = v.negative ? 'not' : ''
    let head, rest

    if (!!v.modal) {
      head = v.modal
      if (v.perfect) {
        if (v.passive) {
          rest = [negative, 'have', 'been', v.word.passive]
        } else {
          if (v.continuous) {
            rest = [negative, 'have', 'been', v.word.gerund]
          } else {
            rest = [negative, 'have', v.word.passive]
          }
        }
      } else {
        if (v.passive) {
          rest = [negative, 'be', v.word.passive]
        } else {
          if (v.continuous) {
            rest = [negative, 'be', v.word.gerund]
          } else {
            rest = [negative, v.word.base]
          }
        }
      }
    } else {
      if (v.perfect) {
        head = v.past ? 'had' : s.is3s ? 'has' : 'have'
        if (v.passive) {
          rest = [negative, 'been', v.word.passive]
        } else {
          if (v.continuous) {
            rest = [negative, 'been', v.word.gerund]
          } else {
            rest = [negative, v.word.passive]
          }
        }
      } else {
        if (v.passive) {
          head = s.getBe(v.past)
          if (v.continuous) {
            rest = [negative, 'being', v.word.passive]
          } else {
            rest = [negative, v.word.passive]
          }
        } else {
          if (v.continuous) {
            head = s.getBe(v.past)
            rest = [negative, v.word.gerund]
          } else {
            head = v.past ? 'did' : s.is3s() ? 'does' : 'do'
            rest = [negative, v.word.base]
          }
        }
      }
    }
    return [head, rest]
  },
  getVerb: function(v) {
    if (v.perfect || v.continuous || !!v.modal || v.negative || v.passive) {
      const [head, rest] = this.getVerbForQuestion(v)
      return [head, ...rest]
    }
    if (v.past) {
      return [v.word['past']]
    }
    return this.subject.is3s() ? [v.word.tps] : [v.word.base]
  },
  getBeVerb: function(v) {
    const s = this.subject
    const negative = v.negative ? 'not' : ''
    let head, rest

    if (!!v.modal) {
      head = v.modal
      rest = v.perfect ? [negative, 'have', 'been'] : [negative, 'be']
    } else {
      if (v.perfect) {
        head = v.past ? 'had' : s.is3s ? 'has' : 'have'
        rest = [negative, 'been']
      } else {
        head = s.getBe(v.past)
        rest = v.continuous ? [negative, 'being'] : [negative]
      }
    }
    return [[head], rest]
  },
  reorderWh: function(clause) {
    let wh
    let newClause = []
    const list = ['Adjective','Adverb','Preposition','Noun','Pronoun','Determiner']
    for (let p of clause) {
      if (list.includes(p.pos)) {
        let [wh_, isWh] = p.getWh()
        if (!!wh_) {
          wh = wh_
        }
        if (!isWh) {
          newClause.push(p)
        }
      } else {
        newClause.push(p)
      }
    }
    const s = newClause.map(o => o.toString())
    return wh ? [wh, ...s] : s
  },
  shouldUseAn: function(word) {
    const a_specials = ['us','uni','one','once','eu']
    const an_specials = ['hour','honor','honest']
    for (const s of a_specials) {
      if (word.startsWith(s)) return false
    }
    for (const s of an_specials) {
      if (word.startsWith(s)) return true
    }
    return 'aeiou'.includes(word[0])
  },
  checkArticle: function(clause) {
    return clause.reduce((a, b) => a === 'a' && this.shouldUseAn(b) ? 'an' : a.concat(b), [])
  },
  getClause: function() {
    let s = this.subject
    let v = this.verb

    if (this.cType === 'command') {
      if (!(v && v.isValid())) return [false, '(You need a verb)']
      const negative = v.negative ? ['do not '] : []
      if (v.pos === "VerbContainer") {
        const last = v.verbs.length - 1
        let c = negative
        for (let i = 0; i < v.verbs.length; i++) {
          c.concat(v.verbs[i].getList([v.verbs[i].base]))
          if (i !== last) {
            c = c.concat(v.conjunction)
          }
        }
        return c
      } else {
        return negative.concat(v.getList([v.word.base]))
      }
    }
    if (!(s && s.isValid() && v && v.isValid())) return [false, '(You need a subject and a verb)']

    let c = s.getList()
    if (v.pos === "Be") {
      const [head, rest] = this.getBeVerb(v)
      return this.cType === 'question' && !s.isWh ?
            [...head, ...c, ...v.getList(rest)] :
            [...c, ...v.getList([...head, ...rest])]
    }
    if (v.pos === "Verb") {
      if (this.cType === 'question' && !s.isWh) {
        const [head, rest] = this.getVerbForQuestion(v)
        return [head, ...c, ...v.getList(rest)]
      } else {
        return c.concat(v.getList(this.getVerb(v)))
      }
    }
    if (v.pos === "VerbContainer") {
      const last = v.verbs.length - 1
      if (this.cType === 'question' && !s.isWh) {
        const vType = v.verbs.map(o => o.pos)
        if (vType.includes('Be') && vType.includes('Verb')) {
          return [false, "We do not support Be verb and non-Be verb in a question"]
        }
        if (vType.includes('Be')) {
          return [false, "We do not support multiple Be verbs in a question"]
        }
        const heads = []
        for (let i = 0; i < v.verbs.length; i++) {
          const [head, rest] = this.getVerbForQuestion(v.verbs[i])
          heads.push(head)
          c = c.concat(rest)
          if (i !== last) {
            c = c.concat(v.conjunction)
          }
        }
        return [heads[0], ...c]
      } else {
        for (let i = 0; i < v.verbs.length; i++) {
          let verb
          if (v.verbs[i].pos === 'Be') {
            const [head, rest] = this.getBeVerb(v.verbs[i])
            verb = v.verbs[i].getList([...head, ...rest])                 
          } else {
            verb = v.verbs[i].getList(this.getVerb(v.verbs[i]))
          }
          c = c.concat(verb)
          if (i !== last) {
            c = c.concat(v.conjunction)
          }
        }
        return c
      }
    }
  },
  // isValid: function() {
  //   let c = this.getClause()
  //   return Array.isArray(c) && c[0] !== false
  // },
  toString: function() {
    return this.print()
  },
  print: function() {
    let c = this.getClause()
    if (Array.isArray(c) && c[0] === false) {
      return c
    }
    // console.log(c)
    const beginnings = this.verb.adverbs.filter(o => o && o.position === 'beginning') 
    c = [...beginnings, ...c]
    // console.log(c)
    c = this.reorderWh(c)
    // console.log(c)
    c = this.checkArticle(c)
    c = c.map(o => o.toString()).join(' ')
    c = !!this.adjectiveClause ? `${this.adjectiveClause}, ${c}` : c
    if (this.adverbs.length > 0) {
      c = `${this.adverbs.map(o => o.toString()).join(', ')}, ${c}`
    }
    return c
  },
}

export const ClauseContainer = {
  init: function(c) {
    this.id = c.id
    this.pos = c.pos
    this.conjunction = createWord(c.conjunction)
    this.clauses = c.clauses.map(o => createWord(o))
    this.cType = this.clauses.map(o => o.cType).includes('question') ?
                 'question' : 'statement'
    return this
  },
  toString: function() {
    return this.print()
  },
  print: function() {
    // console.log(this.clauses.map(o => o.isValid()))

    if ( !(this.conjunction || this.clauses.map(o => !!o.conjunction).includes(true)) ) {
      return [false, "(You need a conjunction)"]
    }
    const clauses = this.clauses.map(o => o.print())
    if (this.clauses.length < 2 || clauses.some(o => Array.isArray(o))) {
      return [false, "(You need at least 2 clauses)"]
    }
    if (this.conjunction) {
      if (['and', 'or'].includes(this.conjunction.word)) {
        return this.clauses.map(o => o.print()).join(` ${this.conjunction} `)
      } else {
        return // TODO
      }
    }
    // subordinting
    if (!!this.clauses[0].conjunction) {
      const [dependent, independent] = this.clauses
      return `${dependent.conjunction} ${dependent.print()}, ${independent.print()}`
    } else if (!!this.clauses[1].conjunction) {
      const [independent, dependent] = this.clauses
      return `${independent.print()} ${dependent.conjunction}, ${dependent.print()}`
    } else {
      return [false, "(You need a subordinating clause)"]
    }
  }
}