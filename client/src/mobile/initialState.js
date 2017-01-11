import uuid from 'uuid'

export const mobileInitialState = function() {
  const _id = uuid.v1()
  const clauseId = uuid.v1()
  return {
    route: null,
    routeAction: 'initial',
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
        clause: clauseId,
      },
      {
        _id: clauseId,
        pos: "Clause",
        cType: "statement",
        subject: null,
        verb: null,
        adjective: null,
        adverbs: []
      }
    ],
    answer: [],
    userAnswer: [],
    isAnswer: false,
    isCorrect: false,
  }
}