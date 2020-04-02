import { all, takeLatest, put, select } from 'redux-saga/effects'
import { deleteUrl, getUrl, postUrl } from './request'

function * getUser () {
  const state = yield select()
  try {
    const result = yield getUrl(`${process.env.BACKEND_URL}/v1/user`, state)
    yield put({ type: 'GET_USER_SUCCESS', user: result.data })
  } catch (e) {
    if (e.response.status === 401) {
      yield put({ type: 'DISCONNECT' })
    } else {

    }

    yield put({ type: 'ADD_ERROR', error: e.response.data })
  }
}

function * createUser (action) {
  const state = yield select()
  try {
    const result = yield postUrl(`${process.env.BACKEND_URL}/v1/user/register`, { email: action.email, password: action.password }, state)
    yield put({ type: 'REGISTER_SUCCESS', token: result.data.token })
    yield put({ type: 'GET_USER' })
  } catch (e) {
    yield put({ type: 'ADD_ERROR', error: e.response.data })
  }
}

function * login (action) {
  const state = yield select()
  try {
    const result = yield postUrl(`${process.env.BACKEND_URL}/v1/user/login`, { email: action.email, password: action.password }, state)
    yield put({ type: 'LOGIN_SUCCESS', token: result.data.token })
    yield put({ type: 'GET_USER' })
  } catch (e) {
    yield put({ type: 'ADD_ERROR', error: e.response.data })
  }
}

function * getToken (action) {
  const state = yield select()
  try {
    const result = yield getUrl(`${process.env.BACKEND_URL}/v1/oauth/${action.service}?code=${action.code}`, state)
    yield put({ type: 'GET_TOKEN_SUCCESS', token: result.data.token })
    yield put({ type: 'GET_USER' })
  } catch (e) {
    yield put({ type: 'ADD_ERROR', error: e.response.data })
  }
}

function * getUserTalks () {
  const state = yield select()
  try {
    const result = yield getUrl(`${process.env.BACKEND_URL}/v1/user/talks`, state)
    yield put({ type: 'GET_USER_TALKS_SUCCESS', talks: result.data })
  } catch (e) {
    yield put({ type: 'ADD_ERROR', error: e.response.data })
  }
}

function * addUserTalk (action) {
  const state = yield select()
  try {
    yield postUrl(`${process.env.BACKEND_URL}/v1/user/talks`, action.talk, state)
    yield put({ type: 'GET_USER_TALKS' })
  } catch (e) {
    yield put({ type: 'ADD_ERROR', error: e.response.data })
  }
}
function * deleteUserTalk (action) {
  const state = yield select()
  try {
    yield deleteUrl(`${process.env.BACKEND_URL}/v1/talks/${action.talkId}`, state)
    yield put({ type: 'GET_USER_TALKS' })
  } catch (e) {
    yield put({ type: 'ADD_ERROR', error: e.response.data })
  }
}

export default function * rootSaga () {
  yield takeLatest('GET_USER', getUser)
  yield takeLatest('REGISTER', createUser)
  yield takeLatest('LOGIN', login)
  yield takeLatest('GET_TOKEN', getToken)
  yield takeLatest('GET_USER_TALKS', getUserTalks)
  yield takeLatest('ADD_USER_TALK', addUserTalk)
  yield takeLatest('DELETE_USER_TALK', deleteUserTalk)

  yield all([])
}
