import uuid from 'uuid'

export const mobileInitialState = function() {
  const _id = uuid.v1()
  return {
    route: null,
    routeAction: null,
    currentModal: {name: null},
    // example: null,
    title: 'Some title',
    saved: true,
    activeWord: _id,
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