import React from 'react'
import '../css/guide.css'

const Guide = React.createClass({
  render: function() {
    return (
      <div className='guide'>
        <h1>Guide</h1>

        <h2>Classes</h2>

        <p>A class is a category of the word, phrase, or clause.</p>

        <h2>Words</h2>

        <p>There are 9 word classes in Geeklish. Some words belong to more than one class.</p>

        <div className='wrapper'>
          <h3><span className='pos Noun'>Noun</span></h3>
          <p>A noun is a word that represents a person, place, a thing or activity, or a quality or idea.</p>
          <p><span className='examples'>Examples:</span> dog, John, park, child, student, life, person, lunch, time</p>

          <h4>Functions</h4>

          <ul>
            <li className='function-group'>
              <div className='function-title'>quantifier</div>
              <span className='pos Determiner'>Determiner</span>
            </li>            
            <li className='function-group'>
              <div className='function-title'>determiner</div>
              <span className='pos Determiner'>Determiner</span>
              <span className='pos basic'>Possessive</span>
            </li>
            <li className='function-group'>
              <div className='function-title'>adjectives</div>
              <span className='pos Adjective'>Adjective</span>
              <span className='pos basic'>Adjective Clause</span>
              <span className='pos basic'>Participle</span>
              <span className='pos basic'>Infinitive</span>
              <span className='pos basic'>Appositive</span>
            </li>
            <li className='function-group'>
              <div className='function-title'>nouns</div>
              <span className='pos Noun'>Noun</span>
              <span className='pos basic'>Noun Clause</span>
              <span className='pos basic'>Gerund</span>
            </li>
            <li className='function-group'>
              <div className='function-title'>prepositions</div>
              <span className='pos Preposition'>Preposition</span>            
            </li>
          </ul>

        </div>

        <hr />

        <div className='wrapper'>
          <h3><span className='pos Pronoun'>Pronoun</span></h3>
          <p>A pronoun is a word that takes the place of a noun.</p>
          <p><span className='examples'>Examples:</span> he, she, I, you, we, it, this, that, what, who, which</p>
        
          <h4>Functions</h4>

          <ul>
            <li className='function-group'>
              <div className='function-title'>adjectives</div>
              <span className='pos Adjective'>Adjective</span>
              <span className='pos basic'>Adjective Clause</span>
              <span className='pos basic'>Participle</span>
              <span className='pos basic'>Infinitive</span>
            </li>
            <li className='function-group'>
              <div className='function-title'>prepositions</div>
              <span className='pos Preposition'>Preposition</span>   
            </li>
          </ul>
        </div>

        <hr />

        <div className='wrapper'>
          <h3><span className='pos Determiner'>Determiner</span></h3>
          <p>A determiner is a word that is used before a noun in order to show which thing you mean.</p>
          <p><span className='examples'>Examples:</span> this, that, these, those, a, the, some, many</p>
        
          <h4>Functions</h4>

          <ul>
            <li className='function-group'>
              <div className='function-title'>adverb</div>
              <span className='pos Adverb'>Adverb</span>
            </li>
          </ul>
        </div>

        <hr />

        <div className='wrapper'>
          <h3><span className='pos Verb'>Verb</span></h3>
          <p>A verb is a word that describes an action or state.</p>
          <p><span className='examples'>Examples:</span> love, like, find, have, want, give, talk, live, work, walk, eat, tell, go, do, buy</p>
        
          <h4>Functions</h4>

          <ul>
            <li className='function-group'>
              <div className='function-title'>particle</div>
              <span className='pos Preposition'>Preposition</span>
              <span className='pos Adverb'>Adverb</span>
            </li>
            <li className='function-group'>
              <div className='function-title'>complements</div>
              <span className='pos Noun'>Noun</span>
              <span className='pos Pronoun'>Pronoun</span>
              <span className='pos basic'>Noun Clause</span>
              <span className='pos basic'>Gerund</span>
              <span className='pos basic'>Infinitive</span>
              <span className='pos Adjective'>Adjective</span>
              <span className='pos Adverb'>Adverb</span>
              <span className='pos Preposition'>Preposition</span>
            </li>
            <li className='function-group'>
              <div className='function-title'>adverbs</div>
              <span className='pos Adverb'>Adverb</span>
            </li>
            <li className='function-group'>
              <div className='function-title'>prepositions</div>
              <span className='pos Preposition'>Preposition</span>            
            </li>
          </ul>

        </div>

        <hr />

        <div className='wrapper'>
          <h3><span className='pos Be'>Be</span></h3>
          <p>Be is a special linking verb.</p>
          <p><span className='examples'>Examples:</span> be, am, is, are</p>

          <h4>Functions</h4>

          <ul>
            <li className='function-group'>
              <div className='function-title'>complements</div>
              <span className='pos Noun'>Noun</span>
              <span className='pos Pronoun'>Pronoun</span>
              <span className='pos basic'>Noun Clause</span>
              <span className='pos basic'>Gerund</span>
              <span className='pos basic'>Infinitive</span>
              <span className='pos Adjective'>Adjective</span>
              <span className='pos Adverb'>Adverb</span>
              <span className='pos Preposition'>Preposition</span>
            </li>
            <li className='function-group'>
              <div className='function-title'>adverbs</div>
              <span className='pos Adverb'>Adverb</span>
            </li>
            <li className='function-group'>
              <div className='function-title'>prepositions</div>
              <span className='pos Preposition'>Preposition</span>            
            </li>
          </ul>

        </div>

        <hr />

        <div className='wrapper'>
          <h3><span className='pos Adjective'>Adjective</span></h3>
          <p>An adjective is a word that describes or modifies a noun or pronoun.</p>
          <p><span className='examples'>Examples:</span> good, important, honest, old, hungry, tired, hard</p>
        
          <h4>Functions</h4>

          <ul>
            <li className='function-group'>
              <div className='function-title'>adverbs</div>
              <span className='pos Adverb'>Adverb</span>
            </li>
            <li className='function-group'>
              <div className='function-title'>complement</div>
              <span className='pos Preposition'>Preposition</span>
              <span className='pos basic'>NounClause</span>
              <span className='pos basic'>Infinitive</span>
              <span className='pos basic'>Gerund</span>
            </li>
          </ul>
        </div>

        <hr />

        <div className='wrapper'>
          <h3><span className='pos Adverb'>Adverb</span></h3>
          <p>An adverb is a word that describe or modifies a verb, an adjective, and another adverb.</p>
          <p><span className='examples'>Examples:</span> hard, really, quickly, hopefully, why, how, when, where</p>

          <h4>Functions</h4>

          <ul>
            <li className='function-group'>
              <div className='function-title'>adverb</div>
              <span className='pos Adverb'>Adverb</span>
            </li>
          </ul>

        </div>

        <hr />

        <div className='wrapper'>
          <h3><span className='pos Preposition'>Preposition</span></h3>
          <p>A preposition is a word that is used before a noun, pronoun, or gerund to show place, time, direction etc.</p>
          <p><span className='examples'>Examples:</span> in. to, at, than, with, on, for, by, about</p>

          <h4>Functions</h4>

          <ul>
            <li className='function-group'>
              <div className='function-title'>complement</div>
              <span className='pos Noun'>Noun</span>
              <span className='pos Pronoun'>Pronoun</span>
              <span className='pos basic'>Noun Clause</span>
              <span className='pos basic'>Gerund</span>
            </li>
          </ul>
        </div>

        <hr />

        <div className='wrapper'>
          <h3><span className='pos Conjunction'>Conjunction</span></h3>
          <p>A conjunction is a word that joins two or more words, phrases, or clauses.</p>
          <p><span className='examples'>Examples:</span> and, or, but, so, if, when, because</p>
        </div>

        <hr />

        <h2>A Sentence and Clause</h2>

        <div className='wrapper'>
          <h3><span className='pos basic'>Sentence</span></h3>
          <p>A sentence is a set of words expressing a statement, question, or a command.
             It is different from a clause as explained below.</p>

          <h4>Functions</h4>

          <ul>
            <li className='function-group'>
              <div className='function-title'>clause</div>
              <span className='pos basic'>Clause</span>
            </li>
          </ul>
        </div>

        <hr />

        <div className='wrapper'>
          <h3><span className='pos basic'>Clause</span></h3>
          <p>A clause is a group of words that contains a subject and verb. Most sentences consist of only one clause.</p>
        
          <h4>Functions</h4>

          <ul>        
            <li className='function-group'>
              <div className='function-title'>subject</div>
              <span className='pos Noun'>Noun</span>
              <span className='pos Pronoun'>Pronoun</span>
              <span className='pos basic'>Noun Clause</span>
              <span className='pos basic'>Gerund</span>
              <span className='pos basic'>Infinitive</span>
            </li>
            <li className='function-group'>
              <div className='function-title'>verb</div>
              <span className='pos Verb'>Verb</span>
              <span className='pos Be'>Be</span>
            </li>
            <li className='function-group'>
              <div className='function-title'>adverbs</div>
              <span className='pos Adverb'>Adverb</span>
              <span className='pos basic'>Adverb Clause</span>
              <span className='pos basic'>Infinitive</span>
            </li>  
            <li className='function-group'>
              <div className='function-title'>adjective</div>
              <span className='pos basic'>Adjective Clause</span>
            </li>   
          </ul>
        </div>

        <hr />

        <div className='wrapper'>
          <h3><span className='pos basic'>Noun Clause</span></h3>
          <p>A noun clause is a clause that acts as a noun.</p>
        
          <h4>Functions</h4>

          <ul>
            <li className='function-group'>
              <div className='function-title'>clause</div>
              <span className='pos basic'>Clause</span>
            </li>
            <li className='function-group'>
              <div className='function-title'>quantifier</div>
              <span className='pos Determiner'>Determiner</span>
            </li>            
            <li className='function-group'>
              <div className='function-title'>adjectives</div>
              <span className='pos Adjective'>Adjective</span>
              <span className='pos basic'>Adjective Clause</span>
              <span className='pos basic'>Participle</span>
              <span className='pos basic'>Infinitive</span>
            </li>
            <li className='function-group'>
              <div className='function-title'>nouns</div>
              <span className='pos Noun'>Noun</span>
              <span className='pos basic'>Noun Clause</span>
              <span className='pos basic'>Gerund</span>
            </li>
            <li className='function-group'>
              <div className='function-title'>prepositions</div>
              <span className='pos Preposition'>Preposition</span>            
            </li>
          </ul>

        </div>

        <hr />

        <div className='wrapper'>
          <h3><span className='pos basic'>Adjective Clause</span></h3>
          <p>An adjective clause is a clause that acts as an adjective.</p>

          <h4>Functions</h4>

          <ul>
            <li className='function-group'>
              <div className='function-title'>clause</div>
              <span className='pos basic'>Clause</span>
            </li>
          </ul>
        </div>

        <hr />

        <div className='wrapper'>
          <h3><span className='pos basic'>Adverb Clause</span></h3>
          <p>An adverb clause is a clause that acts as an adverb.</p>

          <h4>Functions</h4>

          <ul>
            <li className='function-group'>
              <div className='function-title'>conjunction</div>
              <span className='pos Conjunction'>Conjunction</span>
            </li>
            <li className='function-group'>
              <div className='function-title'>clause</div>
              <span className='pos basic'>Clause</span>
            </li>
          </ul>
        </div>

        <hr />

        <h2>Containers</h2>

        <p>When you want to combine words, phrases, or clauses, you can use containers.</p>

        <div className='wrapper'>
          <h3><span className='pos basic'>Clause Container</span></h3>
          <p>A clause container is used for combining clauses.</p>

          <h4>Functions</h4>

          <ul>
            <li className='function-group'>
              <div className='function-title'>conjunction</div>
              <span className='pos Conjunction'>Conjunction</span>
            </li>
            <li className='function-group'>
              <div className='function-title'>clauses</div>
              <span className='pos basic'>Clause</span>
            </li>
          </ul>
        </div>

        <hr />

        <div className='wrapper'>
          <h3><span className='pos basic'>Noun Container</span></h3>
          <p>A noun container is used for combining nouns and pronouns.</p>
          <p><span className='examples'>Examples: </span>he and I, cats and dogs</p>
        
          <h4>Functions</h4>

          <ul>
            <li className='function-group'>
              <div className='function-title'>conjunction</div>
              <span className='pos Conjunction'>Conjunction</span>
            </li>
            <li className='function-group'>
              <div className='function-title'>quantifier</div>
              <span className='pos Determiner'>Determiner</span>
            </li>            
            <li className='function-group'>
              <div className='function-title'>determiner</div>
              <span className='pos Determiner'>Determiner</span>
              <span className='pos basic'>Possessive</span>
            </li>
            <li className='function-group'>
              <div className='function-title'>adjectives</div>
              <span className='pos Adjective'>Adjective</span>
              <span className='pos basic'>Adjective Clause</span>
              <span className='pos basic'>Participle</span>
              <span className='pos basic'>Infinitive</span>
              <span className='pos basic'>Appositive</span>
            </li>
            <li className='function-group'>
              <div className='function-title'>nouns</div>
              <span className='pos Noun'>Noun</span>
              <span className='pos basic'>Noun Clause</span>
              <span className='pos basic'>Gerund</span>
            </li>
            <li className='function-group'>
              <div className='function-title'>prepositions</div>
              <span className='pos Preposition'>Preposition</span>            
            </li>
          </ul>
        </div>

        <hr />

        <div className='wrapper'>
          <h3><span className='pos basic'>Verb Container</span></h3>
          <p>A verb container is used for combining verbs.</p>
          <p><span className='examples'>Examples: </span></p>

          <h4>Functions</h4>

          <ul>
            <li className='function-group'>
              <div className='function-title'>conjunction</div>
              <span className='pos Conjunction'>Conjunction</span>            
            </li>
            <li className='function-group'>
              <div className='function-title'>verbs</div>
              <span className='pos Verb'>Verb</span>
              <span className='pos Be'>Be</span>         
            </li>
            <li className='function-group'>
              <div className='function-title'>complements</div>
              <span className='pos Noun'>Noun</span>
              <span className='pos Pronoun'>Pronoun</span>
              <span className='pos basic'>Noun Clause</span>
              <span className='pos basic'>Gerund</span>
              <span className='pos basic'>Infinitive</span>
              <span className='pos Adjective'>Adjective</span>
              <span className='pos Adverb'>Adverb</span>
              <span className='pos Preposition'>Preposition</span>
            </li>
            <li className='function-group'>
              <div className='function-title'>adverbs</div>
              <span className='pos Adverb'>Adverb</span>
            </li>
            <li className='function-group'>
              <div className='function-title'>prepositions</div>
              <span className='pos Preposition'>Preposition</span>            
            </li>
          </ul>
        </div>

        <hr />

        <h2>Verbals</h2>

        <p>Verbals are words that are formed from verbs but don't act as verbs.</p>

        <div className='wrapper'>
          <h3><span className='pos basic'>Infinitive</span></h3>
          <p>When a verb is used with "to", it is called an infinitive and acts as a noun, an adjective, or an adverb.</p>
          <p><span className='examples'>Examples: </span>to go, to do, to talk</p>

          <h4>Functions</h4>

          <ul>
            <li className='function-group'>
              <div className='function-title'>verb</div>
              <span className='pos Verb'>Verb</span>
              <span className='pos Be'>Be</span>
            </li>
          </ul>
        </div>

        <hr />

        <div className='wrapper'>
          <h3><span className='pos basic'>Gerund</span></h3>
          <p>A gerund is in the "verb + ing" form. It acts as a noun.</p>
          <p><span className='examples'>Examples: </span>walking, doing, being</p>

          <h4>Functions</h4>

          <ul>
            <li className='function-group'>
              <div className='function-title'>verb</div>
              <span className='pos Verb'>Verb</span>
              <span className='pos Be'>Be</span>
            </li>
          </ul>
        </div>

        <hr />

        <div className='wrapper'>
          <h3><span className='pos basic'>Participle</span></h3>
          <p>A participle is a verb that acts as an adjective.</p>
          <p><span className='examples'>Examples: </span>winning game, used car</p>

          <h4>Functions</h4>

          <ul>
            <li className='function-group'>
              <div className='function-title'>verb</div>
              <span className='pos Verb'>Verb</span>
              <span className='pos Be'>Be</span>
            </li>
          </ul>
        </div>

        <hr />

        <h2>Other Classes</h2>

        <div className='wrapper'>
          <h3><span className='pos basic'>Possessive</span></h3>
          <p>A possessive is used before a noun to show ownership of the noun. It acts as a determiner.</p>
          <p><span className='examples'>Examples: </span>my, your, our, John's</p>

          <h4>Functions</h4>

          <ul>
            <li className='function-group'>
              <div className='function-title'>noun</div>
              <span className='pos Noun'>Noun</span>
              <span className='pos Pronoun'>Pronoun</span>
            </li>
          </ul>
        </div>

        <hr />

        <div className='wrapper'>
          <h3><span className='pos basic'>Appositive</span></h3>
          <p>An appositive is a noun that describes another noun. It acts as an adjective.</p>

          <h4>Functions</h4>

          <ul>
            <li className='function-group'>
              <div className='function-title'>noun</div>
              <span className='pos Noun'>Noun</span>
            </li>
          </ul>
        </div>

      </div>
    )
  }
})

export default Guide