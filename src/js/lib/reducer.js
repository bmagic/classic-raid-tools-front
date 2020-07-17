const initialState = {
  loading: false,
  errors: [],
  user: null,
  userCharacters: [],
  userLootsNeeds: [],
  users: [],
  nextRaids: [],
  raid: null,
  registrations: {},
  missingRegistrations: [],
  registrationLogs: [],
  raidTab: 'infos',
  roster: [],
  displayBankModal: false,
  bankItems: [],
  bankItemsRequests: [],
  bankLogs: [],
  basketItems: {},
  basketForReroll: false,
  lang: 'fr',
  presences: [],
  character: null,
  characterItems: [],
  charactersComparatorData: {},
  debriefRaids: [],
  debrief: {},
  loot: null,
  loots: [],
  lootsNeeds: [],
  userAvailabilities: null,
  availabilities: []
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
    case 'GET_REGISTRATIONS_SUCCESS': {
      const registrations = Object.assign({}, state.registrations)
      registrations[action.raidId] = action.result
      return {
        ...state,
        registrations: registrations
      }
    }
    case 'GET_MISSING_REGISTRATIONS_SUCCESS': {
      return {
        ...state,
        missingRegistrations: action.result
      }
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
    case 'CHANGE_BASKET_ITEM_QUANTITY': {
      const basketItems = Object.assign({}, state.basketItems)
      if (action.quantity === 0) {
        delete basketItems[action.item._id]
      } else {
        basketItems[action.item._id] = { quantity: action.quantity, marketValue: action.item.marketValue, item: action.item }
      }
      return {
        ...state,
        basketItems: basketItems
      }
    }
    case 'CLEAR_BASKET': {
      return {
        ...state,
        basketItems: initialState.basketItems,
        basketForReroll: initialState.basketForReroll
      }
    }
    case 'CHANGE_BASKET_REROLL': {
      return {
        ...state,
        basketForReroll: !state.basketForReroll
      }
    }
    case 'GET_BANK_ITEMS_REQUEST_SUCCESS': {
      return {
        ...state,
        bankItemsRequests: action.result
      }
    }
    case 'GET_PRESENCES_SUCCESS': {
      return {
        ...state,
        presences: action.result
      }
    }
    case 'REDIRECT_404': {
      window.location.replace('/404')
      return state
    }
    case 'GET_CHARACTER': {
      return {
        ...state,
        character: initialState.character
      }
    }
    case 'GET_CHARACTER_ITEMS': {
      return {
        ...state,
        characterItems: initialState.characterItems
      }
    }
    case 'GET_CHARACTER_SUCCESS': {
      return {
        ...state,
        character: action.result
      }
    }
    case 'GET_CHARACTER_ITEMS_SUCCESS': {
      return {
        ...state,
        characterItems: action.result
      }
    }
    case 'GET_CHARACTERS_COMPARATOR_DATA_SUCCESS': {
      return {
        ...state,
        charactersComparatorData: action.result
      }
    }
    case 'GET_DEBRIEF_RAIDS_SUCCESS': {
      return {
        ...state,
        debriefRaids: action.result
      }
    }
    case 'GET_DEBRIEF_SUCCESS': {
      return {
        ...state,
        debrief: action.result
      }
    }
    case 'GET_LOOTS_SUCCESS': {
      return {
        ...state,
        loots: action.result
      }
    }
    case 'SET_LOOT': {
      return {
        ...state,
        loot: action.loot
      }
    }

    case 'GET_LOOTS_NEEDS_SUCCESS': {
      return {
        ...state,
        lootsNeeds: action.result
      }
    }
    case ('GET_USER_LOOTS_NEEDS_SUCCESS'): {
      return {
        ...state,
        userLootsNeeds: action.result
      }
    }
    case ('GET_USER_AVAILABILITIES_SUCCESS'): {
      return {
        ...state,
        userAvailabilities: action.result
      }
    }
    case ('GET_AVAILABILITIES_SUCCESS'): {
      return {
        ...state,
        availabilities: action.result
      }
    }
    default:
      return state
  }
}

export default reducer
