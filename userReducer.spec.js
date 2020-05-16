const userReducer = require("./userReducer");
const { createStore } = require("redux");

describe("userReducer.js file ", () => {
  test("should export a function", () => {
    expect(typeof userReducer).toEqual("function");
  });
});

describe("Reducer always returns a state", () => {
  test("userReducer returns an initial state, not undefined", () => {
    const store = createStore(userReducer);
    const reduxState = store.getState();
    expect(reduxState).not.toEqual(undefined);
  });

  test("the initial state of the userReducer contains properties 'me' and 'accessToken', with value null ", () => {
    const store = createStore(userReducer);
    const reduxState = store.getState();
    expect(reduxState).toEqual({ me: null, accessToken: null });
  });

  test("when dispatching an unknown action, the reducer returns a state, not undefined", () => {
    const store = createStore(userReducer);
    const action = {
      type: "THIS_REDUCER_DOES_NOT_HANDLE_THIS_ACTION",
    };
    store.dispatch(action);
    const reduxState = store.getState();

    expect(reduxState).not.toBe(undefined);
  });

  test("when dispatching an unknown action, the reducer returns the state without updating it", () => {
    const store = createStore(userReducer);
    const reduxStateBefore = store.getState();
    const action = {
      type: "THIS_REDUCER_DOES_NOT_HANDLE_THIS_ACTION",
    };
    store.dispatch(action);
    const reduxStateAfter = store.getState();

    // We expect to state before and after to be the same object.
    expect(reduxStateBefore).toBe(reduxStateAfter);
    // We expect to state before and after to have the same keys & values
    expect(reduxStateBefore).toEqual(reduxStateAfter);
  });
});

describe("userReducer handles LOGIN_SUCCESS actions", () => {
  test("when a LOGIN_SUCCESS action is dispatched, accessToken is store is stored in the state", () => {
    const store = createStore(userReducer);
    const action = {
      type: "LOGIN_SUCCESS",
      payload: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9",
    };

    store.dispatch(action);
    const reduxState = store.getState();

    expect(reduxState).toEqual({
      me: null,
      accessToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9",
    });
  });

  test("a LOGIN_SUCCESS action changes the state, but does not mutate the state, it returns a new object", () => {
    const store = createStore(userReducer);
    const action = {
      type: "LOGIN_SUCCESS",
      payload: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9",
    };

    const reduxStateBefore = store.getState();
    store.dispatch(action);
    const reduxStateAfter = store.getState();

    // We should return a new object from the reducer
    // We expect the state before and after not be the same object
    expect(reduxStateBefore).not.toBe(reduxStateAfter);
  });
});

describe("userReducer handles FETCH_PROFILE_SUCCESS actions", () => {
  test("when a FETCH_PROFILE_SUCCESS action is dispatched, a user's profile is stored in the state", () => {
    const store = createStore(userReducer);
    const action = {
      type: "FETCH_PROFILE_SUCCESS",
      payload: {
        createdAt: "2020-05-16T07:21:15.626Z",
        email: "rein@rein.com",
        github_username: null,
        id: 157,
        intro: null,
        name: "Rein Op 't Bla",
        technologies: [],
        website: null,
      },
    };

    store.dispatch(action);
    const reduxState = store.getState();

    expect(reduxState).toEqual({
      me: {
        createdAt: "2020-05-16T07:21:15.626Z",
        email: "rein@rein.com",
        github_username: null,
        id: 157,
        intro: null,
        name: "Rein Op 't Bla",
        technologies: [],
        website: null,
      },
      accessToken: null,
    });
  });

  test("a FETCH_PROFILE_SUCCESS action changes the state, but does not mutate the state, it returns a new object", () => {
    const store = createStore(userReducer);
    const action = {
      type: "FETCH_PROFILE_SUCCESS",
      payload: {
        createdAt: "2020-05-16T07:21:15.626Z",
        email: "rein@rein.com",
        github_username: null,
        id: 157,
        intro: null,
        name: "Rein Op 't Bla",
        technologies: [],
        website: null,
      },
    };

    const reduxStateBefore = store.getState();
    const profileBefore = store.getState().me;
    store.dispatch(action);
    const reduxStateAfter = store.getState();
    const profileAfter = store.getState().me;

    // We should return a new objects from the reducer
    // We expect the state before and after not be the same object
    expect(reduxStateBefore).not.toBe(reduxStateAfter);
    // We expect the profile before and after not be the same object
    expect(profileBefore).not.toBe(profileAfter);
  });
});

