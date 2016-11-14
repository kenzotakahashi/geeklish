import { createWord } from './util.js'

const Clause = {
  init: function(c) {
    this.id = c.id
    this.pos = c.pos
    this.c_type = c.c_type
    this.subject = createWord(c.subject)
    this.verb = createWord(c.verb)
    this.adjectiveClause = c.adjectiveClause
    this.adverbs = c.adverbs
    this.conjunction = c.conjunction
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
    return this.subject.is3s() ? [v.word['3s']] : [v.word['base']]
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
    for (const p of clause) {
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

    if (this.c_type === 'command') {
      if (!v) return '(You need a verb)'
      const negative = v.negative ? ['do not '] : []
      return negative.concat(v.getList([v.word.base]))
    }
    if (!s || !v) return '(You need a subject and a verb)'

    let c = s.getList()
    if (v.pos === "Be") {
      const [head, rest] = this.getBeVerb(v)
      return this.c_type === 'question' && !s.isWh ?
            [...head, ...c, ...v.getList(rest)] :
            [...c, ...v.getList([...head, ...rest])]
    }
    if (v.pos === "Verb") {
      if (this.c_type === 'question' && !s.isWh) {
        const [head, rest] = this.getVerbForQuestion(v)
        return [head, ...c, ...v.getList(rest)]
      } else {
        return c.concat(v.getList(this.getVerb(v)))
      }
    }
  },
  capitalize: function(s) {
    return s[0].toUpperCase() + s.slice(1)
  },
  punctuation: function() {
    return this.c_type === 'question' ? '?' : '.'
  },
  sentence: function(c) {
    return this.capitalize(c + this.punctuation())
  },
  print: function() {
    let c = this.getClause()
    if (typeof(c) === 'string') {
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
    return this.sentence(c)
  },
}

export default Clause