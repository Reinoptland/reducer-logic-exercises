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
      state.me = action.payload;
      return state;
    }

    default: {
      return state;
    }
  }
};