describe("userReducer handles LOGOUT actions", () => {
  test("when a LOGOUT action is dispatched, the state is reset to null values", () => {
    const store = createStore(userReducer);

    const loginAction = {
      type: "LOGIN_SUCCESS",
      payload: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9",
    };

    store.dispatch(loginAction);

    const fetchProfileAction = {
      type: "FETCH_PROFILE_SUCCESS",
      payload: {
        createdAt: "2020-05-16T07:21:15.626Z",
        email: "rein@rein.com",
        github_username: null,
        id: 157,
        intro: null,
        name: "Rein Op 't Bla",
        technologies: [],
        website: null,
      },
    };

    store.dispatch(fetchProfileAction);

    const logoutAction = {
      type: "LOGOUT",
    };

    store.dispatch(logoutAction);
    const reduxState = store.getState();

    expect(reduxState).toEqual({ me: null, accessToken: null });
  });

  test("a LOGOUT action changes the state, but does not mutate the state, it returns a new object", () => {
    const store = createStore(userReducer);
    const initialState = store.getState();

    const loginAction = {
      type: "LOGIN_SUCCESS",
      payload: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9",
    };

    store.dispatch(loginAction);

    const fetchProfileAction = {
      type: "FETCH_PROFILE_SUCCESS",
      payload: {
        createdAt: "2020-05-16T07:21:15.626Z",
        email: "rein@rein.com",
        github_username: null,
        id: 157,
        intro: null,
        name: "Rein Op 't Bla",
        technologies: [],
        website: null,
      },
    };

    store.dispatch(fetchProfileAction);

    const reduxStateBefore = store.getState();
    const logoutAction = {
      type: "LOGOUT",
    };

    store.dispatch(logoutAction);
    const reduxStateAfter = store.getState();

    // We should return a new object from the reducer
    // We expect the state before and after not be the same object
    expect(reduxStateBefore).not.toBe(reduxStateAfter);
    // We expect the state after not be the same object as the initial state, it should be a new object
    expect(reduxStateAfter).not.toBe(initialState);
  });
});

