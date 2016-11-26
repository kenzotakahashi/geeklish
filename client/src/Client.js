// import fetch from 'whatwg-fetch'

function getDics(result) {
  return fetch('/api/dictionary', {
    accept: 'application/json',
  }).then(checkStatus)
    .then(parseJSON)
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

function parseJSON(response) {
  return response.json()
}

const Client = { getDics, getDic }
export default Client
