// import fetch from 'whatwg-fetch'

function getDics(result) {
  const uri = process.env.NODE_ENV === 'development' ? 'http://localhost:3001' : ''
  return fetch(`${uri}/api/dictionary`, {
    accept: 'application/json',
  }).then(checkStatus)
    .then(parseJSON)
    .then(storeToSession)
    .then(result)
}

function getDic(id, result) {
  return fetch(`/api/dictionary/${id}`, {
    accept: 'application/json',
  }).then(checkStatus)
    .then(parseJSON)
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

function parseJSON(response) {
  return response.json()
}

const Client = { getDics, getDic }
export default Client