describe("userReducer handles UPDATE_PROFILE_EMAIL actions", () => {
  test("when an UPDATE_PROFILE_EMAIL action is dispatched, the email in the profile is updated", () => {
    const store = createStore(userReducer);

    const fetchProfileAction = {
      type: "FETCH_PROFILE_SUCCESS",
      payload: {
        createdAt: "2020-05-16T07:21:15.626Z",
        email: "rein@rein.com",
        github_username: null,
        id: 157,
        intro: null,
        name: "Rein Op 't Bla",
        technologies: [],
        website: null,
      },
    };

    store.dispatch(fetchProfileAction);

    const action = {
      type: "UPDATE_PROFILE_EMAIL",
      payload: "rein@rein.io",
    };

    store.dispatch(action);
    const reduxState = store.getState();

    expect(reduxState).toEqual({
      me: {
        createdAt: "2020-05-16T07:21:15.626Z",
        email: "rein@rein.io",
        github_username: null,
        id: 157,
        intro: null,
        name: "Rein Op 't Bla",
        technologies: [],
        website: null,
      },
      accessToken: null,
    });
  });

  test("when an UPDATE_PROFILE_EMAIL action is dispatched, other state in the reducer is preserved", () => {
    const store = createStore(userReducer);

    const loginAction = {
      type: "LOGIN_SUCCESS",
      payload: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9",
    };

    store.dispatch(loginAction);

    const fetchProfileAction = {
      type: "FETCH_PROFILE_SUCCESS",
      payload: {
        createdAt: "2020-05-16T07:21:15.626Z",
        email: "rein@rein.com",
        github_username: null,
        id: 157,
        intro: null,
        name: "Rein Op 't Bla",
        technologies: [],
        website: null,
      },
    };

    store.dispatch(fetchProfileAction);

    const action = {
      type: "UPDATE_PROFILE_EMAIL",
      payload: "rein@rein.io",
    };

    store.dispatch(action);
    const reduxState = store.getState();

    expect(reduxState).toEqual({
      me: {
        createdAt: "2020-05-16T07:21:15.626Z",
        email: "rein@rein.io",
        github_username: null,
        id: 157,
        intro: null,
        name: "Rein Op 't Bla",
        technologies: [],
        website: null,
      },
      accessToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9",
    });
  });

  test("an UPDATE_PROFILE_EMAIL action changes the state, but does not mutate the state, it returns a new object(s)", () => {
    const store = createStore(userReducer);

    const fetchProfileAction = {
      type: "FETCH_PROFILE_SUCCESS",
      payload: {
        createdAt: "2020-05-16T07:21:15.626Z",
        email: "rein@rein.com",
        github_username: null,
        id: 157,
        intro: null,
        name: "Rein Op 't Bla",
        technologies: [],
        website: null,
      },
    };

    store.dispatch(fetchProfileAction);

    const action = {
      type: "UPDATE_PROFILE_EMAIL",
      payload: "rein@rein.io",
    };

    const reduxStateBefore = store.getState();
    const profileBefore = store.getState().me;
    store.dispatch(action);
    const reduxStateAfter = store.getState();
    const profileAfter = store.getState().me;

    // We should return a new objects from the reducer
    // We expect the state before and after not be the same object
    expect(reduxStateBefore).not.toBe(reduxStateAfter);
    // We expect the profile before and after not be the same object
    expect(profileBefore).not.toBe(profileAfter);
  });

  test("when UPDATE_PROFILE_EMAIL, action is dispatched, but there is no user profile, the reducer just returns state, without changing it", () => {
    // create store with initial state, so state.me will be null
    const store = createStore(userReducer);

    const action = {
      type: "UPDATE_PROFILE_EMAIL",
      payload: "rein@rein.io",
    };

    const reduxStateBefore = store.getState();
    store.dispatch(action);
    const reduxStateAfter = store.getState();

    // Since we have no profile to update, nothing should change and the state should be equal before and after
    expect(reduxStateBefore).toEqual(reduxStateAfter);
    // We expect the state before and after to be the same object
    expect(reduxStateBefore).toBe(reduxStateAfter);
  });
});

