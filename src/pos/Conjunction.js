const Conjunction = {
  init: function(p) {
    this.id = p.id
    this.pos = p.pos
    this.word = p.word
    this.type = p.type
    return this
  },
  toString: function() {
    return this.word
  },
}

export default Conjunction