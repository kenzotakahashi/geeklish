const Pronoun = function(p, state) {
  this.id = p.id;
  this.pos = p.pos;
  this.word = p.word;
  this.person = p.person;
  this.number = p.number;
  this.mode = p.mode;
  this.is_wh = p.is_wh;
  
  this.toString = function() {
    return this.word[this.mode];
  };

  this.getList = function() {
    return [this];
  };

  this.is3s = function() {
    return this.number === 'singular' && ![1,2].includes(this.person);
  };
};

export default Pronoun;