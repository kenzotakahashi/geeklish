import React from 'react'
import { store } from '../../../index.js'
import { Children, WH, DeleteButton, ConjunctionButton, UndoConjunctionButton,
         Label, ChildrenDetail } from './Tree'
import { changeAttribute, showDetail } from '../../../shared/actions'
// import { getWordDictionary } from '../../../shared/wordDictionary'

export const Noun = React.createClass({
  render: function() {
    const state = store.getState()
    const {_id, parent, role} = this.props
    const element = state.Words.find(o => o._id === _id)
    const attrs = ['quantifier','determiner','adjectives','nouns','prepositions']

    return (
      <ul className='m-ul'>
        <li className='tree-top'>
          <div className={`tree-box ${element.pos}`}
               onClick={() => store.dispatch(showDetail(element._id,'forward',parent,role))}>
            <span className='word' >{element.word.singular}</span>
          </div>
          <Children element={element} attrs={attrs} words={state.Words}/>
        </li>
      </ul>
    )
  }
})

export const NounDetail = React.createClass({
  render: function() {
    const state = store.getState()
    const {element, parent, role} = this.props
    const attrs = ['quantifier','determiner','adjectives','nouns','prepositions']

    const quantifier = state.Words.find(o => o._id === element.quantifier)
    const determiner = state.Words.find(o => o._id === element.determiner)
    const disableNumber = (quantifier && quantifier.number !== 'both') ||
                          (determiner && determiner.number !== 'both')

    const number = element.type === 'countable' && (
      <li key='number'>
        <span className='m-list'>
          <span>Plural</span>
          <label className="switch">
            <input type="checkbox" checked={element.number === 'plural'}
                disabled={disableNumber && "disabled"}   
                onChange={() => store.dispatch(changeAttribute(
                  element._id,'number',element.number === 'plural' ? 'singular' : 'plural'))} 
            />

            <div className="slider round"></div>
          </label>
        </span>
      </li>
    )

    return (
      <div>
        <Label parent={parent} role={role} />
        <ul className='m-list-group'>        
          <hr className='m-border-edge' />
          {number}
          <hr className='m-border' />
          {parent.pos !== 'Possessive' && <WH id={element._id} isWh={element.isWh} />}
          <hr className='m-border-edge' />
        </ul>
        <ChildrenDetail element={element} attrs={attrs} words={state.Words} />
        {parent.pos !== 'NounContainer' &&
         <ConjunctionButton element={element} role={role} parentId={parent._id} />}
        <DeleteButton id={element._id} role={role} parentId={parent._id} />        
      </div>
    )
  }
})

export const NounContainer = React.createClass({
  render: function() {
    const state = store.getState()
    const {_id, parent, role} = this.props
    const element = state.Words.find(o => o._id === _id)
    const attrs = ['conjunction','quantifier','determiner','adjectives','nouns','prepositions']

    return (
      <ul className='m-ul'>
        <li className='tree-top'>
          <div className={`tree-box ${element.pos}`}
               onClick={() => store.dispatch(showDetail(element._id,'forward',parent,role))}>
            <span className='word' >NounContainer</span>
          </div>
          <Children element={element} attrs={attrs} words={state.Words}/>
        </li>
      </ul>
    )
  }
})

export const NounContainerDetail = React.createClass({
  render: function() {
    const state = store.getState()
    const {element, parent, role} = this.props
    const attrs = ['conjunction','quantifier','determiner','adjectives','nouns','prepositions']

    return (
      <div>
        <Label parent={parent} role={role} />
        <ul className='m-list-group'>        
          <hr className='m-border-edge' />
          <WH id={element._id} isWh={element.isWh} />
          <hr className='m-border-edge' />
        </ul>
        <ChildrenDetail element={element} attrs={attrs} words={state.Words} />
        {element.nouns.length > 0 &&
        <UndoConjunctionButton element={element} thisRole={role}
                               childRole='nouns' parentId={parent._id} />}
        <DeleteButton id={element._id} role={role} parentId={parent._id} />
      </div>
    )
  }
})

export const NounClause = React.createClass({
  render: function() {
    const state = store.getState()
    const {_id, parent, role} = this.props
    const element = state.Words.find(o => o._id === _id)
    const attrs = ['clause','quantifier','adjectives','nouns','prepositions']

    return (
      <ul className='m-ul'>
        <li className='tree-top'>
          <div className='tree-box basic'
               onClick={() => store.dispatch(showDetail(element._id,'forward',parent,role))}>
            <span className='word' >NounClause</span>
          </div>
          <Children element={element} attrs={attrs} words={state.Words}/>
        </li>
      </ul>
    )
  }
})

export const NounClauseDetail = React.createClass({
  render: function() {
    const state = store.getState()
    const {element, parent, role} = this.props
    const attrs = ['clause','quantifier','adjectives','nouns','prepositions']

    return (
      <div>
        <Label parent={parent} role={role} />
        <ul className='m-list-group'>        
          <hr className='m-border-edge' />
          <li key='number'>
            <span className='m-list'>
              <span>Include "that"</span>
              <label className="switch">
                <input type="checkbox" checked={element.that}
                    onChange={() => store.dispatch(changeAttribute(
                      element._id,'that',!element.that))} 
                />
                <div className="slider round"></div>
              </label>
            </span>
          </li>
          <hr className='m-border' />
          <WH id={element._id} isWh={element.isWh} />
          <hr className='m-border-edge' />
        </ul>
        <ChildrenDetail element={element} attrs={attrs} words={state.Words} />
        {parent.pos !== 'NounContainer' &&
         <ConjunctionButton element={element} role={role} parentId={parent._id} />}
        <DeleteButton id={element._id} role={role} parentId={parent._id} />
      </div>
    )
  }
})
