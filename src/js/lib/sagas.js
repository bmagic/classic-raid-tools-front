import { takeLeading, takeEvery, takeLatest, put } from 'redux-saga/effects'
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
  yield * request('PUT', `/v1/users/roles/${action.id}`, [{ type: 'GET_USERS' }], { roles: action.roles })
}

function * updateMdC (action) {
  yield * request('PUT', `/v1/users/mdc/${action.id}`, [{ type: 'GET_USERS' }], { mdc: action.mdc })
}

function * getNextRaids () {
  yield * request('GET', '/v1/raids/next', [{ type: 'GET_NEXT_RAIDS_SUCCESS' }])
}

function * getRaids () {
  yield * request('GET', '/v1/raids', [{ type: 'GET_RAIDS_SUCCESS' }])
}

function * createRaid (action) {
  yield * request('POST', '/v1/raids', [{ type: 'GET_NEXT_RAIDS' }], { date: action.date, instance: action.instance })
}

function * getRaid (action) {
  yield * request('GET', `/v1/raids/${action.id}`, [{ type: 'GET_RAID_SUCCESS' }])
}

function * createRegistration (action) {
  yield * request('POST', '/v1/raids/registration', [{ type: 'GET_REGISTRATIONS', raidId: action.raidId }, { type: 'GET_NEXT_RAIDS' }], { characterId: action.characterId, raidId: action.raidId, status: action.status, favorite: action.favorite })
}

function * updateRegistration (action) {
  yield * request('PUT', `/v1/raids/registration/${action.id}`, [{ type: 'GET_REGISTRATIONS', raidId: action.raidId }], action.registration)
}

function * deleteRegistration (action) {
  yield * request('DELETE', `/v1/raids/registration/${action.id}`, [{ type: 'GET_REGISTRATIONS', raidId: action.raidId }])
}

function * getRegistrations (action) {
  yield * request('GET', `/v1/raids/${action.raidId}/registrations`, [{ type: 'GET_REGISTRATIONS_SUCCESS', raidId: action.raidId }])
}

