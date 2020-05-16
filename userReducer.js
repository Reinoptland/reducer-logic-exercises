const initialState = {
  me: null,
  accessToken: null,
};

module.exports = function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case "LOGIN_SUCCESS": {
      state.accessToken = action.payload;
      return state;
    }

    default: {
      return state;
    }
  }
};
