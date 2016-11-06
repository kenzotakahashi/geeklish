const Pronoun = function(p, state) {
  this.id = p.id;
  this.pos = p.pos;
  this.word = p.word;
  this.person = p.person;
  this.number = p.number;
  this.mode = p.mode;
  this.isWh = p.isWh;
  
  this.toString = () => this.word[this.mode];
  this.getList = () => [this];

  this.getBe = (past) => {
    if (this.number === 'plural' || this.person === 2) {
      return past ? 'were' : 'are'
    } else {
      return past ? 'was' : this.person === 1 ? 'am' : 'is';
    }
  };

  this.is3s = () => this.number === 'singular' && ![1,2].includes(this.person);
  this.getWh = () => this.isWh ? [this, true] : [null, false];
};

export default Pronoun;