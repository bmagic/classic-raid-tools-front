const initialState = {
  loading: false,
  errors: [],
  user: null,
  userCharacters: [],
  users: [],
  nextRaids: [],
  raid: null,
  registrations: [],
  registrationLogs: [],
  raidTab: 'infos',
  roster: [],
  displayBankModal: false,
  bankItems: [],
  bankLogs: [],
  basket: [],
  lang: 'fr'
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_ERROR':
      return {
        ...state,
        errors: [...state.errors, action.error]
      }
    case 'CLEAR_ERRORS':
      return {
        ...state,
        errors: []
      }
    case 'LOGOUT_SUCCESS':
      return initialState
    case 'GET_USER_SUCCESS':

      return {
        ...state,
        user: action.result === '' ? null : action.result
      }
    case 'GET_USER_CHARACTERS_SUCCESS':
      return {
        ...state,
        userCharacters: action.result
      }
    case 'GET_USERS_SUCCESS':
      return {
        ...state,
        users: action.result
      }
    case 'GET_NEXT_RAIDS':
      return {
        ...state,
        nextRaids: []
      }
    case 'GET_NEXT_RAIDS_SUCCESS':
      return {
        ...state,
        nextRaids: action.result
      }
    case 'GET_RAID_SUCCESS':
      return {
        ...state,
        raid: action.result
      }
    case 'GET_REGISTRATIONS_SUCCESS':
      return {
        ...state,
        registrations: action.result
      }
    case 'GET_REGISTRATION_LOGS_SUCCESS':
      return {
        ...state,
        registrationLogs: action.result
      }
    case 'CHANGE_RAID_TAB':
      return {
        ...state,
        raidTab: action.raidTab
      }
    case 'GET_ROSTER_SUCCESS':
      return {
        ...state,
        roster: action.result
      }
    case 'DISPLAY_BANK_DATA_MODAL':
      return {
        ...state,
        displayBankModal: action.display
      }
    case 'GET_BANK_LOGS_SUCCESS':
      return {
        ...state,
        bankLogs: action.result
      }
    case 'CHANGE_LANGUAGE':
      return {
        ...state,
        lang: action.lang
      }
    case 'GET_BANK_ITEMS_SUCCESS':
      return {
        ...state,
        bankItems: action.result
      }
    default:
      return state
  }
}

export default reducer
