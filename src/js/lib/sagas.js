import { takeLeading, put } from 'redux-saga/effects'
import { deleteUrl, getUrl, postUrl, putUrl } from './request'

function * login (action) {
  yield * getRequest(`/v1/oauth/discord?code=${action.code}`, 'GET_USER')
}

function * logout (action) {
  yield * getRequest('/v1/user/logout', 'LOGOUT_SUCCESS')
}

function * getUser () {
  yield * getRequest('/v1/user', 'GET_USER_SUCCESS')
}

function * getUserCharacters () {
  yield * getRequest('/v1/user/characters', 'GET_USER_CHARACTERS_SUCCESS')
}

function * createUserCharacter (action) {
  yield * postRequest('/v1/user/characters', 'GET_USER_CHARACTERS', { name: action.name, spec: action.spec, class: action.class })
}

function * deleteUserCharacter (action) {
  yield * deleteRequest(`/v1/user/characters/${action.id}`, 'GET_USER_CHARACTERS')
}

function * getUsers () {
  yield * getRequest('/v1/users', 'GET_USERS_SUCCESS')
}

function * updateRoles (action) {
  yield * postRequest('/v1/users/roles', 'GET_USERS', { roles: action.roles, id: action.id })
}

function * getNextRaids () {
  yield * getRequest('/v1/raids/next', 'GET_NEXT_RAIDS_SUCCESS')
}

function * createRaid (action) {
  yield * postRequest('/v1/raids', 'GET_NEXT_RAIDS', { date: action.date, instance: action.instance })
}

function * getRaid (action) {
  yield * getRequest(`/v1/raids/${action.id}`, 'GET_RAID_SUCCESS')
}

function * createRegistration (action) {
  yield * postRequest('/v1/raids/registration', '', { characterId: action.characterId, raidId: action.raidId, status: action.status, favorite: action.favorite })
}
function * getRegistrations (action) {
  yield * getRequest(`/v1/raids/${action.raidId}/registrations`, 'GET_REGISTRATIONS_SUCCESS')
}
function * getRegistrationLogs (action) {
  yield * getRequest(`/v1/raids/${action.raidId}/registration-logs`, 'GET_REGISTRATION_LOGS_SUCCESS')
}
function * updateUser (action) {
  yield * putRequest('/v1/user', 'GET_USER', action.user)
}

function * getRequest (url, callback) {
  try {
    const result = yield getUrl(`${process.env.BACKEND_URL}${url}`)
    yield put({ type: callback, result: result.data })
  } catch (e) {
    if (e.response.status === 401) {
      yield put({ type: 'DISCONNECT' })
    } else {
      yield put({ type: 'ADD_ERROR', error: e.response.data })
    }
  }
}

function * postRequest (url, callback, body) {
  try {
    const result = yield postUrl(`${process.env.BACKEND_URL}${url}`, body)
    yield put({ type: callback, result: result.data })
  } catch (e) {
    if (e.response.status === 401) {
      yield put({ type: 'DISCONNECT' })
    } else {
      yield put({ type: 'ADD_ERROR', error: e.response.data })
    }
  }
}
function * putRequest (url, callback, body) {
  try {
    const result = yield putUrl(`${process.env.BACKEND_URL}${url}`, body)
    yield put({ type: callback, result: result.data })
  } catch (e) {
    if (e.response.status === 401) {
      yield put({ type: 'DISCONNECT' })
    } else {
      yield put({ type: 'ADD_ERROR', error: e.response.data })
    }
  }
}

function * deleteRequest (url, callback) {
  try {
    const result = yield deleteUrl(`${process.env.BACKEND_URL}${url}`)
    yield put({ type: callback, result: result.data })
  } catch (e) {
    if (e.response.status === 401) {
      yield put({ type: 'DISCONNECT' })
    } else {
      yield put({ type: 'ADD_ERROR', error: e.response.data })
    }
  }
}

export default function * rootSaga () {
  yield takeLeading('GET_USER', getUser)
  yield takeLeading('LOGIN', login)
  yield takeLeading('LOGOUT', logout)
  yield takeLeading('CREATE_USER_CHARACTER', createUserCharacter)
  yield takeLeading('GET_USER_CHARACTERS', getUserCharacters)
  yield takeLeading('DELETE_USER_CHARACTER', deleteUserCharacter)
  yield takeLeading('GET_USERS', getUsers)
  yield takeLeading('UPDATE_ROLES', updateRoles)
  yield takeLeading('GET_NEXT_RAIDS', getNextRaids)
  yield takeLeading('CREATE_RAID', createRaid)
  yield takeLeading('GET_RAID', getRaid)
  yield takeLeading('CREATE_REGISTRATION', createRegistration)
  yield takeLeading('GET_REGISTRATIONS', getRegistrations)
  yield takeLeading('GET_REGISTRATION_LOGS', getRegistrationLogs)
  yield takeLeading('UPDATE_USER', updateUser)
}
