import { combineReducers } from 'redux'

const reducer = (state = {}, action) => {
  if (action['type'] === 'success') {
    return {
      ...state,
      ...action['payload']
    };
  } else {
    return state;
  }
};

export default combineReducers({ state: reducer });
