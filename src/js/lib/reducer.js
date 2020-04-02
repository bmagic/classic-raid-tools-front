const initialState = {
  loading: false,
  token: null,
  errors: [],
  user: null,
  talks: []
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
        user: null
      }
    case 'GET_USER_SUCCESS':
      return {
        ...state,
        user: action.user
      }
    case 'REGISTER_SUCCESS':
    case 'LOGIN_SUCCESS':
    case 'GET_TOKEN_SUCCESS':
      return {
        ...state,
        token: action.token
      }
    case 'GET_USER_TALKS_SUCCESS':
      return {
        ...state,
        talks: action.talks
      }
    default:
      return state
  }
}

export default reducer
