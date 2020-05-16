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
      if (state.me === null) {
        return state;
      }
      return { ...state, me: { ...state.me, email: action.payload } };
    }

    case "UPDATE_PROFILE_INTRO": {
      if (state.me === null) {
        return state;
      }
      return { ...state, me: { ...state.me, intro: action.payload } };
    }

    case "UPDATE_PROFILE_WEBSITE": {
      if (state.me === null) {
        return state;
      }
      return { ...state, me: { ...state.me, website: action.payload } };
    }

    case "UPDATE_PROFILE": {
      // long solution without using the spread operator ...
      const profileCopy = { ...state.me };
      // get an array of keys that need to be changed using Object.keys
      const keysToChange = Object.keys(action.payload);
      // iterate over the keys and change all of the values of those keys on the profile on the profile
      keysToChange.forEach((key) => {
        profileCopy[key] = action.payload[key];
      });
      // set the state at the end
      return { ...state, me: profileCopy };
    }

    default: {
      return state;
    }
  }
};
