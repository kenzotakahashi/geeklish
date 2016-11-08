import React from 'react';
import store from '../../store.js'
import pos_components from './pos_components';

const e = React.createElement;

export const Verb = React.createClass({
  showOptions: function () {
    store.dispatch({
      type: 'SHOW_OPTIONS',
      id: this.props.id,
    });
  },
  showWordFacotory: function(target) {
    store.dispatch({
      type: 'SHOW_WORD_FACTORY',
      id: this.props.id,
      target: target,
    });
  },
  changeAttribute: function(attr, id, change_to) {
    store.dispatch({
      type: 'CHANGE_ATTRIBUTE',
      id,
      attr,
      change_to,
    });
  },
  render: function() {
    const state = store.getState();
    const word = state.Words.find(o => o.id === this.props.id);

    const attrs = ['complements','adverbs','prepositions'];
    const children = attrs.map((w, i) => (
      word[w].map((t, j) => (
        e(pos_components[state.Words.find(o => o.id === t).pos], {key: w+j, id: t})
      ))
    ));

    const options = state.activeWord === this.props.id ? attrs.map((o, i) => (
      e('div', {
        className: `list-group-item ${state.target === o ? 'active' : 'list-group-item-info'}`,
        key: i,
        onClick: () => this.showWordFacotory(o)
      }, o)
    )) : '';

    const w = 'predicate'
    const predicateChild =  !!word[w] ?
          e(pos_components[state.Words.find(o => o.id === word[w]).pos],
            {id: word[w],  key:w}) : '';

    const predicateOption = !word[w] && state.activeWord === this.props.id ?
          e('div', {
            className: `list-group-item ${state.target === w ? 'active' : 'list-group-item-info'}`,
            key: w,
            onClick: () => this.showWordFacotory(w)
          }, w) : '';

    const attributes = ['past','negative','continuous','perfect','passive'].map(o => (
      e('button', {
        className: `btn btn-sm btn-${word[o] ? 'success' : 'default'}`,
        key: o,
        type: 'button',
        onClick: () => this.changeAttribute(o, this.props.id, !word[o])
      }, o)
    ));      

    return (
      <div className="list-group-item">
        <div>
          <span className='word' onClick={this.showOptions}>{word.word.base}</span>
          {attributes}
        </div>
        {children}
        {predicateChild}
        {options}
        {predicateOption}
      </div>
    );
  },
});

export const Be = React.createClass({
  showOptions: function () {
    store.dispatch({
      type: 'SHOW_OPTIONS',
      id: this.props.id,
    });
  },
  showWordFacotory: function(target) {
    store.dispatch({
      type: 'SHOW_WORD_FACTORY',
      id: this.props.id,
      target: target,
    });
  },
  changeAttribute: function(attr, id, change_to) {
    store.dispatch({
      type: 'CHANGE_ATTRIBUTE',
      id,
      attr,
      change_to,
    });
  },
  render: function() {
    const state = store.getState();
    const word = state.Words.find(o => o.id === this.props.id);

    const attrs = ['complements','adverbs','prepositions'];
    const children = attrs.map((w, i) => (
      word[w].map((t, j) => (
        e(pos_components[state.Words.find(o => o.id === t).pos], {key: w+j, id: t})
      ))
    ));

    const options = state.activeWord === this.props.id ? attrs.map((o, i) => (
      e('div', {
        className: `list-group-item ${state.target === o ? 'active' : 'list-group-item-info'}`,
        key: i,
        onClick: () => this.showWordFacotory(o)
      }, o)
    )) : '';

    const w = 'predicate'
    const predicateChild =  !!word[w] ?
          e(pos_components[state.Words.find(o => o.id === word[w]).pos],
            {id: word[w],  key:w}) : '';

    const predicateOption = !word[w] && state.activeWord === this.props.id ?
          e('div', {
            className: `list-group-item ${state.target === w ? 'active' : 'list-group-item-info'}`,
            key: w,
            onClick: () => this.showWordFacotory(w)
          }, w) : '';

    const attributes = ['past','negative','continuous','perfect'].map(o => (
      e('button', {
        className: `btn btn-sm btn-${word[o] ? 'success' : 'default'}`,
        key: o,
        type: 'button',
        onClick: () => this.changeAttribute(o, this.props.id, !word[o])
      }, o)
    ));      

    return (
      <div className="list-group-item">
        <div>
          <span className='word' onClick={this.showOptions}>{word.word.base}</span>
          {attributes}
        </div>
        {children}
        {predicateChild}
        {options}
        {predicateOption}
      </div>
    );
  },
});