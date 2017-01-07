import uuid from 'uuid'

export const mobileInitialState = function() {
  const _id = uuid.v1()
  return {
    route: null,
    previousRoute: null,
    routeAction: 'initial',
    animation: {
      examples: 'normal',
      canvas: null
    },
    // currentModal: {name: null},
    example: null,
    title: 'Some title',
    // saved: true,
    activeWord: null,
    parent: null, // element, not id
    role: null,
    option: null,
    target: [],
    dictionary: [],
    examples: !!sessionStorage.examples ? JSON.parse(sessionStorage.examples) : [],
    // projects: !!sessionStorage.projects ? JSON.parse(sessionStorage.projects) : [],
    Words: [
      {
        _id: _id,
        pos: 'Sentence',
        clause: null,
      },
    ],
    answer: [],
    userAnswer: []
  }
}