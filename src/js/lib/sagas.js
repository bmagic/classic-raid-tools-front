import { takeLeading, put, select } from 'redux-saga/effects'
import { deleteUrl, getUrl, postUrl, refreshToken } from './request'

function * getToken (action) {
  const state = yield select()
  try {
    const result = yield getUrl(`${process.env.BACKEND_URL}/v1/oauth/${action.service}?code=${action.code}`, state)
    yield put({ type: 'GET_TOKEN_SUCCESS', token: result.data.token, refreshToken: result.data.refreshToken })
    yield put({ type: 'GET_USER' })
  } catch (e) {
    yield put({ type: 'ADD_ERROR', error: e.response.data })
  }
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

function * getRequest (url, callback) {
  const state = yield select()
  try {
    const result = yield getUrl(`${process.env.BACKEND_URL}${url}`, state)
    yield put({ type: callback, result: result.data })
  } catch (e) {
    if (e.response.status === 401) {
      try {
        const refreshResult = yield refreshToken(state)
        yield put({ type: 'GET_TOKEN_SUCCESS', token: refreshResult.data.token, refreshToken: refreshResult.data.refreshToken })
        state.token = refreshResult.data.token
        state.refreshToken = refreshResult.data.refreshToken
        const result2 = yield getUrl(`${process.env.BACKEND_URL}${url}`, state)
        yield put({ type: callback, result: result2.data })
      } catch (e) {
        yield put({ type: 'DISCONNECT' })
      }
    } else {
      yield put({ type: 'ADD_ERROR', error: e.response.data })
    }
  }
}

function * postRequest (url, callback, body) {
  const state = yield select()
  try {
    const result = yield postUrl(`${process.env.BACKEND_URL}${url}`, body, state)
    yield put({ type: callback, result: result.data })
  } catch (e) {
    if (e.response.status === 401) {
      try {
        const refreshResult = yield refreshToken(state)
        yield put({ type: 'GET_TOKEN_SUCCESS', token: refreshResult.data.token, refreshToken: refreshResult.data.refreshToken })
        state.token = refreshResult.data.token
        state.refreshToken = refreshResult.data.refreshToken
        const result2 = yield postUrl(`${process.env.BACKEND_URL}${url}`, body, state)
        yield put({ type: callback, result: result2.data })
      } catch (e) {
        yield put({ type: 'DISCONNECT' })
      }
    } else {
      yield put({ type: 'ADD_ERROR', error: e.response.data })
    }
  }
}

function * deleteRequest (url, callback) {
  const state = yield select()
  try {
    const result = yield deleteUrl(`${process.env.BACKEND_URL}${url}`, state)
    yield put({ type: callback, result: result.data })
  } catch (e) {
    if (e.response.status === 401) {
      try {
        const refreshResult = yield refreshToken(state)
        yield put({ type: 'GET_TOKEN_SUCCESS', token: refreshResult.data.token, refreshToken: refreshResult.data.refreshToken })
        state.token = refreshResult.data.token
        state.refreshToken = refreshResult.data.refreshToken
        const result2 = yield deleteUrl(`${process.env.BACKEND_URL}${url}`, state)
        yield put({ type: callback, result: result2.data })
      } catch (e) {
        yield put({ type: 'DISCONNECT' })
      }
    } else {
      yield put({ type: 'ADD_ERROR', error: e.response.data })
    }
  }
}

export default function * rootSaga () {
  yield takeLeading('GET_USER', getUser)
  yield takeLeading('GET_TOKEN', getToken)
  yield takeLeading('CREATE_USER_CHARACTER', createUserCharacter)
  yield takeLeading('GET_USER_CHARACTERS', getUserCharacters)
  yield takeLeading('DELETE_USER_CHARACTER', deleteUserCharacter)
  yield takeLeading('GET_USERS', getUsers)
  yield takeLeading('UPDATE_ROLES', updateRoles)
  yield takeLeading('GET_NEXT_RAIDS', getNextRaids)
  yield takeLeading('CREATE_RAID', createRaid)
  yield takeLeading('GET_RAID', getRaid)
}