describe("userReducer handles UPDATE_PROFILE_INTRO actions", () => {
  test("when an UPDATE_PROFILE_INTRO action is dispatched, the intro in the profile is updated", () => {
    const store = createStore(userReducer);

    const fetchProfileAction = {
      type: "FETCH_PROFILE_SUCCESS",
      payload: {
        createdAt: "2020-05-16T07:21:15.626Z",
        email: "rein@rein.com",
        github_username: null,
        id: 157,
        intro: null,
        name: "Rein Op 't Bla",
        technologies: [],
        website: null,
      },
    };

    store.dispatch(fetchProfileAction);

    const action = {
      type: "UPDATE_PROFILE_INTRO",
      payload: "I used to teach, I still do, but I used to too",
    };

    store.dispatch(action);
    const reduxState = store.getState();

    expect(reduxState).toEqual({
      me: {
        createdAt: "2020-05-16T07:21:15.626Z",
        email: "rein@rein.com",
        github_username: null,
        id: 157,
        intro: "I used to teach, I still do, but I used to too",
        name: "Rein Op 't Bla",
        technologies: [],
        website: null,
      },
      accessToken: null,
    });
  });

  test("when an UPDATE_PROFILE_INTRO action is dispatched, other state in the reducer is preserved", () => {
    const store = createStore(userReducer);

    const loginAction = {
      type: "LOGIN_SUCCESS",
      payload: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9",
    };

    store.dispatch(loginAction);

    const fetchProfileAction = {
      type: "FETCH_PROFILE_SUCCESS",
      payload: {
        createdAt: "2020-05-16T07:21:15.626Z",
        email: "rein@rein.com",
        github_username: null,
        id: 157,
        intro: null,
        name: "Rein Op 't Bla",
        technologies: [],
        website: null,
      },
    };

    store.dispatch(fetchProfileAction);

    const action = {
      type: "UPDATE_PROFILE_INTRO",
      payload: "I used to teach, I still do, but I used to too",
    };

    store.dispatch(action);
    const reduxState = store.getState();

    expect(reduxState).toEqual({
      me: {
        createdAt: "2020-05-16T07:21:15.626Z",
        email: "rein@rein.com",
        github_username: null,
        id: 157,
        intro: "I used to teach, I still do, but I used to too",
        name: "Rein Op 't Bla",
        technologies: [],
        website: null,
      },
      accessToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9",
    });
  });

  test("an UPDATE_PROFILE_INTRO action changes the state, but does not mutate the state, it returns a new object(s)", () => {
    const store = createStore(userReducer);

    const fetchProfileAction = {
      type: "FETCH_PROFILE_SUCCESS",
      payload: {
        createdAt: "2020-05-16T07:21:15.626Z",
        email: "rein@rein.com",
        github_username: null,
        id: 157,
        intro: null,
        name: "Rein Op 't Bla",
        technologies: [],
        website: null,
      },
    };

    store.dispatch(fetchProfileAction);

    const action = {
      type: "UPDATE_PROFILE_INTRO",
      payload: "I used to teach, I still do, but I used to too",
    };

    const reduxStateBefore = store.getState();
    const profileBefore = store.getState().me;
    store.dispatch(action);
    const reduxStateAfter = store.getState();
    const profileAfter = store.getState().me;

    // We should return a new objects from the reducer
    // We expect the state before and after not be the same object
    expect(reduxStateBefore).not.toBe(reduxStateAfter);
    // We expect the profile before and after not be the same object
    expect(profileBefore).not.toBe(profileAfter);
  });

  test("when UPDATE_PROFILE_INTRO, action is dispatched, but there is no user profile, the reducer just returns state, without changing it", () => {
    // create store with initial state, so state.me will be null
    const store = createStore(userReducer);

    const action = {
      type: "UPDATE_PROFILE_INTRO",
      payload: "I used to teach, I still do, but I used to too",
    };

    const reduxStateBefore = store.getState();
    store.dispatch(action);
    const reduxStateAfter = store.getState();

    // Since we have no profile to update, nothing should change and the state should be equal before and after
    expect(reduxStateBefore).toEqual(reduxStateAfter);
    // We expect the state before and after to be the same object
    expect(reduxStateBefore).toBe(reduxStateAfter);
  });
});

