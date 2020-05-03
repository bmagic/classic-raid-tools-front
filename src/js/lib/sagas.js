import { takeLeading, put } from 'redux-saga/effects'
import { deleteUrl, getUrl, postUrl, putUrl } from './request'

function * login (action) {
  yield * request('GET', `/v1/oauth/discord?code=${action.code}`, [{ type: 'GET_USER' }])
}

function * logout (action) {
  yield * request('GET', '/v1/user/logout', [{ type: 'LOGOUT_SUCCESS' }])
}

function * getUser () {
  yield * request('GET', '/v1/user', [{ type: 'GET_USER_SUCCESS' }])
}

function * getUserCharacters () {
  yield * request('GET', '/v1/user/characters', [{ type: 'GET_USER_CHARACTERS_SUCCESS' }])
}

function * createUserCharacter (action) {
  yield * request('POST', '/v1/user/characters', [{ type: 'GET_USER_CHARACTERS' }], { name: action.name, spec: action.spec, class: action.class })
}

function * deleteUserCharacter (action) {
  yield * request('DELETE', `/v1/user/characters/${action.id}`, [{ type: 'GET_USER_CHARACTERS' }])
}

function * getUsers () {
  yield * request('GET', '/v1/users', [{ type: 'GET_USERS_SUCCESS' }])
}

function * updateRoles (action) {
  yield * request('POST', '/v1/users/roles', [{ type: 'GET_USERS' }], { roles: action.roles, id: action.id })
}

function * getNextRaids () {
  yield * request('GET', '/v1/raids/next', [{ type: 'GET_NEXT_RAIDS_SUCCESS' }])
}

function * createRaid (action) {
  yield * request('POST', '/v1/raids', [{ type: 'GET_NEXT_RAIDS' }], { date: action.date, instance: action.instance })
}

function * getRaid (action) {
  yield * request('GET', `/v1/raids/${action.id}`, [{ type: 'GET_RAID_SUCCESS' }])
}

function * createRegistration (action) {
  yield * request('POST', '/v1/raids/registration', [], { characterId: action.characterId, raidId: action.raidId, status: action.status, favorite: action.favorite })
}

function * getRegistrations (action) {
  yield * request('GET', `/v1/raids/${action.raidId}/registrations`, [{ type: 'GET_REGISTRATIONS_SUCCESS' }])
}

function * getRegistrationLogs (action) {
  yield * request('GET', `/v1/raids/${action.raidId}/registration-logs`, [{ type: 'GET_REGISTRATION_LOGS_SUCCESS' }])
}

function * updateUser (action) {
  yield * request('PUT', '/v1/user', [{ type: 'GET_USER' }], action.user)
}

function * updateRaid (action) {
  yield * request('PUT', `/v1/raids/${action.id}`, [], action.raid)
}

function * deleteRaid (action) {
  yield * request('DELETE', `/v1/raids/${action.id}`, [{ type: 'GET_NEXT_RAIDS' }])
}

function * request (type, url, actions, body) {
  try {
    let result
    switch (type) {
      case 'GET':
        result = yield getUrl(`${process.env.BACKEND_URL}${url}`)
        break
      case 'POST':
        result = yield postUrl(`${process.env.BACKEND_URL}${url}`, body)
        break
      case 'PUT':
        result = yield putUrl(`${process.env.BACKEND_URL}${url}`, body)
        break
      case 'DELETE':
        result = yield deleteUrl(`${process.env.BACKEND_URL}${url}`)
        break
    }

    for (const index in actions) {
      const action = actions[index]

      if (Object.keys(action).length === 1) {
        yield put({ type: action.type, result: result.data })
      } else {
        yield put(action)
      }
    }
  } catch (e) {
    if (e.response && e.response.status === 401) {
      yield put({ type: 'DISCONNECT' })
    } else {
      yield put({ type: 'ADD_ERROR', error: e.response ? e.response.data : e.message })
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
  yield takeLeading('UPDATE_RAID', updateRaid)
  yield takeLeading('DELETE_RAID', deleteRaid)
}
