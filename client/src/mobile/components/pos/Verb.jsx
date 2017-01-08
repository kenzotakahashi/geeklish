import React from 'react'
import { store } from '../../../index.js'
import { CompChildren, Children, ChildrenDetail, CompChildrenDetail,
         DeleteButton, Label, ConjunctionButton } from './Tree'
import { showOptions, changeAttribute, showDetail, routeOption } from '../../../shared/actions'

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
          <div className={`tree-box ${element.pos}`}
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

export const VerbLink = React.createClass({
  render: function() {
    const {_id, parent} = this.props
    const element = store.getState().Words.find(o => o._id === _id)
    return (
      <li key={_id} className={`m-list ${element.pos}`}
          onClick={() => store.dispatch(showDetail(element._id,'initial',parent))}>
        <span className='word' >
          {parent.pos === 'Gerund' ? element.word[element.form] : element.word.base}
        </span>
      </li>
    )
  }
})

const verbOption = {
  attr: 'modal',
  label: 'Modal',
  choice: ['No modal','can','could','should','may','might','must','will','would']
}

export const VerbDetail = React.createClass({
  render: function() {
    const state = store.getState()
    const {element, parent, role} = this.props
    const attrs = element.valid_particles.length > 0 ?
                  ['particle','adverbs','prepositions'] : ['adverbs','prepositions']

    const modalSelect = !['Gerund','Participle','Infinitive'].includes(parent.pos) && (
      <li key='form'>
        <span className='m-list' onClick={() => store.dispatch(routeOption(verbOption))}>
          <span>Modal</span><span className='m-list-right'>{element.modal}</span>
        </span>
      </li>
    )

    const object = element.complements[0]
    const disablePassive = (object && object.category === 'noun' && !!object._id) ||
                           (object && object.category !== 'noun')

    const list = this.props.parent.pos === 'Infinitive' ? ['negative','continuous','passive'] :
                 ['past','negative','continuous','perfect','passive']

    const attributes = !['Gerund','Participle'].includes(parent.pos) && list.map(o => (
      <li key={o}>
        <hr className='m-border' />
        <span className='m-list'>
          <span>{o}</span>
          <label className="switch">
            <input type="checkbox" checked={element[o]}
                disabled={o === 'passive' && disablePassive && "disabled"}   
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
          {modalSelect}
          {attributes}
          <hr className='m-border-edge' />
        </ul>
        <CompChildrenDetail element={element} words={state.Words} target={state.target}/>
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
          <div className={`tree-box ${element.pos}`}
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

export const BeLink = React.createClass({
  render: function() {
    const {_id, parent} = this.props
    const element = store.getState().Words.find(o => o._id === _id)
    return (
      <li key={_id} className={`m-list ${element.pos}`}
          onClick={() => store.dispatch(showDetail(element._id,'initial',parent))}>
        <span className='word' >{element.word.base}</span>
      </li>
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

    const attributes = !['Gerund','Participle'].includes(parent.pos) && list.map(o => (
      <li key={o}>
        <hr className='m-border' />
        <span className='m-list'>
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
          {attributes}
          <hr className='m-border-edge' />
        </ul>
        <CompChildrenDetail element={element} words={state.Words} target={state.target}/>
        <ChildrenDetail element={element} attrs={attrs} words={state.Words} />
        {conjunctionButton}
        <DeleteButton id={element._id} role={role} parentId={parent._id} />        
      </div>
    )
  }
})

export const VerbContainer = React.createClass({
  handleChange: function(e){
    store.dispatch(changeAttribute(this.props._id, 'modal', e.target.value))
  },
  render: function() {
    const state = store.getState()
    const element = state.Words.find(o => o._id === this.props._id)

    return (
      <ul className='m-ul'>
        <li className="tree-top">
          <div className={`tree-box ${element.pos}`}>
            <span className='word' onClick={() => store.dispatch(showOptions(element._id))}>VerbContainer</span>
          </div>
        </li>
      </ul>
    )
  },
})