describe("userReducer handles UPDATE_PROFILE_WEBSITE actions", () => {
  test("when an UPDATE_PROFILE_WEBSITE action is dispatched, the website in the profile is updated", () => {
    const store = createStore(userReducer);

    const fetchProfileAction = {
      type: "FETCH_PROFILE_SUCCESS",
      payload: {
        createdAt: "2020-05-16T07:21:15.626Z",
        email: "rein@rein.com",
        github_username: null,
        id: 157,
        intro: null,
        name: "Rein Op 't Bla",
        technologies: [],
        website: null,
      },
    };

    store.dispatch(fetchProfileAction);

    const action = {
      type: "UPDATE_PROFILE_WEBSITE",
      payload: "https://github.com/Reinoptland",
    };

    store.dispatch(action);
    const reduxState = store.getState();

    expect(reduxState).toEqual({
      me: {
        createdAt: "2020-05-16T07:21:15.626Z",
        email: "rein@rein.com",
        github_username: null,
        id: 157,
        intro: null,
        name: "Rein Op 't Bla",
        technologies: [],
        website: "https://github.com/Reinoptland",
      },
      accessToken: null,
    });
  });

  test("when an UPDATE_PROFILE_WEBSITE action is dispatched, other state in the reducer is preserved", () => {
    const store = createStore(userReducer);

    const loginAction = {
      type: "LOGIN_SUCCESS",
      payload: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9",
    };

    store.dispatch(loginAction);

    const fetchProfileAction = {
      type: "FETCH_PROFILE_SUCCESS",
      payload: {
        createdAt: "2020-05-16T07:21:15.626Z",
        email: "rein@rein.com",
        github_username: null,
        id: 157,
        intro: null,
        name: "Rein Op 't Bla",
        technologies: [],
        website: null,
      },
    };

    store.dispatch(fetchProfileAction);

    const action = {
      type: "UPDATE_PROFILE_WEBSITE",
      payload: "https://github.com/Reinoptland",
    };

    store.dispatch(action);
    const reduxState = store.getState();

    expect(reduxState).toEqual({
      me: {
        createdAt: "2020-05-16T07:21:15.626Z",
        email: "rein@rein.com",
        github_username: null,
        id: 157,
        intro: null,
        name: "Rein Op 't Bla",
        technologies: [],
        website: "https://github.com/Reinoptland",
      },
      accessToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9",
    });
  });

  test("an UPDATE_PROFILE_WEBSITE action changes the state, but does not mutate the state, it returns a new object(s)", () => {
    const store = createStore(userReducer);

    const fetchProfileAction = {
      type: "FETCH_PROFILE_SUCCESS",
      payload: {
        createdAt: "2020-05-16T07:21:15.626Z",
        email: "rein@rein.com",
        github_username: null,
        id: 157,
        intro: null,
        name: "Rein Op 't Bla",
        technologies: [],
        website: null,
      },
    };

    store.dispatch(fetchProfileAction);

    const action = {
      type: "UPDATE_PROFILE_WEBSITE",
      payload: "https://github.com/Reinoptland",
    };

    const reduxStateBefore = store.getState();
    const profileBefore = store.getState().me;
    store.dispatch(action);
    const reduxStateAfter = store.getState();
    const profileAfter = store.getState().me;

    // We should return a new objects from the reducer
    // We expect the state before and after not be the same object
    expect(reduxStateBefore).not.toBe(reduxStateAfter);
    // We expect the profile before and after not be the same object
    expect(profileBefore).not.toBe(profileAfter);
  });

  test("when UPDATE_PROFILE_WEBSITE, action is dispatched, but there is no user profile, the reducer just returns state, without changing it", () => {
    // create store with initial state, so state.me will be null
    const store = createStore(userReducer);

    const action = {
      type: "UPDATE_PROFILE_WEBSITE",
      payload: "https://github.com/Reinoptland",
    };

    const reduxStateBefore = store.getState();
    store.dispatch(action);
    const reduxStateAfter = store.getState();

    // Since we have no profile to update, nothing should change and the state should be equal before and after
    expect(reduxStateBefore).toEqual(reduxStateAfter);
    // We expect the state before and after to be the same object
    expect(reduxStateBefore).toBe(reduxStateAfter);
  });
});

