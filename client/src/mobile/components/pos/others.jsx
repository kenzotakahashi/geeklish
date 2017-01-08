import React from 'react'
import { store } from '../../../index.js'
import { Children, DeleteButton, ConjunctionButton, Label, ChildrenDetail } from './Tree'
import { changeAttribute, showDetail, routeOption } from '../../../shared/actions'
// import { getWordDictionary } from '../../../shared/wordDictionary'

export const Infinitive = React.createClass({
  render: function() {
    const state = store.getState()
    const {_id, parent, role} = this.props
    const element = state.Words.find(o => o._id === _id)
    const attrs = ['verb']

    return (
      <ul className='m-ul'>
        <li className='tree-top'>
          <div className='m-tree-box basic'
               onClick={() => store.dispatch(showDetail(element._id,'forward',parent,role))}>
            <span className='word' >Infinitive</span>
          </div>
          <Children element={element} attrs={attrs} words={state.Words}/>
        </li>
      </ul>
    )
  }
})

export const InfinitiveDetail = React.createClass({
  render: function() {
    const state = store.getState()
    const {element, parent, role} = this.props
    const attrs = ['verb']

    return (
      <div>
        <Label parent={parent} role={role} />
        {parent.pos !== 'Clause' && (
          <ul className='m-list-group'>
            <hr className='m-border-edge' />
            <li key='omit'>
              <span className='m-list'>
                <span>Omit to</span>
                <label className="switch">
                  <input type="checkbox" checked={element.omit}
                      onChange={() => store.dispatch(changeAttribute(
                        element._id, 'omit', !element.omit))} 
                  />
                  <div className="slider round"></div>
                </label>
              </span>
            </li>
            <hr className='m-border' />
            <li key='position'>
              <span className='m-list'>
                <span>Beginning of Clause</span>
                <label className="switch">
                  <input type="checkbox" checked={element.before}
                      onChange={() => store.dispatch(changeAttribute(
                        element._id, 'before', !element.before))} 
                  />
                  <div className="slider round"></div>
                </label>
              </span>
            </li>
            <hr className='m-border-edge' />
          </ul>
        )}
        <ChildrenDetail element={element} attrs={attrs} words={state.Words} />
        <DeleteButton id={element._id} role={role} parentId={parent._id} />                
      </div>
    )
  }
})

export const Gerund = React.createClass({
  render: function() {
    const state = store.getState()
    const {_id, parent, role} = this.props
    const element = state.Words.find(o => o._id === _id)
    const attrs = ['verb']

    return (
      <ul className='m-ul'>
        <li className='tree-top'>
          <div className='m-tree-box basic'
               onClick={() => store.dispatch(showDetail(element._id,'forward',parent,role))}>
            <span className='word' >Gerund</span>
          </div>
          <Children element={element} attrs={attrs} words={state.Words}/>
        </li>
      </ul>
    )
  }
})

export const GerundDetail = React.createClass({
  render: function() {
    const state = store.getState()
    const {element, parent, role} = this.props
    const attrs = ['verb']

    return (
      <div>
        <Label parent={parent} role={role} />
        {parent.pos !== 'NounContainer' &&
        <ConjunctionButton element={element} role={role} parentId={parent._id} />}
        <ChildrenDetail element={element} attrs={attrs} words={state.Words} />
        <DeleteButton id={element._id} role={role} parentId={parent._id} />                
      </div>
    )
  }
})

export const Participle = React.createClass({
  render: function() {
    const state = store.getState()
    const {_id, parent, role} = this.props
    const element = state.Words.find(o => o._id === _id)
    const attrs = ['verb']

    return (
      <ul className='m-ul'>
        <li className='tree-top'>
          <div className='m-tree-box basic'
               onClick={() => store.dispatch(showDetail(element._id,'forward',parent,role))}>
            <span className='word' >Participle</span>
          </div>
          <Children element={element} attrs={attrs} words={state.Words}/>
        </li>
      </ul>
    )
  }
})

export const ParticipleDetail = React.createClass({
  render: function() {
    const state = store.getState()
    const {element, parent, role} = this.props
    const attrs = ['verb']

    const verb = !!element.verb && state.Words.find(o => o._id === element.verb)
    const participleOption = {
      attr: 'form',
      label: 'Form',
      choice: !!verb && verb.pos === 'Be' ? ['present','perfect'] : ['present','past','perfect']
    }

    return (
      <div>
        <Label parent={parent} role={role} />
          <ul className='m-list-group'>
            <hr className='m-border-edge' />
            <li key='form'>
              <span className='m-list pointer'
                    onClick={() => store.dispatch(routeOption(participleOption))}>
                <span>Form</span>
                <span className='m-list-right'>
                  <span>{element.form}</span>
                  <span className='m-list-arrow'></span>
                </span>
              </span>
            </li>
            <hr className='m-border' />
            <li key='position'>
              <span className='m-list'>
                <span>Before Subject</span>
                <label className="switch">
                  <input type="checkbox" checked={element.beginning}
                      onChange={() => store.dispatch(changeAttribute(
                        element._id, 'beginning', !element.beginning))} 
                  />
                  <div className="slider round"></div>
                </label>
              </span>
            </li>
            <hr className='m-border-edge' />
          </ul>
        <ChildrenDetail element={element} attrs={attrs} words={state.Words} />
        <DeleteButton id={element._id} role={role} parentId={parent._id} />                
      </div>
    )
  }
})