function * getMissingRegistrations (action) {
  yield * request('GET', `/v1/raids/${action.raidId}/missing-registrations`, [{ type: 'GET_MISSING_REGISTRATIONS_SUCCESS' }])
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

function * setUserMainCharacter (action) {
  yield * request('PUT', `/v1/user/characters/main/${action.id}`, [{ type: 'GET_USER_CHARACTERS' }])
}

function * setUserCharacterSpec (action) {
  yield * request('PUT', `/v1/user/characters/spec/${action.id}`, [{ type: 'GET_USER_CHARACTERS' }], { spec: action.spec })
}

function * getRoster (action) {
  yield * request('GET', `/v1/roster?main=${action.main}&roles=${action.roles}`, [{ type: 'GET_ROSTER_SUCCESS' }])
}
function * importBankData (action) {
  yield * request('POST', '/v1/bank/import', [{ type: 'DISPLAY_BANK_DATA_MODAL', display: false }, { type: 'GET_BANK_ITEMS' }], { data: action.data })
}

function * getBankLogs () {
  yield * request('GET', '/v1/bank/logs', [{ type: 'GET_BANK_LOGS_SUCCESS' }])
}
function * getBankItems () {
  yield * request('GET', '/v1/bank/', [{ type: 'GET_BANK_ITEMS_SUCCESS' }])
}
function * setItemFree (action) {
  yield * request('PUT', `/v1/bank/item/free/${action.wid}`, [{ type: 'GET_BANK_ITEMS' }], { free: action.freeForMembers })
}
function * createItemsRequest (action) {
  yield * request('POST', '/v1/bank/request', [{ type: 'CLEAR_BASKET' }], { items: action.items, message: action.message, reroll: action.reroll })
}
function * getItemsRequest () {
  yield * request('GET', '/v1/bank/requests', [{ type: 'GET_BANK_ITEMS_REQUEST_SUCCESS' }])
}
function * updateItemsRequest (action) {
  yield * request('PUT', `/v1/bank/request/status/${action.id}`, [{ type: 'GET_BANK_ITEMS_REQUEST' }], { status: action.status })
}
function * getPresences (action) {
  yield * request('GET', `/v1/presences?instance=${action.instance}`, [{ type: 'GET_PRESENCES_SUCCESS' }])
}
function * createPresenceBench (action) {
  yield * request('POST', '/v1/presences', [{ type: 'GET_PRESENCES', instance: action.presence.instance }], action.presence)
}
function * deletePresenceBench (action) {
  yield * request('DELETE', `/v1/presences/${action.id}`, [{ type: 'GET_PRESENCES', instance: action.instance }])
}
function * getCharacter (action) {
  yield * request('GET', `/v1/characters/${action.name}`, [{ type: 'GET_CHARACTER_SUCCESS' }])
}
function * getCharacterItems (action) {
  yield * request('GET', `/v1/items/character/${action.id}`, [{ type: 'GET_CHARACTER_ITEMS_SUCCESS' }])
}
function * getCharactersComparatorData (action) {
  yield * request('GET', `/v1/items?spec=${action.spec}${action.class !== '' ? `&class=${action.class}` : ''}`, [{ type: 'GET_CHARACTERS_COMPARATOR_DATA_SUCCESS' }])
}
function * getDebriefRaids (action) {
  yield * request('GET', '/v1/debriefs', [{ type: 'GET_DEBRIEF_RAIDS_SUCCESS' }])
}
function * getDebrief (action) {
  yield * request('GET', `/v1/debriefs/${action.instance}/${action.date}`, [{ type: 'GET_DEBRIEF_SUCCESS' }])
}
function * createLoot (action) {
  yield * request('POST', '/v1/loots', [{ type: 'GET_LOOTS', filter: action.filter }], action.loot)
}
function * updateLoot (action) {
  yield * request('PUT', `/v1/loots/${action.id}`, [{ type: 'GET_LOOTS', filter: action.filter }], action.loot)
}
function * updateLootAssign (action) {
  yield * request('PUT', `/v1/loots/${action.id}/assign-text`, [{ type: 'GET_LOOTS', filter: action.filter }], { value: action.value })
}

function * setMdcClassSpec (action) {
  yield * request('PUT', `/v1/loots/${action.id}/mdc`, [{ type: 'GET_LOOTS', filter: action.filter }], { value: action.value })
}

function * getLoots (action) {
  yield * request('GET', `/v1/loots/?
${action.filter && action.filter.instance ? `&instance=${action.filter.instance}` : ''}
${action.filter && action.filter.slot ? `&slot=${action.filter.slot}` : ''}
${action.filter && action.filter.classSpec ? `&classSpec=${action.filter.classSpec}` : ''}
${action.filter && action.filter.whClass ? `&whClass=${action.filter.whClass}` : ''}
${action.filter && action.filter.whSubClass ? `&whSubClass=${action.filter.whSubClass}` : ''}`

  , [{ type: 'GET_LOOTS_SUCCESS' }])
}

function * deleteLoot (action) {
  yield * request('DELETE', `/v1/loots/${action.id}`, [{ type: 'GET_LOOTS', filter: action.filter }])
}

function * setLootNeed (action) {
  yield * request('PUT', '/v1/loots/need', [{ type: 'GET_LOOTS', filter: action.filter }], { wid: action.wid, type: action.ltype })
}
function * getLootsNeeds () {
  yield * request('GET', '/v1/loots/needs', [{ type: 'GET_LOOTS_NEEDS_SUCCESS' }])
}

function * getUserLootsNeeds () {
  yield * request('GET', '/v1/loots/user/needs', [{ type: 'GET_USER_LOOTS_NEEDS_SUCCESS' }])
}
function * deleteUserLootNeed (action) {
  yield * request('DELETE', `/v1/loots/needs/${action.id}`, [{ type: 'GET_USER_LOOTS_NEEDS' }])
}

function * getUserAvailabilities () {
  yield * request('GET', '/v1/availabilities', [{ type: 'GET_USER_AVAILABILITIES_SUCCESS' }])
}
function * setAvailability (action) {
  yield * request('PUT', '/v1/availabilities', [{ type: 'GET_USER_AVAILABILITIES' }], { day: action.day, status: action.status })
}
function * getAvailabilities () {
  yield * request('GET', '/v1/availabilities/all', [{ type: 'GET_AVAILABILITIES_SUCCESS' }])
}
function * getLastItems () {
  yield * request('GET', '/v1/items/last', [{ type: 'GET_LAST_ITEMS_SUCCESS' }])
}

function * importProfessionData (action) {
  yield * request('POST', '/v1/professions/import', [{ type: 'GET_PROFESSION_DATA', profession: action.profession }], { data: action.data })
}

function * getProfessionData (action) {
  yield * request('GET', `/v1/professions/${action.profession}`, [{ type: 'GET_PROFESSION_DATA_SUCCESS' }], { data: action.data })
}

function * getInstanceStats (action) {
  yield * request('GET', '/v1/presences/stats', [{ type: 'GET_INSTANCE_STATS_SUCCESS' }])
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

      action.result = result.data
      yield put(action)
    }
  } catch (e) {
    if (e.response && e.response.status === 401) {
      yield put({ type: 'DISCONNECT' })
    } else if (e.response && e.response.status === 404) {
      yield put({ type: 'REDIRECT_404' })
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
  yield takeLeading('SET_USER_MAIN_CHARACTER', setUserMainCharacter)
  yield takeLeading('SET_USER_CHARACTER_SPEC', setUserCharacterSpec)
  yield takeLeading('GET_USERS', getUsers)
  yield takeLeading('UPDATE_ROLES', updateRoles)
  yield takeLeading('UPDATE_MDC', updateMdC)
  yield takeLeading('GET_NEXT_RAIDS', getNextRaids)
  yield takeLeading('GET_RAIDS', getRaids)
  yield takeLeading('CREATE_RAID', createRaid)
  yield takeLeading('GET_RAID', getRaid)
  yield takeLeading('CREATE_REGISTRATION', createRegistration)
  yield takeLeading('UPDATE_REGISTRATION', updateRegistration)
  yield takeLeading('DELETE_REGISTRATION', deleteRegistration)
  yield takeEvery('GET_REGISTRATIONS', getRegistrations)
  yield takeLeading('GET_MISSING_REGISTRATIONS', getMissingRegistrations)
  yield takeLeading('GET_REGISTRATION_LOGS', getRegistrationLogs)
  yield takeLeading('UPDATE_USER', updateUser)
  yield takeLeading('UPDATE_RAID', updateRaid)
  yield takeLeading('DELETE_RAID', deleteRaid)
  yield takeLeading('GET_ROSTER', getRoster)
  yield takeLeading('IMPORT_BANK_DATA', importBankData)
  yield takeLeading('GET_BANK_LOGS', getBankLogs)
  yield takeLeading('GET_BANK_ITEMS', getBankItems)
  yield takeLeading('SET_ITEM_FREE', setItemFree)
  yield takeLeading('CREATE_ITEMS_REQUEST', createItemsRequest)
  yield takeLeading('GET_BANK_ITEMS_REQUEST', getItemsRequest)
  yield takeLeading('UPDATE_BANK_ITEMS_REQUEST', updateItemsRequest)
  yield takeLeading('GET_PRESENCES', getPresences)
  yield takeLeading('CREATE_PRESENCE_BENCH', createPresenceBench)
  yield takeLeading('DELETE_PRESENCE_BENCH', deletePresenceBench)
  yield takeLeading('GET_CHARACTER', getCharacter)
  yield takeLatest('GET_CHARACTER_ITEMS', getCharacterItems)
  yield takeLeading('GET_CHARACTERS_COMPARATOR_DATA', getCharactersComparatorData)
  yield takeLeading('GET_DEBRIEF_RAIDS', getDebriefRaids)
  yield takeLeading('GET_DEBRIEF', getDebrief)
  yield takeLeading('CREATE_LOOT', createLoot)
  yield takeLeading('UPDATE_LOOT', updateLoot)
  yield takeLatest('GET_LOOTS', getLoots)
  yield takeLatest('DELETE_LOOT', deleteLoot)
  yield takeLeading('SET_MDC_CLASS_SPEC', setMdcClassSpec)
  yield takeLeading('UPDATE_LOOT_ASSIGN', updateLootAssign)
  yield takeLeading('SET_LOOT_NEED', setLootNeed)
  yield takeLeading('GET_LOOTS_NEEDS', getLootsNeeds)
  yield takeLeading('GET_USER_LOOTS_NEEDS', getUserLootsNeeds)
  yield takeLeading('DELETE_USER_LOOT_NEED', deleteUserLootNeed)
  yield takeLeading('GET_USER_AVAILABILITIES', getUserAvailabilities)
  yield takeLeading('SET_AVAILABILITY', setAvailability)
  yield takeLeading('GET_AVAILABILITIES', getAvailabilities)
  yield takeLeading('GET_LAST_ITEMS', getLastItems)
  yield takeLeading('IMPORT_PROFESSION_DATA', importProfessionData)
  yield takeLatest('GET_PROFESSION_DATA', getProfessionData)
  yield takeLatest('GET_INSTANCE_STATS', getInstanceStats)
}
