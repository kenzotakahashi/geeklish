// import fetch from 'whatwg-fetch'

// const uri = process.env.NODE_ENV === 'development' ? 'http://localhost:3001' : ''

function getDics(result) {
  return fetch(`/api/dictionary`, {
    accept: 'application/json',
  }).then(checkStatus)
    .then(res => res.json())
    .then(storeToSession)
    .then(result)
}

function getDic(id, result) {
  return fetch(`/api/dictionary/${id}`, {
    accept: 'application/json',
  }).then(checkStatus)
    .then(res => res.json())
    .then(result)
}

function getProjects(result) {
  return fetch(`/api/projects`, {
    accept: 'application/json',
  }).then(checkStatus)
    .then(res => res.json())
    .then(storeToSession2)
    .then(result)
}

function getProject(_id, result) {
  return fetch(`/api/project/${_id}`, {
    accept: 'application/json',
  }).then(checkStatus)
    .then(res => res.json())
    .then(result)
}

function postProject(body, result) {
  return fetch(`/api/save_project`, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify(body)
  }).then(checkStatus)
    .then(res => res.json())
    .then(result)
}


function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response
  } else {
    const error = new Error(`HTTP Error ${response.statusText}`)
    error.status = response.statusText
    error.response = response
    console.log(error)
    throw error
  }
}

function storeToSession(response) {
  sessionStorage.dictionary = JSON.stringify(response.result)
  return response.result
}

function storeToSession2(response) {
  sessionStorage.examples = JSON.stringify(response.result)
  return response.result
}

const Client = { getDics, getDic, getProjects, getProject, postProject }
export default Client
