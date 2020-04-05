const initialState = {
  loading: false,
  token: null,
  refreshToken: null,
  errors: [],
  user: null,
  userCharacters: [],
  users: []
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
    case 'DISCONNECT':
      return {
        ...state,
        token: null,
        refreshToken: null,
        user: null
      }
    case 'GET_USER_SUCCESS':
      return {
        ...state,
        user: action.result
      }
    case 'REGISTER_SUCCESS':
    case 'LOGIN_SUCCESS':
    case 'GET_TOKEN_SUCCESS':
      return {
        ...state,
        token: action.token,
        refreshToken: action.refreshToken
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
    default:
      return state
  }
}

export default reducer