describe("userReducer handles UPDATE_PROFILE actions", () => {
  test("when an UPDATE_PROFILE action is dispatched, multiple values of the profile can be updated with 1 payload", () => {
    const store = createStore(userReducer);

    const fetchProfileAction = {
      type: "FETCH_PROFILE_SUCCESS",
      payload: {
        createdAt: "2020-05-16T07:21:15.626Z",
        email: "rein@rein.com",
        github_username: null,
        id: 157,
        intro: null,
        name: "Rein Op 't Bla",
        technologies: [],
        website: null,
      },
    };

    store.dispatch(fetchProfileAction);

    const action = {
      type: "UPDATE_PROFILE",
      payload: {
        intro: "I used to teach, I still do, but I used to too",
        website: "https://github.com/Reinoptland",
        name: "Rein Op 't Land",
      },
    };

    store.dispatch(action);
    const reduxState = store.getState();

    expect(reduxState).toEqual({
      me: {
        createdAt: "2020-05-16T07:21:15.626Z",
        email: "rein@rein.com",
        github_username: null,
        id: 157,
        intro: "I used to teach, I still do, but I used to too",
        name: "Rein Op 't Land",
        technologies: [],
        website: "https://github.com/Reinoptland",
      },
      accessToken: null,
    });
  });

  test("when an UPDATE_PROFILE action is dispatched, other state in the reducer is preserved", () => {
    const store = createStore(userReducer);

    const loginAction = {
      type: "LOGIN_SUCCESS",
      payload: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9",
    };

    store.dispatch(loginAction);

    const fetchProfileAction = {
      type: "FETCH_PROFILE_SUCCESS",
      payload: {
        createdAt: "2020-05-16T07:21:15.626Z",
        email: "rein@rein.com",
        github_username: null,
        id: 157,
        intro: null,
        name: "Rein Op 't Bla",
        technologies: [],
        website: null,
      },
    };

    store.dispatch(fetchProfileAction);

    const action = {
      type: "UPDATE_PROFILE",
      payload: {
        intro: "I used to teach, I still do, but I used to too",
        website: "https://github.com/Reinoptland",
        name: "Rein Op 't Land",
      },
    };

    store.dispatch(action);
    const reduxState = store.getState();

    expect(reduxState).toEqual({
      me: {
        createdAt: "2020-05-16T07:21:15.626Z",
        email: "rein@rein.com",
        github_username: null,
        id: 157,
        intro: "I used to teach, I still do, but I used to too",
        name: "Rein Op 't Land",
        technologies: [],
        website: "https://github.com/Reinoptland",
      },
      accessToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9",
    });
  });

  test("an UPDATE_PROFILE action changes the state, but does not mutate the state, it returns a new object(s)", () => {
    const store = createStore(userReducer);

    const fetchProfileAction = {
      type: "FETCH_PROFILE_SUCCESS",
      payload: {
        createdAt: "2020-05-16T07:21:15.626Z",
        email: "rein@rein.com",
        github_username: null,
        id: 157,
        intro: null,
        name: "Rein Op 't Bla",
        technologies: [],
        website: null,
      },
    };

    store.dispatch(fetchProfileAction);

    const action = {
      type: "UPDATE_PROFILE",
      payload: {
        intro: "I used to teach, I still do, but I used to too",
        website: "https://github.com/Reinoptland",
        name: "Rein Op 't Land",
      },
    };

    const reduxStateBefore = store.getState();
    const profileBefore = store.getState().me;
    store.dispatch(action);
    const reduxStateAfter = store.getState();
    const profileAfter = store.getState().me;

    // We should return a new objects from the reducer
    // We expect the state before and after not be the same object
    expect(reduxStateBefore).not.toBe(reduxStateAfter);
    // We expect the profile before and after not be the same object
    expect(profileBefore).not.toBe(profileAfter);
  });

  test("when UPDATE_PROFILE, action is dispatched, but there is no user profile, the reducer just returns state, without changing it", () => {
    // create store with initial state, so state.me will be null
    const store = createStore(userReducer);

    const action = {
      type: "UPDATE_PROFILE",
      payload: {
        intro: "I used to teach, I still do, but I used to too",
        website: "https://github.com/Reinoptland",
        name: "Rein Op 't Land",
      },
    };

    const reduxStateBefore = store.getState();
    store.dispatch(action);
    const reduxStateAfter = store.getState();

    // Since we have no profile to update, nothing should change and the state should be equal before and after
    expect(reduxStateBefore).toEqual(reduxStateAfter);
    // We expect the state before and after to be the same object
    expect(reduxStateBefore).toBe(reduxStateAfter);
  });
});
