// import { createWord } from './util.js';

const Determiner = function(p) {
  this.id = p.id;
  this.pos = p.pos;
  this.word = p.word;
  this.number = p.number;
  this.isWh = p.isWh;
  
  this.toString = () => this.word;

  this.getBe = (past) => {
    if (this.number === 'plural' || this.person === 2) {
      return past ? 'were' : 'are'
    } else {
      return past ? 'was' : 'is';
    }
  };

  this.is3s = () => this.number === 'singular';
  this.getWh = () => this.isWh ? [this, true] : [null, false];
};

export default Determiner;