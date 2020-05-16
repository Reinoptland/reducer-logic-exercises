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

    // We should return a new object from the reducer
    // We expect the state before and after not be the same object
    expect(reduxStateBefore).not.toBe(reduxStateAfter);
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
