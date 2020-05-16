const initialState = {
  me: null,
  accessToken: null,
};

module.exports = function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case "LOGIN_SUCCESS": {
      return { ...state, accessToken: action.payload };
    }

    case "FETCH_PROFILE_SUCCESS": {
      return { ...state, me: action.payload };
    }

    case "LOGOUT": {
      return { ...initialState };
    }

    case "UPDATE_PROFILE_EMAIL": {
      return { ...state, me: { ...state.me, email: action.payload } };
    }

    default: {
      return state;
    }
  }
};
