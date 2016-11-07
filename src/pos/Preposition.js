import { createWord } from './util.js';

const Preposition = function(p) {
  this.id = p.id;
  this.pos = p.pos;
  this.word = p.word;
  this.isWh = p.isWh;
  this.complement = createWord(p.complement);
  
  this.toString = () => !!this.complement ?
                        `${this.word} ${this.complement.toString()}` :
                        this.word;

  this.getWh = () => {
    if (this.isWh) return (this, true);
    if (this.complement) {
      const [wh, isWh] = this.complement.getWh();
      if (isWh) {
        this.complement = null;
      }
      if (wh) return [wh, false];
    }
    return [null, false];
  };
};

export default Preposition;