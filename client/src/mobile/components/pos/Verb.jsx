import React from 'react'
import { store } from '../../../index.js'
import { CompChildren, Children, ChildrenDetail, CompChildrenDetail,
         DeleteButton, Label, ConjunctionButton, ModalSelect, UndoConjunctionButton } from './Tree'
import { changeAttribute, showDetail } from '../../../shared/actions'

export const Verb = React.createClass({
  render: function() {
    const state = store.getState()
    const {_id, parent, role} = this.props
    const element = state.Words.find(o => o._id === _id)
    const attrs = element.valid_particles.length > 0 ?
                  ['particle','adverbs','prepositions'] : ['adverbs','prepositions']

    return (
      <ul className='m-ul'>
        <li className="tree-top">
          <div className={`m-tree-box ${element.pos}`}
               onClick={() => store.dispatch(showDetail(element._id,'forward',parent,role))}>
            <span className='word'>
              {parent.pos === 'Gerund' ? element.word[element.form] : element.word.base}
            </span>
          </div>
          <Children element={element} attrs={attrs} words={state.Words} />
          <CompChildren element={element} words={state.Words} />
        </li>
      </ul>
    )
  }
})

export const VerbDetail = React.createClass({
  render: function() {
    const state = store.getState()
    const {element, parent, role} = this.props
    const attrs = element.valid_particles.length > 0 ?
                  ['particle','adverbs','prepositions'] : ['adverbs','prepositions']

    const object = element.complements[0]
    const disablePassive = (object && object.category === 'noun' && !!object._id) ||
                           (object && object.category !== 'noun')

    const list = this.props.parent.pos === 'Infinitive' ? ['negative','continuous','passive'] :
                 ['past','negative','continuous','perfect','passive']

    const attributes = !['Gerund','Participle'].includes(parent.pos) && list.map(o => (
      <li key={o} disabled={o === 'passive' && disablePassive && "disabled"}   >
        <hr className='m-border' />
        <span className='m-list back-white'>
          <span>{o}</span>
          <label className="switch">
            <input type="checkbox" checked={element[o]}
                onChange={() => store.dispatch(changeAttribute(element._id, o, !element[o]))}  />
            <div className="slider round"></div>
          </label>
        </span>
      </li>
    ))

    const conjunctionButton = !['Gerund','Participle'].includes(parent.pos) &&
              parent.pos !== 'VerbContainer' &&
              <ConjunctionButton element={element} role={role} parentId={parent._id} />

    return (
      <div>
        <Label parent={parent} role={role} />
        <ul className='m-list-group'>
          <hr className='m-border-edge' />
          {!['Gerund','Participle','Infinitive'].includes(parent.pos) && 
            <ModalSelect element={element} />}
          {attributes}
          <hr className='m-border-edge' />
        </ul>
        <CompChildrenDetail element={element} words={state.Words} />
        <ChildrenDetail element={element} attrs={attrs} words={state.Words} />
        {conjunctionButton}
        <DeleteButton id={element._id} role={role} parentId={parent._id} />        
      </div>
    )
  }
})


export const Be = React.createClass({
  render: function() {
    const state = store.getState()
    const {_id, parent, role} = this.props
    const element = state.Words.find(o => o._id === _id)
    const attrs = ['adverbs','prepositions']

    return (
      <ul className='m-ul'>
        <li className="tree-top">
          <div className={`m-tree-box ${element.pos}`}
               onClick={() => store.dispatch(showDetail(_id,'forward',parent,role))}>
            <span className='word'>{element.word.base}</span>
          </div>
          <Children element={element} attrs={attrs} words={state.Words} />
          <CompChildren element={element} words={state.Words} />
        </li>
      </ul>
    )
  }
})

export const BeDetail = React.createClass({
  render: function() {
    const state = store.getState()
    const {element, parent, role} = this.props
    const attrs = ['adverbs','prepositions']

    const list = parent.pos === 'Infinitive' ?
                 ['negative','continuous'] : ['past','negative','continuous','perfect']

    const attributes = !['Gerund','Participle'].includes(parent.pos) && list.map((o, i) => (
      <li key={o}>
        <hr className='m-border' />
        <span className='m-list back-white'>
          <span>{o}</span>
          <label className="switch">
            <input type="checkbox" checked={element[o]}
                onChange={() => store.dispatch(changeAttribute(element._id, o, !element[o]))}  />
            <div className="slider round"></div>
          </label>
        </span>
      </li>
    ))

    const conjunctionButton = !['Gerund','Participle'].includes(parent.pos) &&
              parent.pos !== 'VerbContainer' &&
              <ConjunctionButton element={element} role={role} parentId={parent._id} />

    return (
      <div>
        <Label parent={parent} role={role} />
        <ul className='m-list-group'>
          <hr className='m-border-edge' />
          {!['Gerund','Participle','Infinitive'].includes(parent.pos) && 
            <ModalSelect element={element} />}
          {attributes}
          <hr className='m-border-edge' />
        </ul>
        <CompChildrenDetail element={element} words={state.Words} />
        <ChildrenDetail element={element} attrs={attrs} words={state.Words} />
        {conjunctionButton}
        <DeleteButton id={element._id} role={role} parentId={parent._id} />        
      </div>
    )
  }
})

export const VerbContainer = React.createClass({
  render: function() {
    const state = store.getState()
    const {_id, parent, role} = this.props
    const element = state.Words.find(o => o._id === _id)
    const attrs = ['conjunction', 'verbs', 'complements','adverbs','prepositions']

    return (
      <ul className='m-ul'>
        <li className='tree-top'>
          <div className={`m-tree-box ${element.pos}`}
               onClick={() => store.dispatch(showDetail(element._id,'forward',parent,role))}>
            <span className='word' >VerbContainer</span>
          </div>
          <Children element={element} attrs={attrs} words={state.Words}/>
        </li>
      </ul>
    )
  }
})

export const VerbContainerDetail = React.createClass({
  render: function() {
    const state = store.getState()
    const {element, parent, role} = this.props
    const attrs = ['conjunction', 'verbs', 'complements','adverbs','prepositions']

    return (
      <div>
        <Label parent={parent} role={role} />
        <ul className='m-list-group'>        
          <hr className='m-border-edge' />
          <ModalSelect element={element} />
          <hr className='m-border-edge' />
        </ul>
        <ChildrenDetail element={element} attrs={attrs} words={state.Words} />
        <UndoConjunctionButton element={element} thisRole={role}
                               childRole='verbs' parentId={parent._id} />}
        <DeleteButton id={element._id} role={role} parentId={parent._id} />        
      </div>
    )
  }
})
